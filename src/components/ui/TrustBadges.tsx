import { useTranslation } from 'react-i18next'

interface TrustBadgesProps {
  variant?: 'horizontal' | 'vertical' | 'compact'
  className?: string
}

export function TrustBadges({ variant = 'horizontal', className = '' }: TrustBadgesProps) {
  const { t } = useTranslation()

  const badges = [
    {
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
        </svg>
      ),
      title: t('trust.secureCheckout'),
      description: t('trust.secureCheckoutDesc'),
    },
    {
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
        </svg>
      ),
      title: t('trust.returns'),
      description: t('trust.returnsDesc'),
    },
    {
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      ),
      title: t('trust.authentic'),
      description: t('trust.authenticDesc'),
    },
    {
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
        </svg>
      ),
      title: t('trust.freeShipping'),
      description: t('trust.freeShippingDesc'),
    },
  ]
  if (variant === 'compact') {
    return (
      <div className={`flex flex-wrap items-center justify-center gap-4 text-kas-slate ${className}`}>
        {badges.slice(0, 3).map((badge, index) => (
          <div key={index} className="flex items-center gap-1.5 text-xs">
            <span className="text-kas-gold">{badge.icon}</span>
            <span>{badge.title}</span>
          </div>
        ))}
      </div>
    )
  }

  if (variant === 'vertical') {
    return (
      <div className={`space-y-4 ${className}`}>
        {badges.map((badge, index) => (
          <div key={index} className="flex items-start gap-3">
            <div className="flex-shrink-0 w-10 h-10 rounded-full bg-kas-gold/10 flex items-center justify-center text-kas-gold">
              {badge.icon}
            </div>
            <div>
              <p className="font-medium text-kas-charcoal">{badge.title}</p>
              <p className="text-sm text-kas-slate">{badge.description}</p>
            </div>
          </div>
        ))}
      </div>
    )
  }

  // Default: horizontal
  return (
    <div className={`grid grid-cols-2 lg:grid-cols-4 gap-4 ${className}`}>
      {badges.map((badge, index) => (
        <div
          key={index}
          className="flex flex-col items-center text-center p-4 rounded-xl bg-kas-sand/30 hover:bg-kas-sand/50 transition-colors"
        >
          <div className="w-12 h-12 rounded-full bg-kas-gold/10 flex items-center justify-center text-kas-gold mb-3">
            {badge.icon}
          </div>
          <p className="font-medium text-kas-charcoal text-sm">{badge.title}</p>
          <p className="text-xs text-kas-slate mt-1">{badge.description}</p>
        </div>
      ))}
    </div>
  )
}
