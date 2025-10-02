'use client'

import { useState, useRef } from 'react'
import Image from 'next/image'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Thumbs, FreeMode, Zoom } from 'swiper/modules'
import type { Swiper as SwiperType } from 'swiper'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/thumbs'
import 'swiper/css/free-mode'
import 'swiper/css/zoom'
import { IIMage } from '@/types'

export default function ProductGallery({ images }: { images: IIMage[] }) {
  const [selectedImage, setSelectedImage] = useState(images[0]?.id || '')
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperType | null>(null)
  const mainSwiperRef = useRef<SwiperType | null>(null)

  // Navigation handlers
  const nextImage = () => mainSwiperRef.current?.slideNext()
  const prevImage = () => mainSwiperRef.current?.slidePrev()

  // Hover zoom state (desktop only)
  const [zoomStyle, setZoomStyle] = useState<React.CSSProperties>({})
  const [isZooming, setIsZooming] = useState(false)

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect()
    const x = ((e.clientX - left) / width) * 100
    const y = ((e.clientY - top) / height) * 100
    setZoomStyle({
      transformOrigin: `${x}% ${y}%`,
      transform: 'scale(2)', // desktop zoom factor
    })
  }

  return (
    <div className="flex h-full flex-col gap-4 lg:flex-row lg:h-[389px] mx-auto max-w-[498px]">
      {/* Thumbnails */}
      <div className="thumbnail h-[60px] scrollbar-hidden overflow-scroll order-2 lg:order-1 lg:h-full lg:w-[80px]">
        {images.length > 1 && (
          <div className="h-full flex lg:flex-col items-center gap-2">
            {images.map((img, index) => (
              <div
                key={img.url}
                className={`relative mb-2 h-[60px] w-[50px] cursor-pointer border ${
                  selectedImage === img.id ? 'border-blue-500' : 'border-transparent'
                }`}
                onMouseEnter={() => {
                  setSelectedImage(img.id)
                  mainSwiperRef.current?.slideTo(index)
                }}
              >
                <Image
                  src={img.url}
                  alt={img.alt || `Thumbnail ${index + 1}`}
                  fill
                  className="object-cover object-center"
                />
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Main Image */}
      <div className="main-image lg:w-20 flex-1 lg:order-2 bg-[black]/20">
        <div className="wrapper relative h-[380px] sm:h-[60vh] lg:h-full w-full">
          <Swiper
            onSwiper={(swiper) => (mainSwiperRef.current = swiper)}
            onSlideChange={(swiper) => {
              const currentImage = images[swiper.activeIndex]
              if (currentImage) {
                setSelectedImage(currentImage.id)
              }
            }}
            navigation={{
              nextEl: '.custom-next',
              prevEl: '.custom-prev',
            }}
            thumbs={{ swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null }}
            modules={[Navigation, Thumbs, FreeMode, Zoom]}
            zoom={{ maxRatio: 3 }} // ✅ enables pinch-to-zoom on mobile
            className="h-full group"
          >
            {images.map((img, index) => (
              <SwiperSlide key={img.url} zoom={true}>
                {/* ✅ Swiper zoom container for mobile pinch-to-zoom */}
                <div
                  className="swiper-zoom-container relative w-full h-full lg:h-[389px] cursor-zoom-in overflow-hidden"
                  // Desktop hover zoom
                  onMouseMove={handleMouseMove}
                  onMouseEnter={() => setIsZooming(true)}
                  onMouseLeave={() => {
                    setIsZooming(false)
                    setZoomStyle({})
                  }}
                >
                  <Image
                    src={img.url}
                    alt={img.alt || `Product Image ${index + 1}`}
                    fill
                    className={`object-cover object-center transition-transform duration-200 ${
                      isZooming ? 'lg:scale-150' : ''
                    }`}
                    style={isZooming ? zoomStyle : {}}
                  />
                </div>
              </SwiperSlide>
            ))}

            {/* Navigation Buttons */}
            {images.length > 1 && (
              <>
                <button
                  className="custom-prev absolute top-1/2 left-2 z-10 -translate-y-1/2 bg-white p-2 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  onClick={prevImage}
                >
                  &#8592;
                </button>
                <button
                  className="custom-next absolute top-1/2 right-2 z-10 -translate-y-1/2 bg-white p-2 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  onClick={nextImage}
                >
                  &#8594;
                </button>
              </>
            )}
          </Swiper>

          {/* Image Counter */}
          <div className="absolute bottom-3 z-40 bg-[black]/40 text-white rounded-lg right-4 flex justify-end px-4 py-1">
            <p>
              {mainSwiperRef.current ? mainSwiperRef.current.activeIndex + 1 : '1'} /{' '}
              {images.length}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
