import type { Product, Cart, Collection, ScentNotes, ScentProfile } from '../types'

const domain = import.meta.env.VITE_SHOPIFY_STORE_DOMAIN
const storefrontAccessToken = import.meta.env.VITE_SHOPIFY_STOREFRONT_ACCESS_TOKEN

const endpoint = `https://${domain}/api/2025-01/graphql.json`

// Shopify language codes
export type ShopifyLanguage = 'EN' | 'PT_PT'

// Map i18n language codes to Shopify language codes
export function mapLanguageCode(i18nLang: string): ShopifyLanguage {
  if (i18nLang.startsWith('pt')) return 'PT_PT'
  return 'EN'
}

// Shopify GraphQL userErrors type
interface ShopifyUserError {
  field: string[] | null
  message: string
}

function checkUserErrors(userErrors: ShopifyUserError[] | undefined): void {
  if (userErrors && userErrors.length > 0) {
    throw new Error(userErrors[0].message)
  }
}

async function shopifyFetch<T>(
  query: string,
  variables?: Record<string, unknown>,
  language: ShopifyLanguage = 'EN'
): Promise<T> {
  // Inject @inContext directive for language support
  // Transforms "query GetProducts {" to "query GetProducts @inContext(language: PT_PT) {"
  const localizedQuery = query.replace(
    /^(\s*)(query|mutation)(\s+\w+)?(\s*\([\s\S]*?\))?(\s*\{)/m,
    `$1$2$3$4 @inContext(language: ${language})$5`
  )

  const response = await fetch(endpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Shopify-Storefront-Access-Token': storefrontAccessToken,
    },
    body: JSON.stringify({ query: localizedQuery, variables }),
  })

  if (!response.ok) {
    throw new Error(`Shopify API error: ${response.status}`)
  }

  const json = await response.json()

  if (json.errors && !json.data) {
    throw new Error(json.errors[0].message)
  }

  return json.data
}

// GraphQL Fragments
const PRODUCT_FRAGMENT = `
  fragment ProductFragment on Product {
    id
    handle
    title
    description
    descriptionHtml
    tags
    productType
    vendor
    availableForSale
    priceRange {
      minVariantPrice {
        amount
        currencyCode
      }
      maxVariantPrice {
        amount
        currencyCode
      }
    }
    images(first: 10) {
      edges {
        node {
          id
          url
          altText
          width
          height
        }
      }
    }
    variants(first: 10) {
      edges {
        node {
          id
          title
          availableForSale
          quantityAvailable
          price {
            amount
            currencyCode
          }
          compareAtPrice {
            amount
            currencyCode
          }
        }
      }
    }
    metafields(identifiers: [
      {namespace: "custom", key: "subtitle"},
      {namespace: "custom", key: "scent_tags"},
      {namespace: "custom", key: "scent_notes_top"},
      {namespace: "custom", key: "scent_notes_heart"},
      {namespace: "custom", key: "scent_notes_base"},
      {namespace: "custom", key: "longevity"},
      {namespace: "custom", key: "concentration"},
      {namespace: "custom", key: "is_vegan"},
      {namespace: "custom", key: "is_cruelty_free"},
      {namespace: "custom", key: "ingredients"},
      {namespace: "custom", key: "long_descriptions"}
    ]) {
      key
      value
    }
  }
`

const CART_FRAGMENT = `
  fragment CartFragment on Cart {
    id
    checkoutUrl
    totalQuantity
    cost {
      subtotalAmount {
        amount
        currencyCode
      }
    }
    lines(first: 100) {
      edges {
        node {
          id
          quantity
          merchandise {
            ... on ProductVariant {
              id
              title
              price {
                amount
                currencyCode
              }
              product {
                ...ProductFragment
              }
            }
          }
        }
      }
    }
  }
  ${PRODUCT_FRAGMENT}
`

// Parse Shopify rich text JSON to plain text
function parseRichTextJson(jsonString: string): string {
  try {
    const data = JSON.parse(jsonString)

    function extractText(node: any): string {
      if (!node) return ''

      if (node.type === 'text') {
        return node.value || ''
      }

      if (node.children && Array.isArray(node.children)) {
        return node.children.map(extractText).join('')
      }

      return ''
    }

    if (data.type === 'root' && data.children) {
      return data.children
        .map((child: any) => {
          const text = extractText(child)
          // Add paragraph breaks
          if (child.type === 'paragraph') {
            return text + '\n\n'
          }
          return text
        })
        .join('')
        .trim()
    }

    return extractText(data)
  } catch (e) {
    console.error('Failed to parse rich text JSON:', e)
    return ''
  }
}

