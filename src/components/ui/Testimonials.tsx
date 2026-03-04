import type { Testimonial } from '../../types'

// Sample testimonials - these would typically come from Shopify reviews or a CMS
const testimonials: Testimonial[] = [
  {
    id: '1',
    quote: "I've never received so many compliments on a fragrance. The quality is remarkable — it lasts all day and the scent evolves beautifully.",
    author: 'Sofia M.',
    title: 'Loyal Customer',
    rating: 5,
    productName: 'Citrus Marine & Wood',
  },
  {
    id: '2',
    quote: "Kim's attention to detail is extraordinary. You can tell each bottle is crafted with love. This is what luxury fragrance should be.",
    author: 'Maria L.',
    title: 'Makeup Artist',
    rating: 5,
    productName: 'Rose & Amber',
  },
  {
    id: '3',
    quote: "Finally, a perfume that doesn't smell like everything else on the market. Unique, sophisticated, and absolutely worth every euro.",
    author: 'Ana R.',
    title: 'Interior Designer',
    rating: 5,
    productName: 'Discovery Set',
  },
]

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-1">
      {[...Array(5)].map((_, i) => (
        <svg
          key={i}
          className={`w-4 h-4 ${i < rating ? 'text-kas-gold' : 'text-kas-sand'}`}
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  )
}

export function Testimonials() {
  return (
    <section className="py-20 bg-kas-sand/30">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="section-heading">What Our Customers Say</h2>
          <p className="section-subheading">
            Discover why fragrance lovers are choosing KAS
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.id}
              className="bg-white rounded-xl p-8 shadow-sm"
            >
              <StarRating rating={testimonial.rating} />

              <blockquote className="mt-4 text-kas-slate font-light leading-relaxed">
                "{testimonial.quote}"
              </blockquote>

              <div className="mt-6 pt-6 border-t border-kas-sand">
                <p className="font-serif text-kas-charcoal">{testimonial.author}</p>
                <p className="text-sm text-kas-slate">{testimonial.title}</p>
                {testimonial.productName && (
                  <p className="text-sm text-kas-gold mt-1">
                    Purchased: {testimonial.productName}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
