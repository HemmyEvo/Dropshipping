/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import Image from 'next/image'
import Link from 'next/link'
import React, { useState } from 'react'
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'
import Rating from './rating'
import { formatNumber, generateId, round2 } from '@/lib/utils'
import ProductPrice from './product-price'
import { IProductInput, VariantGroup } from '@/types'
import ImageHover from './image-hover'
import AddToCart from './add-to-cart'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'

const ProductCard = ({
  product,
  hideBorder = false,
  hideDetails = false,
  hideAddToCart = false,
}: {
  product: IProductInput
  hideDetails?: boolean
  hideBorder?: boolean
  hideAddToCart?: boolean
}) => {
  const [open, setOpen] = useState(false)
  const [selectedVariants, setSelectedVariants] = useState<
    { title: string; option: any }[]
  >([])

  // ✅ Product image renderer
  const ProductImage = () => {
    const hoverImages = product.images
      .filter((img) => img.url !== product.images[0].url)
      .map((img) => img.url)

    return (
      <div className="relative">
        {product.images.length > 1 ? (
          <ImageHover
            src={product.images[0].url}
            hoverSrcs={hoverImages}
            alt={product.name}
            href={`/product/${product.slug}`}
          />
        ) : (
          <Link href={`/product/${product.slug}`} className="block relative bg-white">
            <div className="relative w-full h-48 md:h-56 overflow-hidden">
              <Image
                src={product.images[0].url}
                alt={product.name}
                fill
                sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
                className="object-contain p-3"
              />
            </div>
          </Link>
        )}
        

      </div>
    )
  }

  // ✅ Add button handler
  const AddButton = () => (
    <div className="w-full text-center">
      {product.variant && product.variant.length > 0 ? (
        <Button
          className="w-full bg-orange-500 hover:bg-orange-600 text-white py-2 text-sm"
          onClick={() => {
            setSelectedVariants([]) // reset on open
            setOpen(true)
          }}
        >
          Choose Options
        </Button>
      ) : (
        <AddToCart
          minimal
          item={{
            clientId: generateId(),
            product: product.slug,
            countInStock: product.countInStock,
            name: product.name,
            slug: product.slug,
            category: typeof product.category === 'string' ? product.category : product.category.name,
            price: round2(product.price),
            quantity: 1,
            images: product.images,
          }}
        />
      )}
    </div>
  )

  // ✅ Variant modal
  const VariantDialog = () => (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="text-lg font-semibold">Select Options</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          {product.variant?.map((group: VariantGroup) => (
            <div key={group.title} className="space-y-2">
              <div className="font-medium text-gray-800">{group.title}</div>
              <div className="flex flex-wrap gap-2">
                {group.options.map((opt) => {
                  const isSelected = selectedVariants.some(
                    (sv) => sv.title === group.title && sv.option.label === opt.label
                  )

                  return (
                    <Button
                      key={opt.label}
                      variant={isSelected ? 'default' : 'outline'}
                      size="sm"
                      className={`rounded-sm ${isSelected ? 'bg-orange-500 hover:bg-orange-600 border-orange-500' : 'border-gray-300'}`}
                      onClick={() => {
                        setSelectedVariants((prev) => {
                          // replace selection for this group
                          const filtered = prev.filter(
                            (sv) => sv.title !== group.title
                          )
                          return [...filtered, { title: group.title, option: opt }]
                        })
                      }}
                    >
                      {opt.image ? (
                        <Image
                          src={opt.image.url}
                          alt={opt.label}
                          width={40}
                          height={40}
                          className="rounded-sm object-cover"
                        />
                      ) : (
                        opt.label
                      )}
                    </Button>
                  )
                })}
              </div>
              <Separator />
            </div>
          ))}
        </div>

        <DialogFooter>
          <Button
            className="w-full bg-orange-500 hover:bg-orange-600 text-white py-2"
            disabled={
              product.variant?.some(
                (v) => !selectedVariants.find((sv) => sv.title === v.title)
              )
            }
            onClick={() => {
              setOpen(false)
              // add to cart with selected variants
              return (
                <AddToCart
                  item={{
                    clientId: generateId(),
                    product: product.slug,
                    variant: selectedVariants,
                    countInStock: product.countInStock,
                    name: product.name,
                    slug: product.slug,
                    category: typeof product.category === 'string' ? product.category : product.category.name,
                    price: round2(product.price),
                    quantity: 1,
                    images: product.images,
                  }}
                />
              )
            }}
          >
            Add to Cart
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )

  // ✅ Product details
  const ProductDetails = () => (
    <div className="flex-1 h-full space-y-2 p-3">
      <Link
        href={`/product/${product.slug}`}
        className="text-sm text-center text-gray-800 line-clamp-2 h-10 hover:text-orange-500 transition-colors"
      >
        {product.name}
      </Link>

      <div className="flex gap-2 justify-center">
        <Rating rating={product.avgRating} />
        <span>({formatNumber(product.numReviews)})</span>
      </div>

      {/* Price - Using your existing ProductPrice component */}
      <div className="mt-3">
        <ProductPrice 
          price={product.price} 
          listPrice={product.listPrice}
          isDeal={product.tags.includes('todays-deal')}
          forListing={true}
        />
      </div>

   
    </div>
  )

  return hideBorder ? (
    <div className="flex w-full flex-col bg-white rounded-sm shadow-sm overflow-hidden group">
      <ProductImage />
      {!hideDetails && (
        <>
          <ProductDetails />
          {!hideAddToCart && (
            <div className="p-3 border-t border-gray-100">
              <AddButton />
            </div>
          )}
        </>
      )}
      <VariantDialog />
    </div>
  ) : (
    <Card className="flex flex-col bg-white rounded-sm shadow-sm border border-gray-200 overflow-hidden group">
      <CardHeader className="p-0">
        <ProductImage />
      </CardHeader>
      {!hideDetails && (
        <>
          <CardContent className="p-0">
            <ProductDetails />
          </CardContent>
          <CardFooter className="p-3 border-t border-gray-100">
            {!hideAddToCart && <AddButton />}
          </CardFooter>
        </>
      )}
      <VariantDialog />
    </Card>
  )
}

export default ProductCard