// Parse structured data from Shopify description HTML
interface ParsedDescription {
  scentNotes: ScentNotes
  scentProfile: ScentProfile
  cleanDescription: string
}

function parseDescriptionHtml(html: string): ParsedDescription {
  // Convert HTML to plain text
  const text = html
    .replace(/<br[^>]*>/gi, '\n')  // Match <br>, <br/>, <br />, <br data-foo="bar">, etc.
    .replace(/<\/p>/gi, '\n\n')
    .replace(/<[^>]+>/g, '')
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .trim()

  const scentNotes: ScentNotes = { top: [], heart: [], base: [] }
  const scentProfile: ScentProfile = {}
  let cleanDescription = text

  // Extract scent profile data
  const fragranceFamilyMatch = text.match(/Fragrance family[:\s]+([^\n]+)/i)
  if (fragranceFamilyMatch) {
    scentProfile.fragranceFamily = fragranceFamilyMatch[1].trim()
  }

  const moodMatch = text.match(/Mood[:\s]+([^\n]+)/i)
  if (moodMatch) {
    scentProfile.mood = moodMatch[1].trim()
  }

  const bestWornMatch = text.match(/Best worn[:\s]+([^\n]+)/i)
  if (bestWornMatch) {
    scentProfile.bestWorn = bestWornMatch[1].trim()
  }

  // Extract scent notes
  const topMatch = text.match(/Top[:\s]+([^\n]+)/i)
  if (topMatch) {
    scentNotes.top = topMatch[1].split(/[,·]/).map(s => s.trim()).filter(Boolean)
  }

  const heartMatch = text.match(/Heart[:\s]+([^\n]+)/i)
  if (heartMatch) {
    scentNotes.heart = heartMatch[1].split(/[,·]/).map(s => s.trim()).filter(Boolean)
  }

  const baseMatch = text.match(/Base[:\s]+([^\n]+)/i)
  if (baseMatch) {
    scentNotes.base = baseMatch[1].split(/[,·]/).map(s => s.trim()).filter(Boolean)
  }

  // Extract clean description (after "Descriptions" or main paragraph text)
  const descriptionsMatch = text.match(/Descriptions?\s*\n+([\s\S]+)/i)
  if (descriptionsMatch) {
    cleanDescription = descriptionsMatch[1].trim()
  } else {
    // Try to find the main description by removing structured data sections
    cleanDescription = text
      .replace(/Scent profile[\s\S]*?(?=Scent notes|Descriptions|$)/i, '')
      .replace(/Scent notes[\s\S]*?(?=Descriptions|$)/i, '')
      .replace(/Fragrance family[:\s]+[^\n]+\n?/gi, '')
      .replace(/Mood[:\s]+[^\n]+\n?/gi, '')
      .replace(/Best worn[:\s]+[^\n]+\n?/gi, '')
      .replace(/Top[:\s]+[^\n]+\n?/gi, '')
      .replace(/Heart[:\s]+[^\n]+\n?/gi, '')
      .replace(/Base[:\s]+[^\n]+\n?/gi, '')
      .replace(/\n{3,}/g, '\n\n')
      .trim()
  }

  return { scentNotes, scentProfile, cleanDescription }
}

