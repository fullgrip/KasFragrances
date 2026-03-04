import { useState, useRef } from 'react'
import type { ProductImage } from '../../types'

interface ImageGalleryProps {
  images: ProductImage[]
  productTitle: string
}

export function ImageGallery({ images, productTitle }: ImageGalleryProps) {
  const [selectedIndex, setSelectedIndex] = useState(0)
  const touchStartX = useRef<number | null>(null)

  const currentImage = images[selectedIndex]
  const hasMultipleImages = images.length > 1

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX
  }

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null || !hasMultipleImages) return

    const touchEndX = e.changedTouches[0].clientX
    const diff = touchStartX.current - touchEndX

    // Swipe threshold of 50px
    if (Math.abs(diff) > 50) {
      if (diff > 0 && selectedIndex < images.length - 1) {
        // Swipe left - next image
        setSelectedIndex(selectedIndex + 1)
      } else if (diff < 0 && selectedIndex > 0) {
        // Swipe right - previous image
        setSelectedIndex(selectedIndex - 1)
      }
    }

    touchStartX.current = null
  }

  const goToNext = () => {
    if (selectedIndex < images.length - 1) {
      setSelectedIndex(selectedIndex + 1)
    }
  }

  const goToPrevious = () => {
    if (selectedIndex > 0) {
      setSelectedIndex(selectedIndex - 1)
    }
  }

  // Empty state - no images
  if (images.length === 0) {
    return (
      <div className="aspect-square bg-kas-sand rounded-2xl overflow-hidden">
        <div className="w-full h-full flex items-center justify-center text-kas-slate">
          <div className="text-center">
            <svg className="w-24 h-24 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <p>Product Image</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {/* Main Image Container */}
      <div
        className="relative aspect-square bg-kas-sand rounded-2xl overflow-hidden"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        {/* Main Image */}
        <img
          src={currentImage.url}
          alt={currentImage.altText || `${productTitle} - Image ${selectedIndex + 1}`}
          className="w-full h-full object-cover"
          draggable={false}
        />

        {/* Navigation Arrows (only if multiple images) */}
        {hasMultipleImages && (
          <>
            <button
              onClick={goToPrevious}
              disabled={selectedIndex === 0}
              className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center text-kas-charcoal hover:bg-white transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
              aria-label="Previous image"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              onClick={goToNext}
              disabled={selectedIndex === images.length - 1}
              className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center text-kas-charcoal hover:bg-white transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
              aria-label="Next image"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </>
        )}

        {/* Mobile swipe indicator dots */}
        {hasMultipleImages && (
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 lg:hidden">
            {images.map((_, index) => (
              <button
                key={index}
                onClick={() => setSelectedIndex(index)}
                className={`w-2 h-2 rounded-full transition-colors ${
                  index === selectedIndex ? 'bg-kas-gold' : 'bg-white/60'
                }`}
                aria-label={`Go to image ${index + 1}`}
              />
            ))}
          </div>
        )}
      </div>

      {/* Thumbnail Strip (desktop only, hidden on mobile) */}
      {hasMultipleImages && (
        <div className="hidden sm:grid grid-cols-4 gap-3">
          {images.slice(0, 4).map((image, index) => (
            <button
              key={image.id || index}
              onClick={() => setSelectedIndex(index)}
              className={`aspect-square bg-kas-sand rounded-lg overflow-hidden border-2 transition-all ${
                index === selectedIndex
                  ? 'border-kas-gold ring-2 ring-kas-gold/20'
                  : 'border-transparent hover:border-kas-gold/50'
              }`}
              aria-label={`View image ${index + 1}`}
              aria-current={index === selectedIndex ? 'true' : 'false'}
            >
              <img
                src={image.url}
                alt={image.altText || `${productTitle} thumbnail ${index + 1}`}
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </button>
          ))}
          {images.length > 4 && (
            <button
              onClick={() => setSelectedIndex(4)}
              className="aspect-square bg-kas-sand rounded-lg overflow-hidden border-2 border-transparent hover:border-kas-gold/50 relative"
              aria-label={`View ${images.length - 4} more images`}
            >
              <img
                src={images[4].url}
                alt={images[4].altText || `${productTitle} thumbnail 5`}
                className="w-full h-full object-cover opacity-50"
                loading="lazy"
              />
              <div className="absolute inset-0 flex items-center justify-center bg-kas-charcoal/40">
                <span className="text-white font-medium">+{images.length - 4}</span>
              </div>
            </button>
          )}
        </div>
      )}
    </div>
  )
}
