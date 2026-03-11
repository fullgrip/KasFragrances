import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { ScentNotes, ProductDetails, ImageGallery, Reviews } from '../components/product'
import { TrustBadges, ProductPageSkeleton } from '../components/ui'
import { useCartStore } from '../store/cart'
import type { Product } from '../types'
import { getProduct, mapLanguageCode } from '../lib/shopify'
import { FEATURES } from '../config/features'

// Placeholder products for development
const placeholderProducts: Record<string, Product> = {
  'citrus-marine-wood': {
    id: '1',
    handle: 'citrus-marine-wood',
    title: 'Citrus Marine & Wood',
    description: 'A bright, coastal opening of sun-drenched citrus melting into marine salt air, anchored by warm, lingering driftwood. Unisex. Handcrafted in small batches.',
    descriptionHtml: '<p>A bright, coastal opening of sun-drenched citrus melting into marine salt air, anchored by warm, lingering driftwood. Unisex. Handcrafted in small batches.</p>',
    subtitle: 'A bright, coastal opening of sun-drenched citrus melting into marine salt air, anchored by warm, lingering driftwood. Unisex. Handcrafted in small batches.',
    scentNotes: {
      top: ['Bergamot', 'Lemon Zest', 'Sea Salt'],
      heart: ['Marine Accord', 'Jasmine', 'Vetiver'],
      base: ['Cedarwood', 'Amber', 'White Musk'],
    },
    details: {
      size: '50ml Eau de Parfum',
      longevity: '6-8 hours on skin',
      concentration: '18% fragrance oil',
      isVegan: false,
      isCrueltyFree: true,
      ingredients: 'Alcohol Denat., Parfum (Fragrance), Aqua (Water), Limonene, Linalool, Coumarin, Citral',
    },
    valueAnchor: 'Less than €0.45 per wear — a luxury that lasts.',
    images: [],
    variants: [{ id: 'v1', title: '50ml', price: { amount: '45.00', currencyCode: 'EUR' }, availableForSale: true }],
    tags: ['unisex', 'fresh', 'marine'],
    productType: 'Eau de Parfum',
    vendor: 'KAS Fragrances',
    availableForSale: true,
    priceRange: { minVariantPrice: { amount: '45.00', currencyCode: 'EUR' }, maxVariantPrice: { amount: '45.00', currencyCode: 'EUR' } },
  },
  'discovery-set': {
    id: 'ds',
    handle: 'discovery-set',
    title: 'KAS Discovery Set',
    description: 'Not sure which scent is yours? Try five of our signature fragrances for just €15 — and we\'ll include a €10 credit toward your first full bottle.',
    descriptionHtml: '<p>Not sure which scent is yours? Try five of our signature fragrances for just €15 — and we\'ll include a €10 credit toward your first full bottle.</p>',
    subtitle: 'Five signature scents hand-picked by Kim to showcase our range.',
    details: {
      size: '5 × 2ml spray vials',
      longevity: '3-5 wears per vial',
      concentration: 'Eau de Parfum',
      isVegan: false,
      isCrueltyFree: true,
    },
    valueAnchor: 'Includes €10 credit toward your first full bottle',
    images: [
      { id: 'ds-img-1', url: '/images/discovery-set.jpg', altText: 'KAS Discovery Set - 5 perfume sample vials', width: 800, height: 800 },
    ],
    variants: [{ id: 'vds', title: '5 Samples', price: { amount: '15.00', currencyCode: 'EUR' }, availableForSale: true }],
    tags: ['discovery', 'samples', 'gift'],
    productType: 'Sample Set',
    vendor: 'KAS Fragrances',
    availableForSale: true,
    priceRange: { minVariantPrice: { amount: '15.00', currencyCode: 'EUR' }, maxVariantPrice: { amount: '15.00', currencyCode: 'EUR' } },
  },
}

