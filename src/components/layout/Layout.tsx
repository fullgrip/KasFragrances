import { ReactNode, useEffect } from 'react'
import { AnnouncementBar } from './AnnouncementBar'
import { Header } from './Header'
import { Footer } from './Footer'
import { CartDrawer } from '../cart/CartDrawer'
import { CookieBanner } from '../ui/CookieBanner'
import { useCartStore } from '../../store/cart'

interface LayoutProps {
  children: ReactNode
}

export function Layout({ children }: LayoutProps) {
  const initCart = useCartStore((state) => state.initCart)

  useEffect(() => {
    initCart()
  }, [initCart])

  return (
    <div className="min-h-screen flex flex-col">
      <AnnouncementBar />
      <Header />
      <main className="flex-1">
        {children}
      </main>
      <Footer />
      <CartDrawer />
      <CookieBanner />
    </div>
  )
}
