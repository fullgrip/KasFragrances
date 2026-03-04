import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { ProductCard } from '../components/product'
import { Testimonials } from '../components/ui'
import type { Product } from '../types'
import { getProducts, mapLanguageCode } from '../lib/shopify'

// Placeholder products for development/demo (shown when Shopify isn't connected)
const placeholderProducts: Product[] = [
  {
    id: '1',
    handle: 'citrus-marine-wood',
    title: 'Citrus Marine & Wood',
    description: 'A bright, coastal opening of sun-drenched citrus melting into marine salt air, anchored by warm, lingering driftwood.',
    descriptionHtml: '',
    subtitle: 'A bright, coastal opening of sun-drenched citrus melting into marine salt air, anchored by warm, lingering driftwood.',
    scentNotes: {
      top: ['Bergamot', 'Lemon Zest', 'Sea Salt'],
      heart: ['Marine Accord', 'Jasmine', 'Vetiver'],
      base: ['Cedarwood', 'Amber', 'White Musk'],
    },
    details: {
      size: '50ml Eau de Parfum',
      longevity: '6-8 hours',
      concentration: '18% fragrance oil',
      isVegan: true,
      isCrueltyFree: true,
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
  {
    id: '2',
    handle: 'rose-amber',
    title: 'Rose & Amber',
    description: 'Velvety Damascus rose embraced by warm amber and a whisper of vanilla.',
    descriptionHtml: '',
    subtitle: 'Velvety Damascus rose embraced by warm amber and a whisper of vanilla.',
    scentNotes: {
      top: ['Pink Pepper', 'Bergamot'],
      heart: ['Damascus Rose', 'Peony', 'Saffron'],
      base: ['Amber', 'Vanilla', 'Sandalwood'],
    },
    details: {
      size: '50ml Eau de Parfum',
      longevity: '8-10 hours',
      concentration: '20% fragrance oil',
      isVegan: true,
      isCrueltyFree: true,
    },
    valueAnchor: 'Less than €0.55 per wear — a luxury that lasts.',
    images: [],
    variants: [{ id: 'v2', title: '50ml', price: { amount: '55.00', currencyCode: 'EUR' }, availableForSale: true }],
    tags: ['feminine', 'floral', 'warm'],
    productType: 'Eau de Parfum',
    vendor: 'KAS Fragrances',
    availableForSale: true,
    priceRange: { minVariantPrice: { amount: '55.00', currencyCode: 'EUR' }, maxVariantPrice: { amount: '55.00', currencyCode: 'EUR' } },
  },
  {
    id: '3',
    handle: 'oud-velvet',
    title: 'Oud Velvet',
    description: 'Rich, smoky oud layered with velvet rose and precious woods.',
    descriptionHtml: '',
    subtitle: 'Rich, smoky oud layered with velvet rose and precious woods.',
    scentNotes: {
      top: ['Saffron', 'Cardamom'],
      heart: ['Oud', 'Bulgarian Rose', 'Leather'],
      base: ['Sandalwood', 'Musk', 'Benzoin'],
    },
    details: {
      size: '50ml Eau de Parfum',
      longevity: '10-12 hours',
      concentration: '22% fragrance oil',
      isVegan: true,
      isCrueltyFree: true,
    },
    valueAnchor: 'Less than €0.75 per wear — a luxury that lasts.',
    images: [],
    variants: [{ id: 'v3', title: '50ml', price: { amount: '75.00', currencyCode: 'EUR' }, availableForSale: true }],
    tags: ['unisex', 'oriental', 'intense'],
    productType: 'Eau de Parfum',
    vendor: 'KAS Fragrances',
    availableForSale: true,
    priceRange: { minVariantPrice: { amount: '75.00', currencyCode: 'EUR' }, maxVariantPrice: { amount: '75.00', currencyCode: 'EUR' } },
  },
]

export function HomePage() {
  const [products, setProducts] = useState<Product[]>(placeholderProducts)
  const [isLoading, setIsLoading] = useState(true)
  const { t, i18n } = useTranslation()

  useEffect(() => {
    async function fetchProducts() {
      try {
        const language = mapLanguageCode(i18n.language)
        const shopifyProducts = await getProducts(language)
        if (shopifyProducts.length > 0) {
          setProducts(shopifyProducts)
        }
      } catch (error) {
        console.error('Shopify fetch error:', error)
      } finally {
        setIsLoading(false)
      }
    }
    fetchProducts()
  }, [i18n.language])

  return (
    <div>
      {/* Hero Section */}
      <section className="relative bg-kas-sand overflow-hidden">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 md:py-24 lg:py-32">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            <div>
              <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-kas-charcoal leading-tight animate-fade-in">
                {t('home.heroTitle1')}
                <br />
                <span className="text-kas-gold">{t('home.heroTitle2')}</span>
              </h1>
              <p className="mt-6 text-lg text-kas-slate font-light leading-relaxed animate-fade-in-delay">
                {t('home.heroSubtitle')}
              </p>
              <div className="mt-8 flex flex-wrap gap-4 animate-fade-in-delay">
                <Link to="/collection" className="btn-primary">
                  {t('home.exploreCollection')}
                </Link>
                <Link to="/products/discovery-set" className="btn-secondary">
                  {t('home.tryDiscoverySet')}
                </Link>
              </div>
            </div>

            {/* Hero Image */}
            <div className="relative aspect-[4/5] md:aspect-[3/4] lg:aspect-[4/5]">
              <img
                src="/images/banners/hero.webp"
                alt="KAS Fragrances"
                className="w-full h-full object-cover object-center rounded-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Value Propositions */}
      <section className="py-12 border-b border-kas-sand">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="w-12 h-12 mx-auto mb-4 flex items-center justify-center rounded-full bg-kas-gold/10">
                <svg className="w-6 h-6 text-kas-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="font-serif text-lg text-kas-charcoal">{t('home.artisanQuality')}</h3>
              <p className="mt-2 text-sm text-kas-slate font-light">
                {t('home.artisanQualityDesc')}
              </p>
            </div>
            <div>
              <div className="w-12 h-12 mx-auto mb-4 flex items-center justify-center rounded-full bg-kas-gold/10">
                <svg className="w-6 h-6 text-kas-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7" />
                </svg>
              </div>
              <h3 className="font-serif text-lg text-kas-charcoal">{t('home.freeSamples')}</h3>
              <p className="mt-2 text-sm text-kas-slate font-light">
                {t('home.freeSamplesDesc')}
              </p>
            </div>
            <div>
              <div className="w-12 h-12 mx-auto mb-4 flex items-center justify-center rounded-full bg-kas-gold/10">
                <svg className="w-6 h-6 text-kas-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
                </svg>
              </div>
              <h3 className="font-serif text-lg text-kas-charcoal">{t('home.freeShipping')}</h3>
              <p className="mt-2 text-sm text-kas-slate font-light">
                {t('home.freeShippingDesc')}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="section-heading">{t('home.theCollection')}</h2>
            <p className="section-subheading">
              {t('home.collectionSubtitle')}
            </p>
          </div>

          {isLoading ? (
            <div className="flex justify-center py-12">
              <div className="w-10 h-10 border-2 border-kas-gold border-t-transparent rounded-full animate-spin" />
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {products.slice(0, 6).map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}

          <div className="text-center mt-12">
            <Link to="/collection" className="btn-secondary">
              {t('home.viewAllFragrances')}
            </Link>
          </div>
        </div>
      </section>

      {/* Discovery Set CTA */}
      <section className="py-20 bg-kas-charcoal text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <span className="text-kas-gold text-sm uppercase tracking-widest">{t('home.discoveryNew')}</span>
            <h2 className="font-serif text-3xl md:text-4xl mt-4 mb-6">
              {t('home.discoveryTitle')}
            </h2>
            <p className="text-gray-300 font-light leading-relaxed mb-8">
              {t('home.discoveryDesc')}
            </p>
            <Link to="/products/discovery-set" className="btn-gold">
              {t('home.getDiscoverySet')}
            </Link>
            <p className="text-sm text-gray-400 mt-4">
              {t('home.discoveryDetails')}
            </p>
          </div>
        </div>
      </section>

      {/* About Kim / Story Teaser */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="order-2 lg:order-1">
              <span className="text-kas-gold text-sm uppercase tracking-widest">{t('home.theArtisan')}</span>
              <h2 className="font-serif text-3xl md:text-4xl text-kas-charcoal mt-4 mb-6">
                {t('home.handcraftedByKim')}
              </h2>
              <p className="text-kas-slate font-light leading-relaxed mb-6">
                {t('home.kimStory1')}
              </p>
              <p className="text-kas-slate font-light leading-relaxed mb-8">
                {t('home.kimQuote')}
              </p>
              <Link to="/about" className="link-underline text-kas-charcoal font-medium">
                {t('home.readOurStory')}
              </Link>
            </div>
            <div className="order-1 lg:order-2 flex justify-center lg:justify-end">
              <div className="aspect-[3/4] w-full max-w-md lg:max-w-lg bg-kas-sand rounded-2xl overflow-hidden shadow-xl">
                <video
                  className="w-full h-full object-cover"
                  autoPlay
                  muted
                  loop
                  playsInline
                >
                  <source src="/images/banners/artisan.mp4" type="video/mp4" />
                </video>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <Testimonials />
    </div>
  )
}