// Transform Shopify response to our Product type
function transformProduct(shopifyProduct: any): Product {
  const metafields = shopifyProduct.metafields?.reduce((acc: any, mf: any) => {
    if (mf) acc[mf.key] = mf.value
    return acc
  }, {}) || {}

  // Parse scent notes from metafields (if available)
  const metafieldScentNotes = {
    top: metafields.scent_notes_top ? JSON.parse(metafields.scent_notes_top) : [],
    heart: metafields.scent_notes_heart ? JSON.parse(metafields.scent_notes_heart) : [],
    base: metafields.scent_notes_base ? JSON.parse(metafields.scent_notes_base) : [],
  }
  const hasMetafieldScentNotes = metafieldScentNotes.top.length || metafieldScentNotes.heart.length || metafieldScentNotes.base.length

  // Parse descriptionHtml to extract scent notes, profile, and description
  const parsed = parseDescriptionHtml(shopifyProduct.descriptionHtml || '')

  // If long_descriptions metafield exists, use it as the clean description
  // (it contains expanded description without structured data)
  if (metafields.long_descriptions) {
    const richTextContent = parseRichTextJson(metafields.long_descriptions)
    if (richTextContent) {
      parsed.cleanDescription = richTextContent
    }
  }

  // Debug logging
  console.log('=== Product Parser Debug ===')
  console.log('Handle:', shopifyProduct.handle)
  console.log('Raw descriptionHtml:', shopifyProduct.descriptionHtml)
  console.log('Has long_descriptions metafield:', !!metafields.long_descriptions)
  console.log('Parsed scentNotes:', JSON.stringify(parsed.scentNotes, null, 2))
  console.log('Parsed scentProfile:', JSON.stringify(parsed.scentProfile, null, 2))

  // Use metafield scent notes if available, otherwise use parsed from description
  const scentNotes = hasMetafieldScentNotes ? metafieldScentNotes : parsed.scentNotes
  const hasScentNotes = scentNotes.top.length || scentNotes.heart.length || scentNotes.base.length

  // Use parsed scent profile
  const scentProfile = parsed.scentProfile
  const hasScentProfile = scentProfile.fragranceFamily || scentProfile.mood || scentProfile.bestWorn

  // Parse product details
  const details = {
    size: '50ml Eau de Parfum',
    longevity: metafields.longevity || '6-8 hours',
    concentration: metafields.concentration || '18% fragrance oil',
    isVegan: metafields.is_vegan === 'true',
    isCrueltyFree: metafields.is_cruelty_free === 'true',
    ingredients: metafields.ingredients,
  }

  // Calculate value anchor
  const price = parseFloat(shopifyProduct.priceRange.minVariantPrice.amount)
  const pricePerWear = (price / 100).toFixed(2) // Assuming ~100 wears per 50ml
  const valueAnchor = `Less than €${pricePerWear} per wear — a luxury that lasts.`

  // Use clean description if we parsed structured data, otherwise use original
  const cleanDescription = parsed.cleanDescription || shopifyProduct.description

  return {
    id: shopifyProduct.id,
    handle: shopifyProduct.handle,
    title: shopifyProduct.title,
    description: cleanDescription,
    descriptionHtml: shopifyProduct.descriptionHtml,
    subtitle: metafields.subtitle,
    scentTags: metafields.scent_tags ? JSON.parse(metafields.scent_tags) : undefined,
    scentNotes: hasScentNotes ? scentNotes : undefined,
    scentProfile: hasScentProfile ? scentProfile : undefined,
    details,
    valueAnchor,
    tags: shopifyProduct.tags,
    productType: shopifyProduct.productType,
    vendor: shopifyProduct.vendor,
    availableForSale: shopifyProduct.availableForSale,
    priceRange: shopifyProduct.priceRange,
    images: shopifyProduct.images.edges.map((edge: any) => edge.node),
    variants: shopifyProduct.variants.edges.map((edge: any) => edge.node),
  }
}

// API Functions
export async function getProducts(language: ShopifyLanguage = 'EN'): Promise<Product[]> {
  const query = `
    query GetProducts {
      products(first: 50) {
        edges {
          node {
            ...ProductFragment
          }
        }
      }
    }
    ${PRODUCT_FRAGMENT}
  `

  const data = await shopifyFetch<{ products: { edges: { node: any }[] } }>(query, undefined, language)
  return data.products.edges.map(edge => transformProduct(edge.node))
}

export async function getProduct(handle: string, language: ShopifyLanguage = 'EN'): Promise<Product | null> {
  const query = `
    query GetProduct($handle: String!) {
      product(handle: $handle) {
        ...ProductFragment
      }
    }
    ${PRODUCT_FRAGMENT}
  `

  const data = await shopifyFetch<{ product: any }>(query, { handle }, language)
  return data.product ? transformProduct(data.product) : null
}

export async function getCollection(handle: string, language: ShopifyLanguage = 'EN'): Promise<Collection | null> {
  const query = `
    query GetCollection($handle: String!) {
      collection(handle: $handle) {
        id
        handle
        title
        description
        image {
          id
          url
          altText
          width
          height
        }
        products(first: 50) {
          edges {
            node {
              ...ProductFragment
            }
          }
        }
      }
    }
    ${PRODUCT_FRAGMENT}
  `

  const data = await shopifyFetch<{ collection: any }>(query, { handle }, language)

  if (!data.collection) return null

  return {
    ...data.collection,
    products: data.collection.products.edges.map((edge: any) => transformProduct(edge.node)),
  }
}

