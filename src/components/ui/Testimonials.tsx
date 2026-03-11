import { useState, useRef, useEffect } from 'react'
import { Link } from 'react-router-dom'
import type { Testimonial } from '../../types'

const allTestimonials: Testimonial[] = [
  {
    id: '1',
    quote: "I've received so many compliments wearing Citrus Marine & Wood. It's fresh and elegant, and the scent lasts all day. You can tell Kim puts real care into every fragrance.",
    author: 'Kat',
    rating: 5,
    productName: 'Citrus Marine & Wood',
    productSlug: 'citrus-marine-wood-eau-de-parfum',
    scentTags: ['Fresh', 'Marine', 'Woody'],
    avatar: '/images/reviewers/kat.png',
  },
  {
    id: '2',
    quote: "Tantalizing Tonka is absolutely divine. The warmth of the tonka bean is cozy without being heavy. It's become my signature scent for cooler days.",
    author: 'Arya',
    rating: 5,
    productName: 'Tantalizing Tonka',
    productSlug: 'tantalizing-tonka-eau-de-parfum',
    scentTags: ['Warm', 'Sweet', 'Sensual'],
    avatar: '/images/reviewers/arya.png',
  },
  {
    id: '3',
    quote: "Secrets is my go-to for evenings out. It's mysterious and sophisticated without being too heavy. I always get asked what I'm wearing.",
    author: 'Gisele',
    rating: 5,
    productName: 'Secrets',
    productSlug: 'secrets-eau-de-parfum',
    scentTags: ['Mysterious', 'Elegant', 'Intoxicating'],
    avatar: '/images/reviewers/gisele.png',
  },
  {
    id: '4',
    quote: "I have the Coffee Vanilla Tobacco diffuser in my home office. The blend of coffee, vanilla and tobacco is warm and grounding. Perfect for focus.",
    author: 'João P.',
    rating: 5,
    productName: 'Coffee, Vanilla & Tobacco',
    productSlug: 'coffee-vanilla-tobacco-diffuser',
    scentTags: ['Coffee', 'Vanilla', 'Tobacco'],
    avatar: '/images/reviewers/joao-p.jpg',
  },
  {
    id: '5',
    quote: "Paradise instantly transports me somewhere tropical. It's fresh and exotic but still elegant enough for everyday. My new favorite from KAS.",
    author: 'Helena S.',
    rating: 5,
    productName: 'Paradise',
    productSlug: 'paradise-eau-de-parfum',
    scentTags: ['Tropical', 'Fresh', 'Exotic'],
    avatar: '/images/reviewers/helena-s.jpg',
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

function TestimonialCard({ testimonial }: { testimonial: Testimonial }) {
  return (
    <div className="bg-white rounded-xl p-8 shadow-sm transition-shadow duration-300 hover:shadow-lg h-full flex flex-col">
      <StarRating rating={testimonial.rating} />

      <blockquote className="mt-4 mb-6 text-kas-slate font-light leading-relaxed flex-grow">
        "{testimonial.quote}"
      </blockquote>

      <div className="flex items-center gap-3">
        {testimonial.avatar && (
          <img
            src={testimonial.avatar}
            alt={testimonial.author}
            className="w-10 h-10 rounded-full object-cover flex-shrink-0"
          />
        )}
        <div>
          <p className="font-serif text-kas-charcoal mb-1">{testimonial.author}</p>
          <Link
            to={`/products/${testimonial.productSlug}`}
            className="text-sm text-kas-gold hover:underline"
          >
            Purchased: {testimonial.productName}
          </Link>
          <p className="text-xs text-kas-slate mt-1">
            {testimonial.scentTags.join(' · ')}
          </p>
        </div>
      </div>
    </div>
  )
}

export function Testimonials() {
  const testimonials = allTestimonials
  const [currentIndex, setCurrentIndex] = useState(0)
  const touchStartX = useRef<number | null>(null)

  const maxDesktopIndex = testimonials.length - 3
  const maxMobileIndex = testimonials.length - 1

  // Prevent index overflow when resizing
  useEffect(() => {
    if (currentIndex > maxDesktopIndex) {
      setCurrentIndex(maxDesktopIndex)
    }
  }, [currentIndex, maxDesktopIndex])

  const goToPrevious = (max: number) => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1)
    } else {
      setCurrentIndex(max)
    }
  }

  const goToNext = (max: number) => {
    if (currentIndex < max) {
      setCurrentIndex(currentIndex + 1)
    } else {
      setCurrentIndex(0)
    }
  }

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX
  }

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return

    const touchEndX = e.changedTouches[0].clientX
    const diff = touchStartX.current - touchEndX

    if (Math.abs(diff) > 50) {
      if (diff > 0) {
        // Swipe left - next
        goToNext(maxMobileIndex)
      } else {
        // Swipe right - previous
        goToPrevious(maxMobileIndex)
      }
    }

    touchStartX.current = null
  }

  // Get visible testimonials for desktop (3 at a time)
  const desktopTestimonials = testimonials.slice(currentIndex, currentIndex + 3)

  return (
    <section className="py-20 bg-kas-sand/30">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="section-heading">What Customers Are Saying</h2>
          <p className="section-subheading">
            Discover why fragrance lovers are choosing KAS
          </p>
        </div>

        {/* Desktop Carousel */}
        <div className="hidden md:block relative">
          {/* Left Arrow */}
          <button
            onClick={() => goToPrevious(maxDesktopIndex)}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-12 w-10 h-10 rounded-full bg-white shadow-md flex items-center justify-center text-kas-charcoal hover:bg-kas-sand transition-colors"
            aria-label="Previous reviews"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          {/* Cards Grid */}
          <div className="grid grid-cols-3 gap-8">
            {desktopTestimonials.map((testimonial) => (
              <TestimonialCard key={testimonial.id} testimonial={testimonial} />
            ))}
          </div>

          {/* Right Arrow */}
          <button
            onClick={() => goToNext(maxDesktopIndex)}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-12 w-10 h-10 rounded-full bg-white shadow-md flex items-center justify-center text-kas-charcoal hover:bg-kas-sand transition-colors"
            aria-label="Next reviews"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>

        {/* Mobile Carousel */}
        <div
          className="md:hidden relative"
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          {/* Single Card */}
          <TestimonialCard testimonial={testimonials[currentIndex]} />

          {/* Navigation */}
          <div className="flex items-center justify-center gap-4 mt-6">
            <button
              onClick={() => goToPrevious(maxMobileIndex)}
              className="w-10 h-10 rounded-full bg-white shadow-md flex items-center justify-center text-kas-charcoal hover:bg-kas-sand transition-colors"
              aria-label="Previous review"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>

            {/* Dots */}
            <div className="flex gap-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`w-2 h-2 rounded-full transition-colors ${
                    index === currentIndex ? 'bg-kas-gold' : 'bg-kas-slate/30'
                  }`}
                  aria-label={`Go to review ${index + 1}`}
                />
              ))}
            </div>

            <button
              onClick={() => goToNext(maxMobileIndex)}
              className="w-10 h-10 rounded-full bg-white shadow-md flex items-center justify-center text-kas-charcoal hover:bg-kas-sand transition-colors"
              aria-label="Next review"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
