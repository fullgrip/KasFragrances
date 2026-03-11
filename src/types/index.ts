// Product types matching Shopify Storefront API
export interface ProductImage {
  id: string
  url: string
  altText: string | null
  width: number
  height: number
}

export interface ProductVariant {
  id: string
  title: string
  price: {
    amount: string
    currencyCode: string
  }
  compareAtPrice?: {
    amount: string
    currencyCode: string
  } | null
  availableForSale: boolean
  quantityAvailable?: number
}

export interface ScentNotes {
  top: string[]
  heart: string[]
  base: string[]
}

export interface ScentProfile {
  fragranceFamily?: string  // "Resinous · Woody · Spicy"
  mood?: string             // "Mysterious · Warm · Intimate"
  bestWorn?: string         // "Evening · Cooler days"
}

export interface ProductDetails {
  size: string
  longevity: string
  concentration: string
  isVegan: boolean
  isCrueltyFree: boolean
  ingredients?: string
}

export interface Product {
  id: string
  handle: string
  title: string
  description: string
  descriptionHtml: string
  // Extended fields for fragrance-specific data
  subtitle?: string
  scentTags?: string[]  // Short scent cues: ['Fresh', 'Marine', 'Woody']
  scentNotes?: ScentNotes
  scentProfile?: ScentProfile
  details?: ProductDetails
  valueAnchor?: string // e.g., "Less than €0.50 per wear"
  images: ProductImage[]
  variants: ProductVariant[]
  tags: string[]
  productType: string
  vendor: string
  availableForSale: boolean
  priceRange: {
    minVariantPrice: {
      amount: string
      currencyCode: string
    }
    maxVariantPrice: {
      amount: string
      currencyCode: string
    }
  }
}

export interface CartItem {
  id: string
  variantId: string
  product: Product
  quantity: number
  selectedOptions?: { name: string; value: string }[]
}

export interface Cart {
  id: string
  checkoutUrl: string
  items: CartItem[]
  totalQuantity: number
  subtotal: {
    amount: string
    currencyCode: string
  }
}

export interface Collection {
  id: string
  handle: string
  title: string
  description: string
  image?: ProductImage
  products: Product[]
}

// Testimonial type
export interface Testimonial {
  id: string
  quote: string
  author: string
  rating: number
  productName: string
  productSlug: string
  scentTags: string[]
  avatar?: string
}

// Navigation types
export interface NavLink {
  label: string
  href: string
}
