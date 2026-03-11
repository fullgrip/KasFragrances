import { Link } from 'react-router-dom'
import { useCartStore } from '../../store/cart'
import type { CartItem as CartItemType } from '../../types'

// Format size strings: "50ml" -> "50 ml"
const formatSize = (title: string) =>
  title.replace(/(\d+)(ml)/gi, '$1 $2')

interface CartItemProps {
  item: CartItemType
}

export function CartItem({ item }: CartItemProps) {
  const { updateItem, removeItem, closeCart } = useCartStore()
  const variant = item.product.variants.find(v => v.id === item.variantId)
  const price = variant
    ? parseFloat(variant.price.amount)
    : parseFloat(item.product.priceRange.minVariantPrice.amount)
  const image = item.product.images[0]

  return (
    <div className="flex gap-4 py-4 border-b border-kas-sand last:border-0">
      {/* Image */}
      <Link
        to={`/products/${item.product.handle}`}
        onClick={closeCart}
        className="w-20 h-20 flex-shrink-0 bg-kas-sand rounded-lg overflow-hidden"
      >
        {image ? (
          <img
            src={image.url}
            alt={image.altText || item.product.title}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-kas-slate">
            <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
        )}
      </Link>

      {/* Details */}
      <div className="flex-1 min-w-0">
        <Link
          to={`/products/${item.product.handle}`}
          onClick={closeCart}
          className="font-serif text-kas-charcoal hover:text-kas-gold transition-colors block truncate"
        >
          {item.product.title}
        </Link>
        {variant && (
          <p className="text-xs text-kas-slate">{formatSize(variant.title)}</p>
        )}
        <p className="text-base text-kas-charcoal mt-0.5">€{price.toFixed(2)}</p>

        {/* Quantity controls */}
        <div className="flex items-center gap-3 mt-2">
          <div className="flex items-center border border-kas-sand rounded">
            <button
              onClick={() => updateItem(item.id, item.quantity - 1)}
              className="w-8 h-8 flex items-center justify-center text-kas-slate hover:text-kas-charcoal transition-colors"
              aria-label="Decrease quantity"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
              </svg>
            </button>
            <span className="w-8 text-center text-sm">{item.quantity}</span>
            <button
              onClick={() => updateItem(item.id, item.quantity + 1)}
              className="w-8 h-8 flex items-center justify-center text-kas-slate hover:text-kas-charcoal transition-colors"
              aria-label="Increase quantity"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
            </button>
          </div>

          <button
            onClick={() => removeItem(item.id)}
            className="text-kas-slate hover:text-red-500 transition-colors"
            aria-label="Remove item"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
          </button>
        </div>
      </div>

      {/* Line total */}
      <div className="text-right">
        <span className="font-serif text-xl font-medium text-kas-charcoal">
          €{(price * item.quantity).toFixed(2)}
        </span>
      </div>
    </div>
  )
}
