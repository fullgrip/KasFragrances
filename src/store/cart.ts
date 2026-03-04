import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { Cart } from '../types'
import type { Product } from '../types'
import * as shopify from '../lib/shopify'
import type { ShopifyLanguage } from '../lib/shopify'

interface CartState {
  cart: Cart | null
  isOpen: boolean
  isLoading: boolean
  error: string | null
  language: ShopifyLanguage

  // Actions
  openCart: () => void
  closeCart: () => void
  toggleCart: () => void
  setLanguage: (language: ShopifyLanguage) => void

  initCart: () => Promise<void>
  addItem: (product: Product, variantId: string, quantity?: number) => Promise<void>
  updateItem: (lineId: string, quantity: number) => Promise<void>
  removeItem: (lineId: string) => Promise<void>

  checkout: () => void
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      cart: null,
      isOpen: false,
      isLoading: false,
      error: null,
      language: 'EN',

      openCart: () => set({ isOpen: true }),
      closeCart: () => set({ isOpen: false }),
      toggleCart: () => set((state) => ({ isOpen: !state.isOpen })),
      setLanguage: (language) => set({ language }),

      initCart: async () => {
        const { cart, language } = get()

        set({ isLoading: true, error: null })

        try {
          // If we have a persisted cart, validate it still exists on Shopify
          if (cart?.id) {
            const existingCart = await shopify.getCart(cart.id, language)
            if (existingCart) {
              set({ cart: existingCart, isLoading: false })
              return
            }
            // Cart expired or invalid, will create new one below
          }

          // No cart or invalid cart, create new one
          const newCart = await shopify.createCart()
          set({ cart: newCart, isLoading: false })
        } catch (error) {
          set({ error: 'Failed to initialize cart', isLoading: false })
          console.error('Cart init error:', error)
        }
      },

      addItem: async (_product, variantId, quantity = 1) => {
        const { cart } = get()

        set({ isLoading: true, error: null })

        try {
          let cartId = cart?.id

          // Create cart if it doesn't exist
          if (!cartId) {
            const newCart = await shopify.createCart()
            cartId = newCart.id
          }

          const updatedCart = await shopify.addToCart(cartId, variantId, quantity)
          set({ cart: updatedCart, isLoading: false, isOpen: true })
        } catch (error) {
          set({ error: 'Failed to add item to cart', isLoading: false })
          console.error('Add to cart error:', error)
        }
      },

      updateItem: async (lineId, quantity) => {
        const { cart } = get()
        if (!cart) return

        set({ isLoading: true, error: null })

        try {
          if (quantity === 0) {
            await get().removeItem(lineId)
            return
          }

          const updatedCart = await shopify.updateCartItem(cart.id, lineId, quantity)
          set({ cart: updatedCart, isLoading: false })
        } catch (error) {
          set({ error: 'Failed to update cart', isLoading: false })
          console.error('Update cart error:', error)
        }
      },

      removeItem: async (lineId) => {
        const { cart } = get()
        if (!cart) return

        set({ isLoading: true, error: null })

        try {
          const updatedCart = await shopify.removeFromCart(cart.id, [lineId])
          set({ cart: updatedCart, isLoading: false })
        } catch (error) {
          set({ error: 'Failed to remove item', isLoading: false })
          console.error('Remove from cart error:', error)
        }
      },

      checkout: () => {
        const { cart } = get()
        if (cart?.checkoutUrl) {
          window.location.href = cart.checkoutUrl
        }
      },
    }),
    {
      name: 'kas-cart',
      partialize: (state) => ({ cart: state.cart }),
    }
  )
)
