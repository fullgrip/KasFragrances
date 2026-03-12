import { useState } from 'react'
import type { ProductDetails as ProductDetailsType } from '../../types'

interface ProductDetailsProps {
  details: ProductDetailsType
  selectedVariantTitle?: string
  isBodyCare?: boolean
}

export function ProductDetails({ details, selectedVariantTitle, isBodyCare = false }: ProductDetailsProps) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="border-t border-kas-sand">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between py-4 text-left"
      >
        <span className="font-serif text-lg text-kas-charcoal">Product Details</span>
        <svg
          className={`w-5 h-5 text-kas-slate transition-transform ${isOpen ? 'rotate-180' : ''}`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isOpen && (
        <div className="pb-4 animate-fade-in">
          <dl className="space-y-3 text-sm">
            <div className="flex justify-between">
              <dt className="text-kas-slate">Size</dt>
              <dd className="text-kas-charcoal">{selectedVariantTitle || details.size}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-kas-slate">Longevity</dt>
              <dd className="text-kas-charcoal">{details.longevity}</dd>
            </div>
{!isBodyCare && details.concentration && (
              <div className="flex justify-between">
                <dt className="text-kas-slate">Concentration</dt>
                <dd className="text-kas-charcoal">{details.concentration}</dd>
              </div>
            )}
            <div className="flex justify-between">
              <dt className="text-kas-slate">Origin</dt>
              <dd className="text-kas-charcoal">Handcrafted in Portugal</dd>
            </div>
            {(details.isVegan || details.isCrueltyFree) && (
              <div className="flex justify-between">
                <dt className="text-kas-slate">Ethics</dt>
                <dd className="text-kas-charcoal">
                  {[
                    details.isVegan && 'Vegan',
                    details.isCrueltyFree && 'Cruelty-free'
                  ].filter(Boolean).join(' · ')}
                </dd>
              </div>
            )}
          </dl>

          {details.ingredients && (
            <div className="mt-4 pt-4 border-t border-kas-sand">
              <h4 className="text-sm font-medium text-kas-charcoal mb-2">Ingredients (INCI)</h4>
              <p className="text-xs text-kas-slate leading-relaxed">{details.ingredients}</p>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
