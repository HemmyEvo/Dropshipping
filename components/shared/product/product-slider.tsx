 'use client'

   import * as React from 'react'
   import {
     Carousel,
     CarouselContent,
     CarouselItem,
     CarouselNext,
     CarouselPrevious,
   } from '@/components/ui/carousel'
   import ProductCard from './product-card'
import { IProductInput } from '@/types'

   export default function ProductSlider({
     title,
     products,
     hideDetails = false,
   }: {
     title?: string
     products: IProductInput[]
     hideDetails?: boolean
   }) {
     return (
       <div className='w-full  bg-background'>
         <h2 className='font-bold text-2xl lg:text-3xl text-center mb-5 capitalize font-integral '>{title}</h2>
      <Carousel
        opts={{
          align: 'start',
        }}
        className='w-full'
      >
        <CarouselContent className='gap-4 px-4 md:px-8 lg:px-12'>
          {products.map((product) => (
            <CarouselItem
              key={product.slug}
              className={
                hideDetails
                  ? 'border overflow-hidden rounded-3xl pl-0 basis-full sm:basis-1/2 md:basis-1/3 lg:basis-1/4 xl:basis-1/5'
                  : 'bg-primary/10 shadow border overflow-hidden rounded-3xl pl-0 basis-full sm:basis-1/2 md:basis-1/2 lg:basis-1/3 xl:basis-1/4'
              }
            >
              <ProductCard
                hideDetails={hideDetails}
                hideAddToCart
                hideBorder
                product={product}
              />
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className='left-0' />
        <CarouselNext className='right-0' />
      </Carousel>
       </div>
     )
   }