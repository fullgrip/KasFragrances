import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { getProduct, mapLanguageCode } from '../lib/shopify'
import type { Product } from '../types'
import { FEATURES } from '../config/features'

const FEATURED_PRODUCT_HANDLE = 'rose-blossom-body-mist'

export function AboutPage() {
  const { i18n } = useTranslation()
  const [featuredProduct, setFeaturedProduct] = useState<Product | null>(null)
  const [isLoadingProduct, setIsLoadingProduct] = useState(true)

  useEffect(() => {
    async function fetchFeaturedProduct() {
      try {
        const language = mapLanguageCode(i18n.language)
        const product = await getProduct(FEATURED_PRODUCT_HANDLE, language)
        setFeaturedProduct(product)
      } catch (error) {
        console.error('Failed to fetch featured product:', error)
      } finally {
        setIsLoadingProduct(false)
      }
    }
    fetchFeaturedProduct()
  }, [i18n.language])

  return (
    <div>
      {/* The Artisan - Meet Kim */}
      <section className="pt-12 pb-24 bg-kas-sand/50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Image */}
            <div className="order-2 lg:order-1">
              <div className="aspect-[4/5] bg-kas-sand rounded-2xl overflow-hidden">
                <img
                  src="/images/banners/about-kas.jpg"
                  alt="Kim, founder of KAS Fragrances"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* Story Text */}
            <div className="order-1 lg:order-2">
              <span className="text-kas-gold text-sm uppercase tracking-widest">The Artisan</span>
              <h2 className="font-serif text-3xl md:text-4xl text-kas-charcoal mt-4 mb-6">
                Meet Kim
              </h2>
              <div className="space-y-4 text-kas-slate font-light leading-relaxed">
                <p>
                  I have loved scents and perfume ever since I can remember. As a little
                  girl, I would smell everything, sneaking into my mother's cupboard to
                  spray on her JOY perfume and any other fragrance I could get my hands on.
                </p>
                <p>
                  In my 20s and 30s, once I started working, perfume shops and duty-free
                  stores felt like heaven. I would try on as many perfumes as I could and
                  spend nearly all my money on fragrances: Dune by Christian Dior,
                  Boucheron, Dolce & Gabbana Light Blue, Chanel... the list goes on and on.
                </p>
                <p>
                  Today, I am truly fortunate to live in beautiful Portugal, where I am
                  able to pursue my passion for perfumery and create to my heart's content.
                  I am transported into another world when I'm creating a perfume. To be
                  enveloped by beautiful scents uplifts and inspires me.
                </p>
                <p>
                  It brings me joy to share my creations with those who appreciate luxury,
                  elegance, and peaceful moments. It is my wish that my creations bring
                  you joy and make you feel special and beautiful, because you are.
                </p>
              </div>

              <div className="mt-8 p-6 bg-kas-sand/50 rounded-xl">
                <blockquote className="font-serif text-xl md:text-2xl text-kas-charcoal italic leading-relaxed">
                  "It is my wish that my creations bring you joy and make you feel
                  special and beautiful, because you are."
                </blockquote>
                <p className="mt-4 text-kas-gold font-medium">Kim Steenkamp, Founder</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="py-24 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="font-serif text-3xl md:text-4xl text-kas-charcoal mb-4">The KAS Process</h2>
            <p className="text-kas-slate font-light text-lg max-w-2xl mx-auto">
              From inspiration to bottle — how we create each fragrance
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
            {/* Step 01 - Inspiration */}
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 flex items-center justify-center rounded-full bg-kas-sand/50">
                <svg className="w-8 h-8 text-kas-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
              <h3 className="font-serif text-2xl text-kas-charcoal mb-3">Inspiration</h3>
              <p className="text-kas-slate font-light max-w-xs mx-auto">Each fragrance begins with a memory, a place, or an emotion.</p>
            </div>

            {/* Step 02 - Sourcing */}
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 flex items-center justify-center rounded-full bg-kas-sand/50">
                <svg className="w-8 h-8 text-kas-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="font-serif text-2xl text-kas-charcoal mb-3">Sourcing</h3>
              <p className="text-kas-slate font-light max-w-xs mx-auto">Only the finest ingredients from trusted European suppliers.</p>
            </div>

            {/* Step 03 - Blending */}
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 flex items-center justify-center rounded-full bg-kas-sand/50">
                <svg className="w-8 h-8 text-kas-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                </svg>
              </div>
              <h3 className="font-serif text-2xl text-kas-charcoal mb-3">Blending</h3>
              <p className="text-kas-slate font-light max-w-xs mx-auto">Kim personally blends and tests each formula until perfect.</p>
            </div>

            {/* Step 04 - Crafting */}
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 flex items-center justify-center rounded-full bg-kas-sand/50">
                <svg className="w-8 h-8 text-kas-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </div>
              <h3 className="font-serif text-2xl text-kas-charcoal mb-3">Crafting</h3>
              <p className="text-kas-slate font-light max-w-xs mx-auto">Each bottle is filled, labeled, and packaged by hand.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Fragrance */}
      <section className="py-24 bg-kas-sand/30">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {isLoadingProduct ? (
            // Loading skeleton
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center animate-pulse">
              <div className="flex justify-center">
                <div className="aspect-[3/4] w-72 md:w-80 lg:w-96 bg-kas-sand rounded-2xl" />
              </div>
              <div>
                <div className="h-4 w-32 bg-kas-sand rounded mb-4" />
                <div className="h-10 w-64 bg-kas-sand rounded mb-4" />
                <div className="h-20 w-full max-w-md bg-kas-sand rounded mb-8" />
                <div className="space-y-4 mb-8">
                  <div className="h-6 w-48 bg-kas-sand rounded" />
                  <div className="h-6 w-56 bg-kas-sand rounded" />
                  <div className="h-6 w-52 bg-kas-sand rounded" />
                </div>
                <div className="h-12 w-48 bg-kas-sand rounded" />
              </div>
            </div>
          ) : featuredProduct ? (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
              {/* Bottle Image */}
              <div className="flex justify-center">
                <div className="relative">
                  <div className="aspect-[3/4] w-72 md:w-80 lg:w-96 bg-white rounded-2xl shadow-xl overflow-hidden">
                    {featuredProduct.images.length > 0 ? (
                      <img
                        src={featuredProduct.images[0].url}
                        alt={featuredProduct.images[0].altText || featuredProduct.title}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full bg-kas-sand flex items-center justify-center">
                        <span className="text-kas-slate">No image</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Fragrance Info */}
              <div>
                <span className="text-kas-gold text-sm uppercase tracking-widest">Featured Fragrance</span>
                <h2 className="font-serif text-3xl md:text-4xl text-kas-charcoal mt-4 mb-4">
                  {featuredProduct.title}
                </h2>
                <p className="text-kas-slate font-light text-lg mb-8 max-w-md">
                  {featuredProduct.subtitle || featuredProduct.description}
                </p>

                {/* Scent Notes */}
                {featuredProduct.scentNotes && (
                  <div className="space-y-4 mb-8">
                    {featuredProduct.scentNotes.top.length > 0 && (
                      <div className="flex items-start gap-4">
                        <span className="text-xs uppercase tracking-wider text-kas-gold font-medium w-20">Top</span>
                        <span className="text-kas-charcoal">{featuredProduct.scentNotes.top.join(' • ')}</span>
                      </div>
                    )}
                    {featuredProduct.scentNotes.heart.length > 0 && (
                      <div className="flex items-start gap-4">
                        <span className="text-xs uppercase tracking-wider text-kas-gold font-medium w-20">Heart</span>
                        <span className="text-kas-charcoal">{featuredProduct.scentNotes.heart.join(' • ')}</span>
                      </div>
                    )}
                    {featuredProduct.scentNotes.base.length > 0 && (
                      <div className="flex items-start gap-4">
                        <span className="text-xs uppercase tracking-wider text-kas-gold font-medium w-20">Base</span>
                        <span className="text-kas-charcoal">{featuredProduct.scentNotes.base.join(' • ')}</span>
                      </div>
                    )}
                  </div>
                )}

                <Link
                  to={`/products/${featuredProduct.handle}`}
                  className="inline-block px-8 py-3 bg-kas-charcoal text-white font-medium rounded hover:bg-kas-charcoal/90 transition-colors"
                >
                  Shop This Fragrance
                </Link>
              </div>
            </div>
          ) : null}
        </div>
      </section>

      {/* Values */}
      <section className="py-24 bg-kas-charcoal text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="font-serif text-3xl md:text-4xl mb-4">Our Values</h2>
            <p className="text-gray-300 font-light text-lg max-w-2xl mx-auto">
              The principles that guide everything we create
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
            <div className="text-center">
              <div className="w-24 h-24 mx-auto mb-6 flex items-center justify-center rounded-full bg-kas-gold/20">
                <svg className="w-12 h-12 text-kas-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                </svg>
              </div>
              <h3 className="font-serif text-2xl text-kas-gold mb-3">Quality First</h3>
              <p className="text-gray-300 font-light">
                Only the finest European ingredients. No shortcuts.
              </p>
            </div>

            <div className="text-center">
              <div className="w-24 h-24 mx-auto mb-6 flex items-center justify-center rounded-full bg-kas-gold/20">
                <svg className="w-12 h-12 text-kas-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </div>
              <h3 className="font-serif text-2xl text-kas-gold mb-3">Crafted with Love</h3>
              <p className="text-gray-300 font-light">
                Personally blended by Kim in small batches.
              </p>
            </div>

            <div className="text-center">
              <div className="w-24 h-24 mx-auto mb-6 flex items-center justify-center rounded-full bg-kas-gold/20">
                <svg className="w-12 h-12 text-kas-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="font-serif text-2xl text-kas-gold mb-3">Ethically Made</h3>
              <p className="text-gray-300 font-light">
                100% cruelty-free. Always.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-kas-sand/50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-serif text-3xl md:text-4xl text-kas-charcoal mb-4">
            Ready to Find Your Signature Scent?
          </h2>
          <p className="text-kas-slate font-light text-lg mb-10 max-w-xl mx-auto">
            Explore our collection or try the Discovery Set to experience
            KAS fragrances for yourself.
          </p>
          <div className="flex flex-wrap justify-center gap-6">
            <Link to="/collection" className="inline-block px-8 py-4 bg-kas-charcoal text-white font-medium rounded hover:bg-kas-charcoal/90 transition-colors">
              Explore the Collection
            </Link>
            {FEATURES.DISCOVERY_SET_ENABLED && (
              <Link to="/products/discovery-set" className="inline-block px-8 py-4 border-2 border-kas-charcoal text-kas-charcoal font-medium rounded hover:bg-kas-charcoal hover:text-white transition-colors">
                Try the Discovery Set
              </Link>
            )}
          </div>
        </div>
      </section>
    </div>
  )
}
