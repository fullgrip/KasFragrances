import { useEffect, useState } from 'react'
import { useSearchParams, Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { ProductCard } from '../components/product'
import { searchProducts, mapLanguageCode } from '../lib/shopify'
import type { Product } from '../types'

export function SearchPage() {
  const [searchParams] = useSearchParams()
  const { i18n } = useTranslation()
  const query = searchParams.get('q') || ''
  const [products, setProducts] = useState<Product[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    async function fetchResults() {
      if (!query.trim()) {
        setProducts([])
        setIsLoading(false)
        return
      }

      setIsLoading(true)
      try {
        const language = mapLanguageCode(i18n.language)
        const results = await searchProducts(query, language)
        setProducts(results)
      } catch (error) {
        console.error('Search error:', error)
        setProducts([])
      } finally {
        setIsLoading(false)
      }
    }

    fetchResults()
  }, [query, i18n.language])

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
            <li className="text-kas-charcoal">Search</li>
          </ol>
        </nav>

        {/* Page Header */}
        <div className="mb-10">
          <h1 className="section-heading">
            {query ? `Search results for "${query}"` : 'Search'}
          </h1>
          {!isLoading && query && (
            <p className="text-kas-slate mt-2">
              {products.length} {products.length === 1 ? 'product' : 'products'} found
            </p>
          )}
        </div>

        {/* Loading state */}
        {isLoading && (
          <div className="flex justify-center items-center py-20">
            <div className="w-10 h-10 border-2 border-kas-gold border-t-transparent rounded-full animate-spin" />
          </div>
        )}

        {/* Empty query state */}
        {!isLoading && !query && (
          <div className="text-center py-16">
            <svg className="w-16 h-16 mx-auto text-kas-slate/30 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <h2 className="font-serif text-xl text-kas-charcoal mb-2">Start your search</h2>
            <p className="text-kas-slate">Enter a search term to find your perfect fragrance</p>
          </div>
        )}

        {/* No results state */}
        {!isLoading && query && products.length === 0 && (
          <div className="text-center py-16">
            <svg className="w-16 h-16 mx-auto text-kas-slate/30 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <h2 className="font-serif text-xl text-kas-charcoal mb-2">No products found</h2>
            <p className="text-kas-slate mb-6">We couldn't find any products matching "{query}"</p>
            <div className="space-x-4">
              <Link to="/collection" className="btn-primary inline-block">
                Browse Collection
              </Link>
            </div>
          </div>
        )}

        {/* Results grid */}
        {!isLoading && products.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}

        {/* Suggestions section */}
        {!isLoading && query && products.length === 0 && (
          <div className="mt-12 border-t border-kas-sand pt-12">
            <h3 className="font-serif text-lg text-kas-charcoal mb-4">Try searching for:</h3>
            <div className="flex flex-wrap gap-3">
              {['Perfumes', 'Diffusers', 'Body Care', 'Fresh', 'Floral'].map((term) => (
                <Link
                  key={term}
                  to={`/search?q=${encodeURIComponent(term)}`}
                  className="px-4 py-2 bg-kas-sand/50 text-kas-charcoal rounded-full hover:bg-kas-sand transition-colors"
                >
                  {term}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
