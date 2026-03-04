import { useState, useEffect, useRef } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import type { Product } from '../../types'
import { searchProducts } from '../../lib/shopify'

export function SearchBar() {
  const [isOpen, setIsOpen] = useState(false)
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<Product[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const navigate = useNavigate()

  // Debounced search
  useEffect(() => {
    if (query.length < 2) {
      setResults([])
      return
    }

    const timer = setTimeout(async () => {
      setIsLoading(true)
      try {
        const products = await searchProducts(query)
        setResults(products.slice(0, 5)) // Show max 5 in dropdown
      } catch (error) {
        console.error('Search error:', error)
        setResults([])
      } finally {
        setIsLoading(false)
      }
    }, 300)

    return () => clearTimeout(timer)
  }, [query])

  // Close on click outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  // Focus input when opened
  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus()
    }
  }, [isOpen])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (query.trim()) {
      navigate(`/search?q=${encodeURIComponent(query.trim())}`)
      setIsOpen(false)
      setQuery('')
    }
  }

  const handleResultClick = () => {
    setIsOpen(false)
    setQuery('')
  }

  return (
    <div ref={containerRef} className="relative">
      {/* Search toggle button (mobile & desktop) */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 text-kas-charcoal hover:text-kas-gold transition-colors"
        aria-label={isOpen ? 'Close search' : 'Open search'}
      >
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          {isOpen ? (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
          ) : (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          )}
        </svg>
      </button>

      {/* Search dropdown */}
      {isOpen && (
        <div className="absolute right-0 top-full mt-2 w-80 sm:w-96 bg-white rounded-xl shadow-lg border border-kas-sand overflow-hidden z-50 animate-fade-in">
          <form onSubmit={handleSubmit}>
            <div className="relative">
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search fragrances..."
                className="w-full px-4 py-3 pr-10 text-kas-charcoal placeholder:text-kas-slate/60 border-b border-kas-sand focus:outline-none focus:border-kas-gold"
              />
              {isLoading ? (
                <div className="absolute right-3 top-1/2 -translate-y-1/2">
                  <div className="w-5 h-5 border-2 border-kas-gold border-t-transparent rounded-full animate-spin" />
                </div>
              ) : (
                <button
                  type="submit"
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-kas-slate hover:text-kas-gold transition-colors"
                  aria-label="Search"
                >
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </button>
              )}
            </div>
          </form>

          {/* Results dropdown */}
          {query.length >= 2 && (
            <div className="max-h-80 overflow-y-auto">
              {results.length > 0 ? (
                <div className="py-2">
                  {results.map((product) => (
                    <Link
                      key={product.id}
                      to={`/products/${product.handle}`}
                      onClick={handleResultClick}
                      className="flex items-center gap-3 px-4 py-2 hover:bg-kas-sand/50 transition-colors"
                    >
                      {/* Product thumbnail */}
                      <div className="w-12 h-12 bg-kas-sand rounded-lg overflow-hidden flex-shrink-0">
                        {product.images[0] ? (
                          <img
                            src={product.images[0].url}
                            alt={product.title}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-kas-slate/40">
                            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                          </div>
                        )}
                      </div>
                      {/* Product info */}
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-kas-charcoal truncate">{product.title}</p>
                        <p className="text-sm text-kas-slate">
                          €{parseFloat(product.priceRange.minVariantPrice.amount).toFixed(2)}
                        </p>
                      </div>
                    </Link>
                  ))}
                  {/* View all results link */}
                  <Link
                    to={`/search?q=${encodeURIComponent(query)}`}
                    onClick={handleResultClick}
                    className="block px-4 py-3 text-center text-sm text-kas-gold hover:text-kas-copper font-medium border-t border-kas-sand"
                  >
                    View all results →
                  </Link>
                </div>
              ) : !isLoading ? (
                <div className="px-4 py-8 text-center text-kas-slate">
                  <p>No products found for "{query}"</p>
                  <p className="text-sm mt-1">Try a different search term</p>
                </div>
              ) : null}
            </div>
          )}

          {/* Quick links when empty */}
          {query.length < 2 && (
            <div className="px-4 py-3">
              <p className="text-xs text-kas-slate uppercase tracking-wider mb-2">Popular searches</p>
              <div className="flex flex-wrap gap-2">
                {['Fresh', 'Floral', 'Oriental', 'Unisex'].map((term) => (
                  <button
                    key={term}
                    onClick={() => setQuery(term)}
                    className="px-3 py-1 text-sm bg-kas-sand/50 text-kas-charcoal rounded-full hover:bg-kas-sand transition-colors"
                  >
                    {term}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
