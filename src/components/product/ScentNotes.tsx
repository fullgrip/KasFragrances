import { useTranslation } from 'react-i18next'
import type { ScentNotes as ScentNotesType, ScentProfile } from '../../types'

interface ScentNotesProps {
  notes: ScentNotesType
  profile?: ScentProfile
}

export function ScentNotes({ notes, profile }: ScentNotesProps) {
  const { t } = useTranslation()
  const hasNotes = notes.top.length > 0 || notes.heart.length > 0 || notes.base.length > 0
  const hasProfile = profile && (profile.fragranceFamily || profile.mood || profile.bestWorn)

  if (!hasNotes && !hasProfile) return null

  return (
    <div className="bg-kas-sand/50 rounded-xl p-6">
      {/* Scent Profile */}
      {hasProfile && (
        <div className="mb-6 pb-6 border-b border-kas-sand">
          <h3 className="font-serif text-lg text-kas-charcoal mb-4">{t('scent.profile')}</h3>
          <div className="space-y-2 text-sm">
            {profile.fragranceFamily && (
              <div className="flex items-start gap-2">
                <span className="text-kas-slate min-w-24">{t('scent.family')}</span>
                <span className="text-kas-charcoal">{profile.fragranceFamily}</span>
              </div>
            )}
            {profile.mood && (
              <div className="flex items-start gap-2">
                <span className="text-kas-slate min-w-24">{t('scent.mood')}</span>
                <span className="text-kas-charcoal">{profile.mood}</span>
              </div>
            )}
            {profile.bestWorn && (
              <div className="flex items-start gap-2">
                <span className="text-kas-slate min-w-24">{t('scent.bestWorn')}</span>
                <span className="text-kas-charcoal">{profile.bestWorn}</span>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Scent Notes */}
      {hasNotes && (
        <>
          <h3 className="font-serif text-lg text-kas-charcoal mb-4">{t('scent.notes')}</h3>
      <div className="space-y-4">
        {notes.top.length > 0 && (
          <div className="flex items-start gap-4">
            <div className="w-16 flex-shrink-0">
              <span className="text-xs uppercase tracking-wider text-kas-slate font-medium">{t('scent.top')}</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {notes.top.map((note, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-white rounded-full text-sm text-kas-charcoal"
                >
                  {note}
                </span>
              ))}
            </div>
          </div>
        )}

        {notes.heart.length > 0 && (
          <div className="flex items-start gap-4">
            <div className="w-16 flex-shrink-0">
              <span className="text-xs uppercase tracking-wider text-kas-slate font-medium">{t('scent.heart')}</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {notes.heart.map((note, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-white rounded-full text-sm text-kas-charcoal"
                >
                  {note}
                </span>
              ))}
            </div>
          </div>
        )}

        {notes.base.length > 0 && (
          <div className="flex items-start gap-4">
            <div className="w-16 flex-shrink-0">
              <span className="text-xs uppercase tracking-wider text-kas-slate font-medium">{t('scent.base')}</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {notes.base.map((note, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-white rounded-full text-sm text-kas-charcoal"
                >
                  {note}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
        </>
      )}
    </div>
  )
}
