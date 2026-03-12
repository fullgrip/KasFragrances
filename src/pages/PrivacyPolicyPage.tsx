import { useTranslation } from 'react-i18next'

export function PrivacyPolicyPage() {
  const { t } = useTranslation()

  return (
    <div className="py-20">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <h1 className="section-heading text-center">{t('privacy.title')}</h1>
        <p className="text-center text-kas-slate mb-12">{t('privacy.lastUpdated')}</p>

        <div className="space-y-8 text-kas-slate font-light">
          {/* Data Controller */}
          <section>
            <h2 className="font-serif text-2xl text-kas-charcoal mb-4">{t('privacy.controllerTitle')}</h2>
            <p>{t('privacy.controllerText')}</p>
            <ul className="mt-4 space-y-2">
              <li><strong className="text-kas-charcoal">{t('privacy.name')}:</strong> Kim Steenkamp</li>
              <li><strong className="text-kas-charcoal">{t('privacy.address')}:</strong> Oasis Parque, Rua Dos Medronheiros, 116, Portimão, Portugal 8500-286</li>
              <li><strong className="text-kas-charcoal">{t('privacy.email')}:</strong> <a href="mailto:fragrancesbykas@gmail.com" className="text-kas-gold hover:text-kas-copper transition-colors">fragrancesbykas@gmail.com</a></li>
            </ul>
          </section>

          {/* Data We Collect */}
          <section>
            <h2 className="font-serif text-2xl text-kas-charcoal mb-4">{t('privacy.collectTitle')}</h2>
            <p>{t('privacy.collectText')}</p>
            <ul className="mt-4 list-disc list-inside space-y-2">
              <li>{t('privacy.collectItem1')}</li>
              <li>{t('privacy.collectItem2')}</li>
              <li>{t('privacy.collectItem3')}</li>
            </ul>
          </section>

          {/* How We Use Your Data */}
          <section>
            <h2 className="font-serif text-2xl text-kas-charcoal mb-4">{t('privacy.useTitle')}</h2>
            <p>{t('privacy.useText')}</p>
            <ul className="mt-4 list-disc list-inside space-y-2">
              <li>{t('privacy.useItem1')}</li>
              <li>{t('privacy.useItem2')}</li>
              <li>{t('privacy.useItem3')}</li>
            </ul>
          </section>

          {/* Third Parties */}
          <section>
            <h2 className="font-serif text-2xl text-kas-charcoal mb-4">{t('privacy.thirdPartyTitle')}</h2>
            <p>{t('privacy.thirdPartyText')}</p>
          </section>

          {/* Your Rights */}
          <section>
            <h2 className="font-serif text-2xl text-kas-charcoal mb-4">{t('privacy.rightsTitle')}</h2>
            <p>{t('privacy.rightsText')}</p>
            <ul className="mt-4 list-disc list-inside space-y-2">
              <li>{t('privacy.rightsItem1')}</li>
              <li>{t('privacy.rightsItem2')}</li>
              <li>{t('privacy.rightsItem3')}</li>
              <li>{t('privacy.rightsItem4')}</li>
            </ul>
            <p className="mt-4">{t('privacy.rightsContact')}</p>
          </section>

          {/* Cookies */}
          <section>
            <h2 className="font-serif text-2xl text-kas-charcoal mb-4">{t('privacy.cookiesTitle')}</h2>
            <p>{t('privacy.cookiesText')}</p>
          </section>

          {/* Contact */}
          <section>
            <h2 className="font-serif text-2xl text-kas-charcoal mb-4">{t('privacy.contactTitle')}</h2>
            <p>
              {t('privacy.contactText')}{' '}
              <a href="mailto:fragrancesbykas@gmail.com" className="text-kas-gold hover:text-kas-copper transition-colors">
                fragrancesbykas@gmail.com
              </a>
            </p>
          </section>
        </div>
      </div>
    </div>
  )
}
