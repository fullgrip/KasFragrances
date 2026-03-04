import { useEffect, useState, useMemo } from 'react'
import { useSearchParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { ProductCard } from '../components/product'
import { ProductGridSkeleton } from '../components/ui'
import type { Product } from '../types'
import { getProducts, mapLanguageCode } from '../lib/shopify'

// Placeholder products
const placeholderProducts: Product[] = [
  {
    id: '1',
    handle: 'citrus-marine-wood',
    title: 'Citrus Marine & Wood',
    description: 'A bright, coastal opening of sun-drenched citrus melting into marine salt air, anchored by warm, lingering driftwood.',
    descriptionHtml: '',
    subtitle: 'Fresh · Marine · Woody',
    valueAnchor: 'Less than €0.45 per wear',
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
    subtitle: 'Floral · Warm · Sensual',
    valueAnchor: 'Less than €0.55 per wear',
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
    subtitle: 'Oriental · Smoky · Luxurious',
    valueAnchor: 'Less than €0.75 per wear',
    images: [],
    variants: [{ id: 'v3', title: '50ml', price: { amount: '75.00', currencyCode: 'EUR' }, availableForSale: true }],
    tags: ['unisex', 'oriental', 'intense'],
    productType: 'Eau de Parfum',
    vendor: 'KAS Fragrances',
    availableForSale: true,
    priceRange: { minVariantPrice: { amount: '75.00', currencyCode: 'EUR' }, maxVariantPrice: { amount: '75.00', currencyCode: 'EUR' } },
  },
  {
    id: '4',
    handle: 'white-tea-ginger',
    title: 'White Tea & Ginger',
    description: 'Clean white tea with a subtle spice of ginger and soft musks.',
    descriptionHtml: '',
    subtitle: 'Clean · Fresh · Subtle',
    valueAnchor: 'Less than €0.40 per wear',
    images: [],
    variants: [{ id: 'v4', title: '50ml', price: { amount: '40.00', currencyCode: 'EUR' }, availableForSale: true }],
    tags: ['unisex', 'fresh', 'clean'],
    productType: 'Eau de Parfum',
    vendor: 'KAS Fragrances',
    availableForSale: true,
    priceRange: { minVariantPrice: { amount: '40.00', currencyCode: 'EUR' }, maxVariantPrice: { amount: '40.00', currencyCode: 'EUR' } },
  },
  {
    id: '5',
    handle: 'midnight-jasmine',
    title: 'Midnight Jasmine',
    description: 'Intoxicating jasmine blooming at night with dark vanilla undertones.',
    descriptionHtml: '',
    subtitle: 'Floral · Intense · Mysterious',
    valueAnchor: 'Less than €0.60 per wear',
    images: [],
    variants: [{ id: 'v5', title: '50ml', price: { amount: '60.00', currencyCode: 'EUR' }, availableForSale: true }],
    tags: ['feminine', 'floral', 'evening'],
    productType: 'Eau de Parfum',
    vendor: 'KAS Fragrances',
    availableForSale: true,
    priceRange: { minVariantPrice: { amount: '60.00', currencyCode: 'EUR' }, maxVariantPrice: { amount: '60.00', currencyCode: 'EUR' } },
  },
  {
    id: '6',
    handle: 'discovery-set',
    title: 'Discovery Set',
    description: 'Try three of our signature fragrances. Includes €10 credit toward your first full bottle.',
    descriptionHtml: '',
    subtitle: '3 × 2ml samples · €10 credit included',
    valueAnchor: 'Best way to find your scent',
    images: [],
    variants: [{ id: 'v6', title: '3 Samples', price: { amount: '15.00', currencyCode: 'EUR' }, availableForSale: true }],
    tags: ['discovery', 'samples', 'gift'],
    productType: 'Sample Set',
    vendor: 'KAS Fragrances',
    availableForSale: true,
    priceRange: { minVariantPrice: { amount: '15.00', currencyCode: 'EUR' }, maxVariantPrice: { amount: '15.00', currencyCode: 'EUR' } },
  },
]

type SortOption = 'featured' | 'price-asc' | 'price-desc' | 'name-asc' | 'name-desc'

// Helper functions to categorize products (tags only)
const isDiffuser = (product: Product): boolean => {
  const tags = product.tags.map(t => t.toLowerCase())
  return tags.includes('diffuser')
}

const isBodyCare = (product: Product): boolean => {
  const tags = product.tags.map(t => t.toLowerCase())
  return tags.includes('bodycare')
}

const isPerfume = (product: Product): boolean => {
  const tags = product.tags.map(t => t.toLowerCase())
  return tags.includes('perfume')
}

// Match product to category filter
const matchesCategory = (product: Product, filter: string): boolean => {
  if (filter === 'all') return true
  if (filter === 'perfume') return isPerfume(product)
  if (filter === 'diffuser') return isDiffuser(product)
  if (filter === 'bodycare') return isBodyCare(product)
  return true
}

export function CollectionPage() {
  const { t, i18n } = useTranslation()

  const categoryFilters = [
    { value: 'all', label: t('collection.all') },
    { value: 'perfume', label: t('collection.perfumes') },
    { value: 'diffuser', label: t('collection.diffusers') },
    { value: 'bodycare', label: t('collection.bodyCare') },
  ]

  const sortOptions: { value: SortOption; label: string }[] = [
    { value: 'featured', label: t('collection.featured') },
    { value: 'price-asc', label: t('collection.priceLowHigh') },
    { value: 'price-desc', label: t('collection.priceHighLow') },
    { value: 'name-asc', label: t('collection.nameAZ') },
    { value: 'name-desc', label: t('collection.nameZA') },
  ]
  const [searchParams, setSearchParams] = useSearchParams()
  const [products, setProducts] = useState<Product[]>(placeholderProducts)
  const [isLoading, setIsLoading] = useState(true)
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false)

  // Get filter and sort from URL params
  const filter = searchParams.get('filter') || 'all'
  const sort = (searchParams.get('sort') as SortOption) || 'featured'

  useEffect(() => {
    async function fetchProducts() {
      try {
        const language = mapLanguageCode(i18n.language)
        const shopifyProducts = await getProducts(language)
        if (shopifyProducts.length > 0) {
          // Debug: log productType values
          console.log('=== Product Types from Shopify ===')
          shopifyProducts.forEach(p => {
            console.log(`${p.title}: productType="${p.productType}", tags=${JSON.stringify(p.tags)}`)
          })
          setProducts(shopifyProducts)
        }
      } catch (error) {
        console.log('Using placeholder products')
      } finally {
        setIsLoading(false)
      }
    }
    fetchProducts()
  }, [i18n.language])

  // Update URL params
  const updateParams = (key: string, value: string) => {
    const newParams = new URLSearchParams(searchParams)
    if (value === 'all' || value === 'featured') {
      newParams.delete(key)
    } else {
      newParams.set(key, value)
    }
    setSearchParams(newParams)
  }

  // Filter and sort products
  const filteredAndSortedProducts = useMemo(() => {
    let result = products.filter(p => matchesCategory(p, filter))

    // Sort
    switch (sort) {
      case 'price-asc':
        result.sort((a, b) =>
          parseFloat(a.priceRange.minVariantPrice.amount) - parseFloat(b.priceRange.minVariantPrice.amount)
        )
        break
      case 'price-desc':
        result.sort((a, b) =>
          parseFloat(b.priceRange.minVariantPrice.amount) - parseFloat(a.priceRange.minVariantPrice.amount)
        )
        break
      case 'name-asc':
        result.sort((a, b) => a.title.localeCompare(b.title))
        break
      case 'name-desc':
        result.sort((a, b) => b.title.localeCompare(a.title))
        break
      default:
        // Featured - keep original order
        break
    }

    return result
  }, [products, filter, sort])

  const activeFilterCount = (filter !== 'all' ? 1 : 0) + (sort !== 'featured' ? 1 : 0)

  return (
    <div>
      {/* Header */}
      <section className="bg-kas-sand py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="section-heading">{t('collection.title')}</h1>
          <p className="section-subheading">
            {t('collection.subtitle')}
          </p>
        </div>
      </section>

      {/* Filters Bar */}
      <section className="border-b border-kas-sand sticky top-20 bg-kas-cream z-40">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between py-4">
            {/* Desktop: Category filters */}
            <div className="hidden md:flex items-center gap-1">
              {categoryFilters.map((f) => (
                <button
                  key={f.value}
                  onClick={() => updateParams('filter', f.value)}
                  className={`px-4 py-2 text-sm tracking-wider uppercase transition-colors rounded-full ${
                    filter === f.value
                      ? 'bg-kas-charcoal text-white'
                      : 'text-kas-slate hover:text-kas-charcoal hover:bg-kas-sand/50'
                  }`}
                >
                  {f.label}
                </button>
              ))}
            </div>

            {/* Mobile: Filter button */}
            <button
              onClick={() => setMobileFiltersOpen(true)}
              className="md:hidden flex items-center gap-2 px-4 py-2 text-sm text-kas-charcoal border border-kas-sand rounded-full hover:border-kas-charcoal transition-colors"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
              </svg>
              {t('collection.filters')}
              {activeFilterCount > 0 && (
                <span className="w-5 h-5 flex items-center justify-center text-xs bg-kas-gold text-kas-charcoal rounded-full">
                  {activeFilterCount}
                </span>
              )}
            </button>

            {/* Sort dropdown */}
            <div className="relative">
              <select
                value={sort}
                onChange={(e) => updateParams('sort', e.target.value)}
                className="appearance-none bg-transparent pl-4 pr-8 py-2 text-sm text-kas-charcoal border border-kas-sand rounded-full hover:border-kas-charcoal transition-colors cursor-pointer focus:outline-none focus:border-kas-gold"
              >
                {sortOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
              <svg className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-kas-slate pointer-events-none" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>
        </div>
      </section>

      {/* Mobile Filter Drawer */}
      {mobileFiltersOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/30 z-50 md:hidden"
            onClick={() => setMobileFiltersOpen(false)}
            aria-hidden="true"
          />
          {/* Drawer */}
          <div className="fixed inset-y-0 left-0 w-80 max-w-full bg-white z-50 md:hidden shadow-xl animate-fade-in">
            <div className="flex flex-col h-full">
              {/* Header */}
              <div className="flex items-center justify-between px-6 py-4 border-b border-kas-sand">
                <h2 className="font-serif text-lg text-kas-charcoal">{t('collection.filters')}</h2>
                <button
                  onClick={() => setMobileFiltersOpen(false)}
                  className="p-2 text-kas-slate hover:text-kas-charcoal"
                  aria-label="Close filters"
                >
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {/* Filter options */}
              <div className="flex-1 overflow-y-auto px-6 py-6">
                <div className="mb-8">
                  <h3 className="text-sm font-medium text-kas-charcoal uppercase tracking-wider mb-4">{t('collection.category')}</h3>
                  <div className="space-y-2">
                    {categoryFilters.map((f) => (
                      <button
                        key={f.value}
                        onClick={() => {
                          updateParams('filter', f.value)
                        }}
                        className={`w-full text-left px-4 py-3 rounded-lg transition-colors ${
                          filter === f.value
                            ? 'bg-kas-charcoal text-white'
                            : 'text-kas-slate hover:bg-kas-sand/50'
                        }`}
                      >
                        {f.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-sm font-medium text-kas-charcoal uppercase tracking-wider mb-4">{t('collection.sortBy')}</h3>
                  <div className="space-y-2">
                    {sortOptions.map((option) => (
                      <button
                        key={option.value}
                        onClick={() => {
                          updateParams('sort', option.value)
                        }}
                        className={`w-full text-left px-4 py-3 rounded-lg transition-colors ${
                          sort === option.value
                            ? 'bg-kas-charcoal text-white'
                            : 'text-kas-slate hover:bg-kas-sand/50'
                        }`}
                      >
                        {option.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Footer */}
              <div className="px-6 py-4 border-t border-kas-sand">
                <button
                  onClick={() => setMobileFiltersOpen(false)}
                  className="btn-primary w-full"
                >
                  {t('collection.viewProducts', { count: filteredAndSortedProducts.length })}
                </button>
              </div>
            </div>
          </div>
        </>
      )}

      {/* Results count */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-6">
        <p className="text-sm text-kas-slate">
          {filteredAndSortedProducts.length} {filteredAndSortedProducts.length === 1 ? t('collection.product') : t('collection.products')}
          {filter !== 'all' && ` ${t('collection.in')} ${categoryFilters.find(f => f.value === filter)?.label}`}
        </p>
      </div>

      {/* Products Grid */}
      <section className="py-8">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {isLoading ? (
            <ProductGridSkeleton count={6} />
          ) : filteredAndSortedProducts.length === 0 ? (
            <div className="text-center py-16">
              <svg className="w-16 h-16 mx-auto text-kas-slate/30 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <p className="text-kas-slate mb-4">{t('collection.noProducts')}</p>
              <button
                onClick={() => setSearchParams(new URLSearchParams())}
                className="text-kas-gold hover:text-kas-copper underline"
              >
                {t('collection.clearFilters')}
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredAndSortedProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Samples Reminder */}
      <section className="py-12 bg-kas-sand/50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-3 bg-white rounded-full px-6 py-3 shadow-sm">
            <span className="text-xl">🎁</span>
            <p className="text-kas-charcoal" dangerouslySetInnerHTML={{ __html: t('collection.samplesReminder') }} />
          </div>
        </div>
      </section>
    </div>
  )
}
