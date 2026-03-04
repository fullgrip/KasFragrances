interface SkeletonProps {
  className?: string
}

export function Skeleton({ className = '' }: SkeletonProps) {
  return (
    <div
      className={`animate-pulse bg-kas-sand/70 rounded ${className}`}
      aria-hidden="true"
    />
  )
}

export function ProductCardSkeleton() {
  return (
    <div className="group">
      {/* Image skeleton */}
      <div className="aspect-[3/4] bg-kas-sand rounded-2xl overflow-hidden mb-4">
        <Skeleton className="w-full h-full rounded-none" />
      </div>
      {/* Title */}
      <Skeleton className="h-5 w-3/4 mb-2" />
      {/* Subtitle */}
      <Skeleton className="h-4 w-1/2 mb-3" />
      {/* Price */}
      <Skeleton className="h-5 w-1/4" />
    </div>
  )
}

export function ProductGridSkeleton({ count = 6 }: { count?: number }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
      {Array.from({ length: count }).map((_, i) => (
        <ProductCardSkeleton key={i} />
      ))}
    </div>
  )
}

export function ProductPageSkeleton() {
  return (
    <div className="py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb skeleton */}
        <div className="mb-8 flex gap-2">
          <Skeleton className="h-4 w-12" />
          <Skeleton className="h-4 w-20" />
          <Skeleton className="h-4 w-32" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Image skeleton */}
          <div>
            <Skeleton className="aspect-square rounded-2xl" />
            {/* Thumbnails */}
            <div className="hidden sm:grid grid-cols-4 gap-3 mt-4">
              {[1, 2, 3, 4].map((i) => (
                <Skeleton key={i} className="aspect-square rounded-lg" />
              ))}
            </div>
          </div>

          {/* Product info skeleton */}
          <div>
            {/* Title */}
            <Skeleton className="h-10 w-3/4 mb-3" />
            <Skeleton className="h-5 w-full mb-6" />

            {/* Price */}
            <Skeleton className="h-8 w-24 mb-2" />
            <Skeleton className="h-4 w-48 mb-6" />

            {/* Scent Notes */}
            <div className="mb-6 space-y-4">
              <Skeleton className="h-5 w-24" />
              <div className="flex flex-wrap gap-2">
                <Skeleton className="h-8 w-20 rounded-full" />
                <Skeleton className="h-8 w-24 rounded-full" />
                <Skeleton className="h-8 w-16 rounded-full" />
              </div>
            </div>

            {/* Add to cart */}
            <Skeleton className="h-12 w-full rounded mb-6" />

            {/* Samples reminder */}
            <Skeleton className="h-16 w-full rounded-lg mb-6" />

            {/* Product details */}
            <Skeleton className="h-12 w-full rounded mb-2" />
            <Skeleton className="h-12 w-full rounded mb-2" />
            <Skeleton className="h-12 w-full rounded" />
          </div>
        </div>
      </div>
    </div>
  )
}

export function SearchResultsSkeleton({ count = 3 }: { count?: number }) {
  return (
    <div className="space-y-4">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="flex items-center gap-3 px-4 py-2">
          <Skeleton className="w-12 h-12 rounded-lg flex-shrink-0" />
          <div className="flex-1">
            <Skeleton className="h-4 w-3/4 mb-2" />
            <Skeleton className="h-3 w-16" />
          </div>
        </div>
      ))}
    </div>
  )
}
