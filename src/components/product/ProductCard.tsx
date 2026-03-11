import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import type { Product } from '../../types'
import { Badge } from '../ui'

interface ProductCardProps {
  product: Product
}

export function ProductCard({ product }: ProductCardProps) {
  const price = parseFloat(product.priceRange.minVariantPrice.amount)
  const image = product.images[0]
  const secondImage = product.images[1]
  const hasSecondImage = !!secondImage

  // Get badge type from product tags
  const getBadgeType = (): 'bestseller' | 'new' | 'staff-pick' | null => {
    const tags = product.tags.map(t => t.toLowerCase())
    if (tags.includes('bestseller')) return 'bestseller'
    if (tags.includes('new')) return 'new'
    if (tags.includes('staff-pick')) return 'staff-pick'
    return null
  }

  // Get scent info with fallbacks (prioritize short tags)
  const getScentInfo = (): string | null => {
    if (product.scentTags?.length) return product.scentTags.join(' · ')
    if (product.scentProfile?.fragranceFamily) return product.scentProfile.fragranceFamily
    if (product.scentNotes?.top?.length) return product.scentNotes.top.slice(0, 3).join(' · ')
    return null
  }

  const badgeType = getBadgeType()
  const scentInfo = getScentInfo()

  // Hover state for desktop
  const [isHovered, setIsHovered] = useState(false)
  // Auto-cycle state for mobile
  const [showAltImage, setShowAltImage] = useState(false)

  // Detect touch device
  const isTouchDevice = typeof window !== 'undefined' && 'ontouchstart' in window

  // Mobile auto-cycle every 3.5 seconds
  useEffect(() => {
    if (!isTouchDevice || !hasSecondImage) return

    const interval = setInterval(() => {
      setShowAltImage(prev => !prev)
    }, 3500)

    return () => clearInterval(interval)
  }, [isTouchDevice, hasSecondImage])

  // Determine which image to show as alternate
  const showAlternate = hasSecondImage && (isTouchDevice ? showAltImage : isHovered)

  return (
    <Link
      to={`/products/${product.handle}`}
      className="group block card-hover"
    >
      {/* Image */}
      <div
        className="aspect-[3/4] bg-kas-sand rounded-lg overflow-hidden mb-4 relative"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Badge */}
        {badgeType && (
          <div className="absolute top-2 left-2 md:top-3 md:left-3 z-10">
            <Badge type={badgeType} />
          </div>
        )}
        {image ? (
          <>
            {/* Primary image */}
            <img
              src={image.url}
              alt={image.altText || product.title}
              className={`w-full h-full object-cover transition-opacity duration-500 ${
                showAlternate ? 'opacity-0' : 'opacity-100'
              }`}
            />
            {/* Secondary image (cross-fade) */}
            {hasSecondImage && (
              <img
                src={secondImage.url}
                alt={secondImage.altText || `${product.title} - alternate view`}
                className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${
                  showAlternate ? 'opacity-100' : 'opacity-0'
                }`}
              />
            )}
          </>
        ) : (
          <div className="w-full h-full flex items-center justify-center text-kas-slate">
            <svg className="w-16 h-16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
        )}
      </div>

      {/* Details */}
      <div className="text-center">
        <h3 className="font-serif text-lg text-kas-charcoal group-hover:text-kas-gold transition-colors">
          {product.title}
        </h3>
        {scentInfo && (
          <p className="text-sm text-kas-slate mt-1 truncate">
            {scentInfo}
          </p>
        )}
        <p className="mt-2 font-sans text-kas-charcoal">
          €{price.toFixed(2)}
        </p>
        {product.valueAnchor && (
          <p className="text-xs text-kas-gold mt-1">
            {product.valueAnchor.split('—')[0]}
          </p>
        )}
      </div>
    </Link>
  )
}
