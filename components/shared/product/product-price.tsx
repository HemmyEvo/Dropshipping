'use client'
import { cn, formatCurrency } from '@/lib/utils'

const ProductPrice = ({
  price,
  className,
  listPrice = 0,
  isDeal = false,
  forListing = true,
  plain = false,
}: {
  price: number
  isDeal?: boolean
  listPrice?: number
  className?: string
  forListing?: boolean
  plain?: boolean
}) => {
  const hasDiscount = listPrice > 0 && listPrice > price
  const discountPercent = hasDiscount ? Math.round(100 - (price / listPrice) * 100) : 0

  // Format price for display with proper decimal handling
  const formatPriceDisplay = (amount: number) => {
    const formatted = formatCurrency(amount)
    const [dollars, cents] = formatted.split('.')
    return {
      dollars: dollars.replace('$', ''),
      cents: cents || '00'
    }
  }

  const currentPrice = formatPriceDisplay(price)
  const originalPrice = formatPriceDisplay(listPrice)

  if (plain) {
    return <span className={className}>{formatCurrency(price)}</span>
  }

  // For product listing cards (compact view)
  if (forListing) {
    return (
      <div className={cn('flex flex-col gap-1', className)}>
        <div className="flex items-baseline gap-2">
          <span className="text-2xl font-bold text-gray-900">
            {formatCurrency(price)}
          </span>
          {hasDiscount && isDeal && (
            <span className="px-1.5 py-0.5 bg-red-500 text-white text-xs font-bold rounded">
              {discountPercent}% OFF
            </span>
          )}
        </div>
        
        {hasDiscount && (
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-500 line-through">
              {formatCurrency(listPrice)}
            </span>
            {!isDeal && (
              <span className="text-sm text-green-600 font-medium">
                Save {formatCurrency(listPrice - price)}
              </span>
            )}
          </div>
        )}
        
        {isDeal && hasDiscount && (
          <div className="text-xs text-red-600 font-medium">
            ⚡ Limited time deal
          </div>
        )}
      </div>
    )
  }

  // For product detail page (expanded view)
  return (
    <div className={cn('space-y-3', className)}>
      {/* Price and discount badge */}
      <div className="flex items-baseline gap-3">
        <div className="flex items-baseline">
          <span className="text-4xl font-bold text-gray-900">
            {formatCurrency(price)}
          </span>
          {hasDiscount && (
            <span className="ml-2 px-2 py-1 bg-red-500 text-white text-sm font-bold rounded">
              {discountPercent}% OFF
            </span>
          )}
        </div>
      </div>

      {/* Original price and savings */}
      {hasDiscount && (
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="text-lg text-gray-500 line-through">
              {formatCurrency(listPrice)}
            </span>
            <span className="text-lg text-green-600 font-semibold">
              Save {formatCurrency(listPrice - price)}
            </span>
          </div>
          
          {isDeal && (
            <div className="flex items-center gap-2 text-sm">
              <span className="px-2 py-1 bg-orange-100 text-orange-700 rounded-full font-medium">
                ⚡ Limited time deal
              </span>
              <span className="text-gray-600">
                Ends soon
              </span>
            </div>
          )}
        </div>
      )}

 
    </div>
  )
}

export default ProductPrice