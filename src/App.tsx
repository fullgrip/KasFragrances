import { useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { Layout } from './components/layout'
import { ScrollToTop } from './components/ScrollToTop'
import { HomePage, CollectionPage, ProductPage, AboutPage, SearchPage, PrivacyPolicyPage, TermsAndConditionsPage } from './pages'
import { useCartStore } from './store/cart'
import { mapLanguageCode } from './lib/shopify'

function App() {
  const { i18n } = useTranslation()
  const setCartLanguage = useCartStore((state) => state.setLanguage)

  // Sync cart store language with i18n language
  useEffect(() => {
    setCartLanguage(mapLanguageCode(i18n.language))
  }, [i18n.language, setCartLanguage])

  return (
    <>
      <ScrollToTop />
      <Layout>
        <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/collection" element={<CollectionPage />} />
        <Route path="/products/:handle" element={<ProductPage />} />
        <Route path="/search" element={<SearchPage />} />
        <Route path="/about" element={<AboutPage />} />
        {/* Placeholder routes - can be expanded later */}
        <Route path="/shipping" element={<ShippingPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/privacy" element={<PrivacyPolicyPage />} />
        <Route path="/terms" element={<TermsAndConditionsPage />} />
        {/* 404 */}
        <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Layout>
    </>
  )
}

// Simple placeholder pages
function ShippingPage() {
  return (
    <div className="py-20">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <h1 className="section-heading text-center">Shipping & Returns</h1>
        <div className="mt-12 space-y-8">
          <div>
            <h2 className="font-serif text-2xl text-kas-charcoal mb-4">Shipping</h2>
            <div className="space-y-4 text-kas-slate font-light">
              <p><strong className="text-kas-charcoal">Portugal:</strong> Free shipping on orders over €150. Shipping calculated at checkout based on weight for orders under €150. Delivery in 3-7 business days.</p>
              <p><strong className="text-kas-charcoal">EU Countries:</strong> Shipping calculated at checkout based on weight. Delivery in 7-10 business days.</p>
            </div>
          </div>
          <div>
            <h2 className="font-serif text-2xl text-kas-charcoal mb-4">Returns</h2>
            <p className="text-kas-slate font-light">
              We want you to love your KAS fragrance. If for any reason you're not completely satisfied,
              you may return unopened products within 14 days for a full refund. Please contact us at{' '}
              <a href="mailto:fragrancesbykas@gmail.com" className="text-kas-gold hover:text-kas-copper transition-colors">fragrancesbykas@gmail.com</a> to initiate a return.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

function ContactPage() {
  return (
    <div className="py-20">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 text-center">
        <h1 className="section-heading">Contact Us</h1>
        <p className="section-subheading mb-12">
          We'd love to hear from you. Reach out with any questions about our fragrances.
        </p>
        <div className="bg-kas-sand/50 rounded-xl p-8">
          <p className="text-kas-slate font-light mb-6">
            For all inquiries, please email us at:
          </p>
          <a
            href="mailto:fragrancesbykas@gmail.com"
            className="font-serif text-xl text-kas-gold hover:text-kas-copper transition-colors"
          >
            fragrancesbykas@gmail.com
          </a>
          <p className="text-sm text-kas-slate mt-6">
            We typically respond within 24-48 hours.
          </p>
        </div>
      </div>
    </div>
  )
}

function NotFoundPage() {
  return (
    <div className="py-20 text-center">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <h1 className="font-serif text-6xl text-kas-gold mb-4">404</h1>
        <h2 className="section-heading">Page Not Found</h2>
        <p className="text-kas-slate mt-4 mb-8">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <a href="/" className="btn-primary">
          Return Home
        </a>
      </div>
    </div>
  )
}

export default App
