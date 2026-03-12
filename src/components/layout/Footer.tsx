import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { FEATURES } from '../../config/features'
import { BrandingWidget } from '../ui/BrandingWidget'

export function Footer() {
  const { t } = useTranslation()

  return (
    <footer className="bg-kas-charcoal text-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="md:col-span-2">
            <Link to="/">
              <img
                src="/images/logo.svg"
                alt="KAS Fragrances"
                className="h-12 w-auto brightness-0 invert mb-4"
              />
            </Link>
            <p className="text-gray-400 font-light leading-relaxed max-w-sm">
              {t('footer.brandDescription')}
            </p>
          </div>

          {/* Quick Links */}
          <div className="text-center md:text-left">
            <h3 className="font-serif text-lg mb-4 text-kas-gold">{t('footer.explore')}</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/collection" className="text-gray-400 hover:text-white transition-colors font-light">
                  {t('nav.collection')}
                </Link>
              </li>
              {FEATURES.DISCOVERY_SET_ENABLED && (
                <li>
                  <Link to="/products/discovery-set" className="text-gray-400 hover:text-white transition-colors font-light">
                    {t('nav.discoverySet')}
                  </Link>
                </li>
              )}
              <li>
                <Link to="/about" className="text-gray-400 hover:text-white transition-colors font-light">
                  {t('nav.ourStory')}
                </Link>
              </li>
              <li>
                <a
                  href="https://www.instagram.com/kasfragrances/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-white transition-colors font-light inline-flex items-center gap-2"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  </svg>
                  Instagram
                </a>
              </li>
            </ul>
          </div>

          {/* Customer Care */}
          <div className="text-center md:text-left">
            <h3 className="font-serif text-lg mb-4 text-kas-gold">{t('footer.customerCare')}</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/shipping" className="text-gray-400 hover:text-white transition-colors font-light">
                  {t('footer.shippingReturns')}
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-400 hover:text-white transition-colors font-light">
                  {t('footer.contactUs')}
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Shipping Info Banner */}
        <div className="mt-12 pt-8 border-t border-gray-700">
          <div className="flex flex-wrap justify-center gap-6 md:gap-12 text-sm text-gray-400">
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-kas-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
              </svg>
              <span>{t('footer.freeShipping')}</span>
            </div>
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-kas-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7" />
              </svg>
              <span>{t('footer.freeSamples')}</span>
            </div>
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-kas-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
              <span>{t('footer.handcrafted')}</span>
            </div>
          </div>
        </div>

        {/* Legal Links & Copyright */}
        <div className="mt-8 pt-6 border-t border-gray-700 text-center">
          <div className="flex flex-wrap justify-center gap-4 md:gap-6 text-sm text-gray-500 mb-4">
            <Link to="/privacy" className="hover:text-gray-400 transition-colors">
              {t('footer.privacyPolicy')}
            </Link>
            <span className="text-gray-700">·</span>
            <Link to="/terms" className="hover:text-gray-400 transition-colors">
              {t('footer.termsAndConditions')}
            </Link>
            <span className="text-gray-700">·</span>
            <a
              href="https://www.livroreclamacoes.pt"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-gray-400 transition-colors"
            >
              {t('footer.complaintsBook')}
            </a>
          </div>
          <p className="text-sm text-gray-500 flex flex-wrap items-center justify-center gap-2">
            <span>{t('footer.copyright', { year: new Date().getFullYear() })}</span>
            <span className="text-gray-700">·</span>
            <BrandingWidget />
          </p>
        </div>
      </div>
    </footer>
  )
}
