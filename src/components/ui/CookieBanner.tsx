import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

const COOKIE_CONSENT_KEY = 'kas-cookie-consent'

export function CookieBanner() {
  const { t } = useTranslation()
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const consent = localStorage.getItem(COOKIE_CONSENT_KEY)
    if (!consent) {
      setIsVisible(true)
    }
  }, [])

  const handleAccept = () => {
    localStorage.setItem(COOKIE_CONSENT_KEY, 'accepted')
    setIsVisible(false)
  }

  if (!isVisible) return null

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-4 bg-kas-charcoal text-white shadow-lg">
      <div className="mx-auto max-w-7xl flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-sm text-gray-300 text-center sm:text-left">
          {t('cookies.message')}{' '}
          <Link to="/privacy" className="text-kas-gold hover:text-kas-copper underline transition-colors">
            {t('cookies.learnMore')}
          </Link>
        </p>
        <button
          onClick={handleAccept}
          className="px-6 py-2 bg-kas-gold text-kas-charcoal font-medium rounded hover:bg-kas-copper transition-colors whitespace-nowrap"
        >
          {t('cookies.accept')}
        </button>
      </div>
    </div>
  )
}
