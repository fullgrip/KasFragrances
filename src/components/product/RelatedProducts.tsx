import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { ProductCard } from './ProductCard'
import type { Product } from '../../types'
import { getProducts, mapLanguageCode } from '../../lib/shopify'
import { FEATURES } from '../../config/features'

interface RelatedProductsProps {
  currentProductHandle: string
  maxProducts?: number
}

export function RelatedProducts({ currentProductHandle, maxProducts = 4 }: RelatedProductsProps) {
  const { t, i18n } = useTranslation()
  const [products, setProducts] = useState<Product[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    async function fetchProducts() {
      try {
        const language = mapLanguageCode(i18n.language)
        const allProducts = await getProducts(language)
        // Filter out current product and discovery set (unless enabled)
        // Sort by priority: perfumes first, then discovery set, then body products
        const filtered = allProducts
          .filter(p => p.handle !== currentProductHandle)
          .filter(p => p.handle !== 'discovery-set' || FEATURES.DISCOVERY_SET_ENABLED)
          .sort((a, b) => {
            const getPriority = (p: Product) => {
              if (p.productType === 'Eau de Parfum') return 0
              if (p.handle === 'discovery-set') return 1
              return 2
            }
            return getPriority(a) - getPriority(b)
          })
          .slice(0, maxProducts)
        setProducts(filtered)
      } catch (error) {
        console.error('Failed to fetch related products:', error)
      } finally {
        setIsLoading(false)
      }
    }
    fetchProducts()
  }, [currentProductHandle, i18n.language, maxProducts])

  if (isLoading || products.length === 0) return null

  return (
    <section className="border-t border-kas-sand pt-16 mt-16">
      <h2 className="font-serif text-2xl md:text-3xl text-kas-charcoal text-center mb-8">
        {t('product.youMayAlsoLike')}
      </h2>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        {products.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  )
}
