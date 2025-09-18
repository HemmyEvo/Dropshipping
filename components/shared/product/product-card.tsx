import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import Rating from './rating'
import { formatNumber } from '@/lib/utils'
import ProductPrice from './product-price'
import { IProductInput } from '@/types'
import ImageHover from './image-hover'

const ProductCard = ({
  product,
  hideBorder = false,
  hideDetails = false,
}: {
  product: IProductInput
  hideDetails?: boolean
  hideBorder?: boolean
  hideAddToCart?: boolean
}) => {
  const ProductImage = () => {
    const hoverImages = product.images
      .filter(img => img.url !== product.images[0].url)
      .map(img => img.url)

    return (
    
        <div className="relative h-52">
          {product.images.length > 1 ? (
            <ImageHover
              src={product.images[0].url}
              hoverSrcs={hoverImages}
              alt={product.name}
              href={`/product/${product.slug}`}
            />
          ) : (
            <div className="relative w-full h-52">
              <Image
                src={product.images[0].url}
                alt={product.name}
                fill
                sizes="80vw"
                className="object-contain"
              />
            </div>
          )}
        </div>
    
    )
  }

  const ProductDetails = () => (
    <div className="flex-1 space-y-2">
      <p className="font-bold">{product.brand}</p>
      <Link
        href={`/product/${product.slug}`}
        className="overflow-hidden hover:text-[blue] cursor-pointer text-ellipsis"
        style={{
          display: '-webkit-box',
          WebkitLineClamp: 2,
          WebkitBoxOrient: 'vertical',
        }}
      >
        {product.name}
      </Link>
      <div className="flex gap-2 justify-center">
        <Rating rating={product.avgRating} />
        <span>({formatNumber(product.numReviews)})</span>
      </div>

      <ProductPrice
        isDeal={product.tags.includes('todays-deal')}
        price={product.price}
        listPrice={product.listPrice}
        forListing
      />
    </div>
  )

  return hideBorder ? (
    <div className="flex w-full  flex-col">
      <ProductImage />
      {!hideDetails && (
        <div className=" flex-1 text-center">
          <ProductDetails />
        </div>
      )}
    </div>
  ) : (
    <Card className="flex flex-col">
      <CardHeader className="p-3">
        <ProductImage />
      </CardHeader>
      {!hideDetails && (
        <CardContent className="p-3 flex-1 text-center">
          <ProductDetails />
        </CardContent>
      )}
    </Card>
  )
}

export default ProductCard