export function ProductPage() {
  const { handle } = useParams<{ handle: string }>()
  const { t, i18n } = useTranslation()
  const [product, setProduct] = useState<Product | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [selectedVariant, setSelectedVariant] = useState<string | null>(null)
  const [quantity, setQuantity] = useState(1)
  const { addItem, isLoading: isAddingToCart } = useCartStore()

  useEffect(() => {
    async function fetchProduct() {
      if (!handle) return

      setIsLoading(true)

      try {
        const language = mapLanguageCode(i18n.language)
        const shopifyProduct = await getProduct(handle, language)
        if (shopifyProduct) {
          setProduct(shopifyProduct)
          setSelectedVariant(shopifyProduct.variants[0]?.id || null)
        } else if (placeholderProducts[handle]) {
          setProduct(placeholderProducts[handle])
          setSelectedVariant(placeholderProducts[handle].variants[0]?.id || null)
        } else {
          setProduct(null)
        }
      } catch (error) {
        console.log('Using placeholder product')
        if (handle && placeholderProducts[handle]) {
          setProduct(placeholderProducts[handle])
          setSelectedVariant(placeholderProducts[handle].variants[0]?.id || null)
        } else {
          setProduct(null)
        }
      } finally {
        setIsLoading(false)
      }
    }
    fetchProduct()
  }, [handle, i18n.language])

  const handleAddToCart = () => {
    if (product && selectedVariant) {
      addItem(product, selectedVariant, quantity)
    }
  }

  if (isLoading) {
    return <ProductPageSkeleton />
  }

  if (!product) {
    return (
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20 text-center">
        <h1 className="section-heading">Product Not Found</h1>
        <p className="text-kas-slate mt-4">The product you're looking for doesn't exist.</p>
        <Link to="/collection" className="btn-primary mt-8 inline-block">
          View Collection
        </Link>
      </div>
    )
  }

  const currentVariant = product.variants.find(v => v.id === selectedVariant)
  const price = currentVariant
    ? parseFloat(currentVariant.price.amount)
    : parseFloat(product.priceRange.minVariantPrice.amount)
  const isDiscoverySet = product.handle === 'discovery-set'
  const isComingSoon = isDiscoverySet && !FEATURES.DISCOVERY_SET_ENABLED

  return (
    <div className="py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <nav className="mb-8">
          <ol className="flex items-center gap-2 text-sm">
            <li>
              <Link to="/" className="text-kas-slate hover:text-kas-charcoal">Home</Link>
            </li>
            <li className="text-kas-slate">/</li>
            <li>
              <Link to="/collection" className="text-kas-slate hover:text-kas-charcoal">Collection</Link>
            </li>
            <li className="text-kas-slate">/</li>
            <li className="text-kas-charcoal">{product.title}</li>
          </ol>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Images */}
          <div>
            <ImageGallery images={product.images} productTitle={product.title} />
          </div>

          {/* Product Info */}
          <div>
            {/* Coming Soon Banner */}
            {isComingSoon && (
              <div className="mb-6 bg-kas-gold/20 border border-kas-gold rounded-xl p-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-kas-gold/30 flex items-center justify-center">
                    <svg className="w-5 h-5 text-kas-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-serif text-lg text-kas-charcoal">Coming Soon</p>
                    <p className="text-sm text-kas-slate">This product is not yet available for purchase.</p>
                  </div>
                </div>
              </div>
            )}

            {/* Title & Subtitle */}
            <div className="mb-6">
              <h1 className="font-serif text-3xl md:text-4xl text-kas-charcoal">
                {product.title}
              </h1>
              {product.subtitle && (
                <p className="mt-3 text-kas-slate font-light leading-relaxed">
                  {product.subtitle}
                </p>
              )}
              {/* Long Description */}
              {product.description && product.description !== product.subtitle && (
                <p className="mt-4 text-kas-slate leading-relaxed">
                  {product.description}
                </p>
              )}
            </div>

            {/* Price & Value Anchor */}
            <div className="mb-6">
              <p className="font-serif text-2xl text-kas-charcoal">€{price.toFixed(2)}</p>
              {product.valueAnchor && (
                <p className="text-sm text-kas-gold mt-1">{product.valueAnchor}</p>
              )}
            </div>

            {/* Size Selector */}
            {product.variants.length > 1 && (
              <div className="mb-6">
                <label className="text-sm text-kas-slate mb-2 block">Size</label>
                <div className="flex gap-3">
                  {product.variants.map((variant) => (
                    <button
                      key={variant.id}
                      onClick={() => setSelectedVariant(variant.id)}
                      disabled={!variant.availableForSale}
                      className={`px-4 py-2 border rounded-lg transition-colors ${
                        selectedVariant === variant.id
                          ? 'border-kas-charcoal bg-kas-charcoal text-white'
                          : 'border-kas-sand hover:border-kas-charcoal'
                      } ${!variant.availableForSale ? 'opacity-50 cursor-not-allowed' : ''}`}
                    >
                      {variant.title}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Scent Notes & Profile */}
            {(product.scentNotes || product.scentProfile) && (
              <div className="mb-6">
                <ScentNotes
                  notes={product.scentNotes || { top: [], heart: [], base: [] }}
                  profile={product.scentProfile}
                />
              </div>
            )}

            {/* Discovery Set specifics */}
            {isDiscoverySet && (
              <div className="mb-6 bg-kas-sand/50 rounded-xl p-6">
                <h3 className="font-serif text-lg text-kas-charcoal mb-3">{t('product.whatsIncluded')}</h3>
                <ul className="space-y-2 text-kas-slate">
                  <li className="flex items-start gap-2">
                    <svg className="w-5 h-5 text-kas-gold flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    {t('product.discoveryItem1')}
                  </li>
                  <li className="flex items-start gap-2">
                    <svg className="w-5 h-5 text-kas-gold flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    {t('product.discoveryItem2')}
                  </li>
                  <li className="flex items-start gap-2">
                    <svg className="w-5 h-5 text-kas-gold flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    {t('product.discoveryItem3')}
                  </li>
                </ul>
              </div>
            )}

            {/* How to Test Your Samples */}
            {isDiscoverySet && (
              <div className="mb-6 bg-kas-sand/30 rounded-xl p-6">
                <h3 className="font-serif text-lg text-kas-charcoal mb-4">{t('product.howToTest')}</h3>
                <ol className="space-y-3 text-kas-slate">
                  <li className="flex gap-3">
                    <span className="font-serif text-kas-gold">1.</span>
                    <span>{t('product.testStep1')}</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="font-serif text-kas-gold">2.</span>
                    <span>{t('product.testStep2')}</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="font-serif text-kas-gold">3.</span>
                    <span>{t('product.testStep3')}</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="font-serif text-kas-gold">4.</span>
                    <span>{t('product.testStep4')}</span>
                  </li>
                </ol>
              </div>
            )}

            {/* Quantity & Add to Cart */}
            <div className="space-y-4 mb-6">
              <div className="flex items-center gap-4">
                <label className="text-sm text-kas-slate">Quantity</label>
                <div className="flex items-center border border-kas-sand rounded">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-10 h-10 flex items-center justify-center text-kas-slate hover:text-kas-charcoal transition-colors"
                    aria-label="Decrease quantity"
                  >
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                    </svg>
                  </button>
                  <span className="w-12 text-center">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-10 h-10 flex items-center justify-center text-kas-slate hover:text-kas-charcoal transition-colors"
                    aria-label="Increase quantity"
                  >
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                  </button>
                </div>
              </div>

              <button
                onClick={handleAddToCart}
                disabled={isAddingToCart || !product.availableForSale || isComingSoon}
                className="btn-primary w-full disabled:opacity-50"
              >
                {isComingSoon ? 'Coming Soon' : isAddingToCart ? 'Adding...' : product.availableForSale ? 'Add to Cart' : 'Sold Out'}
              </button>
            </div>

            {/* Samples reminder */}
            <div className="bg-kas-gold/10 rounded-lg p-4 flex items-start gap-3 mb-6">
              <span className="text-xl">🎁</span>
              <p className="text-sm text-kas-charcoal">
                Every order includes <strong>2 complimentary samples</strong> of your choice.
              </p>
            </div>

            {/* Product Details Accordion */}
            {product.details && <ProductDetails details={product.details} selectedVariantTitle={currentVariant?.title} />}

            {/* Trust Badges */}
            <div className="border-t border-kas-sand pt-6 mt-6">
              <TrustBadges variant="compact" />
            </div>
          </div>
        </div>

        {/* Reviews Section */}
        <Reviews productHandle={product.handle} productTitle={product.title} />
      </div>
    </div>
  )
}
