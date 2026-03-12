import { useTranslation } from 'react-i18next'

export function TermsAndConditionsPage() {
  const { t } = useTranslation()

  return (
    <div className="py-20">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <h1 className="section-heading text-center">{t('terms.title')}</h1>
        <p className="text-center text-kas-slate mb-12">{t('terms.lastUpdated')}</p>

        <div className="space-y-8 text-kas-slate font-light">
          {/* Introduction */}
          <section>
            <h2 className="font-serif text-2xl text-kas-charcoal mb-4">{t('terms.introTitle')}</h2>
            <p>{t('terms.introText')}</p>
          </section>

          {/* Business Information */}
          <section>
            <h2 className="font-serif text-2xl text-kas-charcoal mb-4">{t('terms.businessTitle')}</h2>
            <p>{t('terms.businessText')}</p>
            <ul className="mt-4 space-y-2">
              <li><strong className="text-kas-charcoal">{t('terms.name')}:</strong> Kim Steenkamp</li>
              <li><strong className="text-kas-charcoal">{t('terms.address')}:</strong> Oasis Parque, Rua Dos Medronheiros, 116, Portimão, Portugal 8500-286</li>
              <li><strong className="text-kas-charcoal">{t('terms.email')}:</strong> <a href="mailto:fragrancesbykas@gmail.com" className="text-kas-gold hover:text-kas-copper transition-colors">fragrancesbykas@gmail.com</a></li>
            </ul>
          </section>

          {/* Orders & Payments */}
          <section>
            <h2 className="font-serif text-2xl text-kas-charcoal mb-4">{t('terms.ordersTitle')}</h2>
            <p>{t('terms.ordersText')}</p>
            <ul className="mt-4 list-disc list-inside space-y-2">
              <li>{t('terms.ordersItem1')}</li>
              <li>{t('terms.ordersItem2')}</li>
              <li>{t('terms.ordersItem3')}</li>
              <li>{t('terms.ordersItem4')}</li>
            </ul>
          </section>

          {/* Shipping & Delivery */}
          <section>
            <h2 className="font-serif text-2xl text-kas-charcoal mb-4">{t('terms.shippingTitle')}</h2>
            <p>{t('terms.shippingText')}</p>
            <ul className="mt-4 list-disc list-inside space-y-2">
              <li>{t('terms.shippingItem1')}</li>
              <li>{t('terms.shippingItem2')}</li>
              <li>{t('terms.shippingItem3')}</li>
            </ul>
          </section>

          {/* Returns & Refunds */}
          <section>
            <h2 className="font-serif text-2xl text-kas-charcoal mb-4">{t('terms.returnsTitle')}</h2>
            <p>{t('terms.returnsText')}</p>
            <ul className="mt-4 list-disc list-inside space-y-2">
              <li>{t('terms.returnsItem1')}</li>
              <li>{t('terms.returnsItem2')}</li>
              <li>{t('terms.returnsItem3')}</li>
              <li>{t('terms.returnsItem4')}</li>
            </ul>
            <p className="mt-4">{t('terms.returnsContact')}</p>
          </section>

          {/* Intellectual Property */}
          <section>
            <h2 className="font-serif text-2xl text-kas-charcoal mb-4">{t('terms.intellectualTitle')}</h2>
            <p>{t('terms.intellectualText')}</p>
          </section>

          {/* Limitation of Liability */}
          <section>
            <h2 className="font-serif text-2xl text-kas-charcoal mb-4">{t('terms.liabilityTitle')}</h2>
            <p>{t('terms.liabilityText')}</p>
          </section>

          {/* Governing Law */}
          <section>
            <h2 className="font-serif text-2xl text-kas-charcoal mb-4">{t('terms.governingTitle')}</h2>
            <p>{t('terms.governingText')}</p>
          </section>

          {/* Changes to Terms */}
          <section>
            <h2 className="font-serif text-2xl text-kas-charcoal mb-4">{t('terms.changesTitle')}</h2>
            <p>{t('terms.changesText')}</p>
          </section>

          {/* Contact */}
          <section>
            <h2 className="font-serif text-2xl text-kas-charcoal mb-4">{t('terms.contactTitle')}</h2>
            <p>
              {t('terms.contactText')}{' '}
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
