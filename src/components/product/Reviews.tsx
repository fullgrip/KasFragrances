import { useState } from 'react'
import { StarRating } from './StarRating'

export interface Review {
  id: string
  author: string
  rating: number
  title: string
  content: string
  date: string
  verified: boolean
  helpful: number
}

interface ReviewsProps {
  productHandle: string
  productTitle: string
}

// Mock reviews data - replace with API call later
const mockReviews: Record<string, Review[]> = {
  'citrus-marine-wood': [
    {
      id: '1',
      author: 'Sofia M.',
      rating: 5,
      title: 'My new signature scent!',
      content: 'I\'ve been searching for the perfect fresh fragrance for years, and this is it. The marine notes are subtle and sophisticated, not overpowering. Lasts all day on my skin.',
      date: '2024-01-15',
      verified: true,
      helpful: 12,
    },
    {
      id: '2',
      author: 'João P.',
      rating: 4,
      title: 'Great summer fragrance',
      content: 'Perfect for warm days. The citrus opening is bright and the drydown is warm and comforting. Only wish it lasted a bit longer.',
      date: '2024-01-10',
      verified: true,
      helpful: 8,
    },
    {
      id: '3',
      author: 'Maria C.',
      rating: 5,
      title: 'Compliment magnet',
      content: 'I get asked what I\'m wearing every time. Beautiful blend of freshness and warmth. Worth every penny.',
      date: '2024-01-05',
      verified: true,
      helpful: 15,
    },
  ],
  'default': [
    {
      id: '1',
      author: 'Ana R.',
      rating: 5,
      title: 'Beautiful fragrance',
      content: 'Absolutely love this scent. It\'s unique and lasts all day. The quality is exceptional.',
      date: '2024-01-20',
      verified: true,
      helpful: 6,
    },
    {
      id: '2',
      author: 'Pedro S.',
      rating: 4,
      title: 'Very nice',
      content: 'Great quality and beautiful packaging. The scent is sophisticated and long-lasting.',
      date: '2024-01-12',
      verified: true,
      helpful: 4,
    },
  ],
}

export function Reviews({ productHandle, productTitle }: ReviewsProps) {
  const [showAll, setShowAll] = useState(false)

  const reviews = mockReviews[productHandle] || mockReviews['default']
  const displayedReviews = showAll ? reviews : reviews.slice(0, 2)

  const averageRating = reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length
  const ratingCounts = [5, 4, 3, 2, 1].map(
    rating => reviews.filter(r => r.rating === rating).length
  )

  return (
    <div className="border-t border-kas-sand pt-12 mt-12">
      <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-8 mb-8">
        {/* Summary */}
        <div>
          <h2 className="font-serif text-2xl text-kas-charcoal mb-4">Customer Reviews</h2>
          <div className="flex items-center gap-4">
            <div className="text-center">
              <p className="font-serif text-4xl text-kas-charcoal">{averageRating.toFixed(1)}</p>
              <StarRating rating={averageRating} size="md" />
              <p className="text-sm text-kas-slate mt-1">
                Based on {reviews.length} {reviews.length === 1 ? 'review' : 'reviews'}
              </p>
            </div>
          </div>
        </div>

        {/* Rating breakdown */}
        <div className="w-full lg:w-64">
          {[5, 4, 3, 2, 1].map((rating, index) => {
            const count = ratingCounts[index]
            const percentage = (count / reviews.length) * 100
            return (
              <div key={rating} className="flex items-center gap-2 mb-1">
                <span className="text-sm text-kas-slate w-3">{rating}</span>
                <StarRating rating={rating} maxRating={1} size="sm" />
                <div className="flex-1 h-2 bg-kas-sand rounded-full overflow-hidden">
                  <div
                    className="h-full bg-kas-gold rounded-full transition-all"
                    style={{ width: `${percentage}%` }}
                  />
                </div>
                <span className="text-sm text-kas-slate w-6">{count}</span>
              </div>
            )
          })}
        </div>
      </div>

      {/* Reviews list */}
      <div className="space-y-6">
        {displayedReviews.map((review) => (
          <div key={review.id} className="border-b border-kas-sand pb-6 last:border-0">
            <div className="flex items-start justify-between mb-2">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <StarRating rating={review.rating} size="sm" />
                  {review.verified && (
                    <span className="inline-flex items-center gap-1 text-xs text-kas-gold">
                      <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      Verified Purchase
                    </span>
                  )}
                </div>
                <h3 className="font-medium text-kas-charcoal">{review.title}</h3>
              </div>
              <time className="text-sm text-kas-slate">
                {new Date(review.date).toLocaleDateString('en-US', {
                  month: 'short',
                  day: 'numeric',
                  year: 'numeric',
                })}
              </time>
            </div>
            <p className="text-kas-slate font-light mb-3">{review.content}</p>
            <div className="flex items-center justify-between">
              <p className="text-sm text-kas-slate">— {review.author}</p>
              <button className="text-sm text-kas-slate hover:text-kas-charcoal flex items-center gap-1">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
                </svg>
                Helpful ({review.helpful})
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Show more/less button */}
      {reviews.length > 2 && (
        <button
          onClick={() => setShowAll(!showAll)}
          className="w-full mt-6 py-3 text-sm text-kas-gold hover:text-kas-copper font-medium border border-kas-sand rounded-lg hover:border-kas-gold transition-colors"
        >
          {showAll ? 'Show less' : `Show all ${reviews.length} reviews`}
        </button>
      )}

      {/* Write review CTA */}
      <div className="mt-8 bg-kas-sand/30 rounded-xl p-6 text-center">
        <p className="text-kas-charcoal mb-2">Have you tried {productTitle}?</p>
        <p className="text-sm text-kas-slate mb-4">Share your experience with others</p>
        <button className="btn-secondary">
          Write a Review
        </button>
      </div>
    </div>
  )
}