export async function createCart(): Promise<Cart> {
  const query = `
    mutation CreateCart {
      cartCreate {
        cart {
          ...CartFragment
        }
        userErrors {
          field
          message
        }
      }
    }
    ${CART_FRAGMENT}
  `

  const data = await shopifyFetch<{ cartCreate: { cart: any; userErrors: ShopifyUserError[] } }>(query)
  checkUserErrors(data.cartCreate.userErrors)
  return transformCart(data.cartCreate.cart)
}

export async function addToCart(cartId: string, variantId: string, quantity: number = 1): Promise<Cart> {
  const query = `
    mutation AddToCart($cartId: ID!, $lines: [CartLineInput!]!) {
      cartLinesAdd(cartId: $cartId, lines: $lines) {
        cart {
          ...CartFragment
        }
        userErrors {
          field
          message
        }
      }
    }
    ${CART_FRAGMENT}
  `

  const data = await shopifyFetch<{ cartLinesAdd: { cart: any; userErrors: ShopifyUserError[] } }>(query, {
    cartId,
    lines: [{ merchandiseId: variantId, quantity }],
  })

  checkUserErrors(data.cartLinesAdd.userErrors)
  return transformCart(data.cartLinesAdd.cart)
}

export async function updateCartItem(cartId: string, lineId: string, quantity: number): Promise<Cart> {
  const query = `
    mutation UpdateCartItem($cartId: ID!, $lines: [CartLineUpdateInput!]!) {
      cartLinesUpdate(cartId: $cartId, lines: $lines) {
        cart {
          ...CartFragment
        }
        userErrors {
          field
          message
        }
      }
    }
    ${CART_FRAGMENT}
  `

  const data = await shopifyFetch<{ cartLinesUpdate: { cart: any; userErrors: ShopifyUserError[] } }>(query, {
    cartId,
    lines: [{ id: lineId, quantity }],
  })

  checkUserErrors(data.cartLinesUpdate.userErrors)
  return transformCart(data.cartLinesUpdate.cart)
}

export async function removeFromCart(cartId: string, lineIds: string[]): Promise<Cart> {
  const query = `
    mutation RemoveFromCart($cartId: ID!, $lineIds: [ID!]!) {
      cartLinesRemove(cartId: $cartId, lineIds: $lineIds) {
        cart {
          ...CartFragment
        }
        userErrors {
          field
          message
        }
      }
    }
    ${CART_FRAGMENT}
  `

  const data = await shopifyFetch<{ cartLinesRemove: { cart: any; userErrors: ShopifyUserError[] } }>(query, {
    cartId,
    lineIds,
  })

  checkUserErrors(data.cartLinesRemove.userErrors)
  return transformCart(data.cartLinesRemove.cart)
}

export async function searchProducts(query: string, language: ShopifyLanguage = 'EN'): Promise<Product[]> {
  const searchQuery = `
    query SearchProducts($query: String!) {
      products(first: 20, query: $query) {
        edges {
          node {
            ...ProductFragment
          }
        }
      }
    }
    ${PRODUCT_FRAGMENT}
  `

  const data = await shopifyFetch<{ products: { edges: { node: any }[] } }>(searchQuery, { query }, language)
  return data.products.edges.map(edge => transformProduct(edge.node))
}

export async function getCart(cartId: string, language: ShopifyLanguage = 'EN'): Promise<Cart | null> {
  const query = `
    query GetCart($cartId: ID!) {
      cart(id: $cartId) {
        ...CartFragment
      }
    }
    ${CART_FRAGMENT}
  `

  try {
    const data = await shopifyFetch<{ cart: any }>(query, { cartId }, language)
    return data.cart ? transformCart(data.cart) : null
  } catch {
    return null
  }
}

function transformCart(shopifyCart: any): Cart {
  return {
    id: shopifyCart.id,
    checkoutUrl: shopifyCart.checkoutUrl,
    totalQuantity: shopifyCart.totalQuantity,
    subtotal: {
      amount: shopifyCart.cost.subtotalAmount.amount,
      currencyCode: shopifyCart.cost.subtotalAmount.currencyCode,
    },
    items: shopifyCart.lines.edges.map((edge: any) => ({
      id: edge.node.id,
      variantId: edge.node.merchandise.id,
      quantity: edge.node.quantity,
      product: transformProduct(edge.node.merchandise.product),
    })),
  }
}
