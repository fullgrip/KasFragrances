import { Helmet } from 'react-helmet-async'
import { useTranslation } from 'react-i18next'

interface SEOProps {
  title?: string
  description?: string
  image?: string
  url?: string
  type?: 'website' | 'product'
  product?: {
    name: string
    description: string
    image: string
    price: string
    currency: string
    availability: 'InStock' | 'OutOfStock'
  }
}

const SITE_NAME = 'KAS Fragrances'
const BASE_URL = 'https://kasfragrances.com'
const DEFAULT_IMAGE = '/images/banners/about-kas.jpg'

export function SEO({
  title,
  description,
  image,
  url,
  type = 'website',
  product,
}: SEOProps) {
  const { i18n, t } = useTranslation()

  const locale = i18n.language === 'pt' ? 'pt_PT' : 'en_US'
  const alternateLocale = i18n.language === 'pt' ? 'en_US' : 'pt_PT'

  const fullTitle = title
    ? `${title} | ${SITE_NAME}`
    : `${SITE_NAME} | Small-Batch Scents. Handcrafted in Portugal.`

  const metaDescription = description || t('footer.brandDescription')
  const canonicalUrl = url ? `${BASE_URL}${url}` : BASE_URL
  const ogImage = image?.startsWith('http') ? image : `${BASE_URL}${image || DEFAULT_IMAGE}`

  return (
    <Helmet>
      {/* Basic Meta */}
      <title>{fullTitle}</title>
      <meta name="description" content={metaDescription} />
      <link rel="canonical" href={canonicalUrl} />

      {/* Open Graph */}
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={metaDescription} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:type" content={type === 'product' ? 'product' : 'website'} />
      <meta property="og:locale" content={locale} />
      <meta property="og:locale:alternate" content={alternateLocale} />

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={metaDescription} />
      <meta name="twitter:image" content={ogImage} />

      {/* Product structured data */}
      {product && (
        <script type="application/ld+json">
          {JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Product',
            name: product.name,
            description: product.description,
            image: product.image,
            brand: {
              '@type': 'Brand',
              name: SITE_NAME,
            },
            offers: {
              '@type': 'Offer',
              price: product.price,
              priceCurrency: product.currency,
              availability: `https://schema.org/${product.availability}`,
              url: canonicalUrl,
            },
          })}
        </script>
      )}
    </Helmet>
  )
}
