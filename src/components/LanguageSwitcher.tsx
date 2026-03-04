import { useTranslation } from 'react-i18next'

export function LanguageSwitcher() {
  const { i18n } = useTranslation()
  const currentLang = i18n.language?.split('-')[0] || 'en'

  const toggleLanguage = () => {
    const newLang = currentLang === 'en' ? 'pt' : 'en'
    i18n.changeLanguage(newLang)
  }

  return (
    <button
      onClick={toggleLanguage}
      className="flex items-center gap-1.5 px-2 py-1 text-sm text-kas-slate hover:text-kas-charcoal transition-colors"
      aria-label={`Switch to ${currentLang === 'en' ? 'Portuguese' : 'English'}`}
    >
      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
      </svg>
      <span className="uppercase font-medium tracking-wider">{currentLang}</span>
    </button>
  )
}
