import { useTranslation } from 'react-i18next'

type BadgeType = 'bestseller' | 'new' | 'staff-pick'

interface BadgeProps {
  type: BadgeType
  className?: string
}

const badgeConfig = {
  bestseller: {
    key: 'badges.bestseller',
    className: 'bg-kas-gold text-kas-charcoal',
  },
  new: {
    key: 'badges.new',
    className: 'bg-kas-sand text-kas-charcoal border border-kas-gold/30',
  },
  'staff-pick': {
    key: 'badges.staffPick',
    className: 'bg-kas-copper/90 text-white',
  },
}

export function Badge({ type, className = '' }: BadgeProps) {
  const { t } = useTranslation()
  const config = badgeConfig[type]

  return (
    <span
      className={`
        inline-block px-2 py-0.5 md:px-3 md:py-1
        text-[10px] md:text-xs font-sans font-medium tracking-wider uppercase
        rounded-sm ${config.className} ${className}
      `}
    >
      {t(config.key)}
    </span>
  )
}
