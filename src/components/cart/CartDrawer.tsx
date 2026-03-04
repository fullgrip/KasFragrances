import { useTranslation } from 'react-i18next'
import { useCartStore } from '../../store/cart'
import { CartItem } from './CartItem'

export function CartDrawer() {
  const { cart, isOpen, closeCart, isLoading, checkout } = useCartStore()
  const { t } = useTranslation()

  if (!isOpen) return null

  const subtotal = cart?.subtotal
    ? parseFloat(cart.subtotal.amount).toFixed(2)
    : '0.00'

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 z-50 transition-opacity"
        onClick={closeCart}
        aria-hidden="true"
      />

      {/* Drawer */}
      <div className="fixed inset-y-0 right-0 z-50 w-full max-w-md bg-kas-cream shadow-xl animate-fade-in">
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-kas-sand">
            <h2 className="font-serif text-xl text-kas-charcoal">{t('cart.title')}</h2>
            <button
              onClick={closeCart}
              className="p-2 text-kas-slate hover:text-kas-charcoal transition-colors"
              aria-label={t('cart.close')}
            >
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Cart Items */}
          <div className="flex-1 overflow-y-auto px-6 py-4">
            {isLoading && (
              <div className="flex items-center justify-center py-8">
                <div className="w-8 h-8 border-2 border-kas-gold border-t-transparent rounded-full animate-spin" />
              </div>
            )}

            {!isLoading && (!cart || cart.items.length === 0) && (
              <div className="text-center py-12">
                <svg
                  className="w-16 h-16 mx-auto text-kas-sand mb-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1}
                    d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                  />
                </svg>
                <p className="text-kas-slate font-light">{t('cart.empty')}</p>
                <button
                  onClick={closeCart}
                  className="mt-4 text-kas-gold hover:text-kas-copper link-underline"
                >
                  {t('cart.continueShopping')}
                </button>
              </div>
            )}

            {!isLoading && cart && cart.items.length > 0 && (
              <div className="space-y-4">
                {cart.items.map((item) => (
                  <CartItem key={item.id} item={item} />
                ))}
              </div>
            )}
          </div>

          {/* Footer */}
          {cart && cart.items.length > 0 && (
            <div className="border-t border-kas-sand px-6 py-4 space-y-4">
              {/* Samples reminder */}
              <div className="bg-kas-sand/50 rounded-lg p-3 flex items-start gap-3">
                <span className="text-lg">🎁</span>
                <p className="text-sm text-kas-slate">
                  {t('cart.samplesIncluded')}
                </p>
              </div>

              {/* Subtotal */}
              <div className="flex items-center justify-between">
                <span className="text-kas-slate">{t('cart.subtotal')}</span>
                <span className="font-serif text-xl text-kas-charcoal">€{subtotal}</span>
              </div>

              {/* Free shipping progress */}
              {parseFloat(cart.subtotal.amount) < 150 && (
                <div className="text-sm text-kas-slate">
                  <div className="flex justify-between mb-1">
                    <span>{t('cart.freeShippingProgress')}</span>
                    <span>€{(150 - parseFloat(cart.subtotal.amount)).toFixed(2)} {t('cart.away')}</span>
                  </div>
                  <div className="h-1.5 bg-kas-sand rounded-full overflow-hidden">
                    <div
                      className="h-full bg-kas-gold transition-all duration-300"
                      style={{ width: `${Math.min(100, (parseFloat(cart.subtotal.amount) / 150) * 100)}%` }}
                    />
                  </div>
                </div>
              )}

              {/* Checkout button */}
              <button
                onClick={checkout}
                disabled={isLoading}
                className="btn-primary w-full disabled:opacity-50"
              >
                {isLoading ? t('cart.processing') : t('cart.checkout')}
              </button>

              <p className="text-xs text-center text-kas-slate">
                {t('cart.shippingAtCheckout')}
              </p>
            </div>
          )}
        </div>
      </div>
    </>
  )
}
