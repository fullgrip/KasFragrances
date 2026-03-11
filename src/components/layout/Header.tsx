import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useCartStore } from '../../store/cart'
import { SearchBar } from './SearchBar'
import { LanguageSwitcher } from '../LanguageSwitcher'
import { FEATURES } from '../../config/features'

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const { toggleCart, cart } = useCartStore()
  const { t } = useTranslation()
  const cartCount = cart?.totalQuantity || 0

  const navigation = [
    { name: t('nav.collection'), href: '/collection' },
    ...(FEATURES.DISCOVERY_SET_ENABLED ? [{ name: t('nav.discoverySet'), href: '/products/discovery-set' }] : []),
    { name: t('nav.ourStory'), href: '/about' },
  ]

  return (
    <header className="bg-kas-cream sticky top-0 z-50 border-b border-kas-sand">
      <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-20 items-center justify-between">
          {/* Mobile menu button */}
          <button
            type="button"
            className="lg:hidden p-2 -ml-2 text-kas-charcoal"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={t('nav.openMenu')}
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              {mobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>

          {/* Logo */}
          <Link to="/" className="flex-shrink-0">
            <img
              src="/images/logo.svg"
              alt="KAS Fragrances"
              className="h-12 md:h-14 w-auto brightness-0"
            />
          </Link>

          {/* Desktop navigation */}
          <div className="hidden lg:flex lg:items-center lg:gap-x-10">
            {navigation.map((item) => (
              <NavLink
                key={item.name}
                to={item.href}
                className={({ isActive }) =>
                  `text-sm tracking-wider uppercase font-medium link-underline ${
                    isActive ? 'text-kas-gold' : 'text-kas-charcoal hover:text-kas-gold'
                  }`
                }
              >
                {item.name}
              </NavLink>
            ))}
          </div>

          {/* Language Switcher, Search & Cart */}
          <div className="flex items-center gap-1">
            <LanguageSwitcher />
            <SearchBar />
            <button
              onClick={toggleCart}
              className="relative p-2 text-kas-charcoal hover:text-kas-gold transition-colors"
              aria-label={t('nav.openCart')}
            >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
              />
            </svg>
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 w-5 h-5 flex items-center justify-center text-xs font-medium bg-kas-gold text-kas-charcoal rounded-full">
                {cartCount}
              </span>
            )}
            </button>
          </div>
        </div>

        {/* Mobile navigation */}
        {mobileMenuOpen && (
          <div className="lg:hidden py-4 border-t border-kas-sand animate-fade-in">
            <div className="flex flex-col space-y-4">
              {navigation.map((item) => (
                <NavLink
                  key={item.name}
                  to={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={({ isActive }) =>
                    `text-sm tracking-wider uppercase font-medium ${
                      isActive ? 'text-kas-gold' : 'text-kas-charcoal hover:text-kas-gold'
                    }`
                  }
                >
                  {item.name}
                </NavLink>
              ))}
            </div>
          </div>
        )}
      </nav>
    </header>
  )
}
