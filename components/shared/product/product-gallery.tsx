'use client'

import { useState, useRef, useEffect } from 'react'
import Image from 'next/image'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Thumbs, FreeMode } from 'swiper/modules'
import type { Swiper as SwiperType } from 'swiper'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/thumbs'
import 'swiper/css/free-mode'
import { IIMage } from '@/types'

export default function ProductGallery({ images }: { images: IIMage[] }) {
  const [selectedImage, setSelectedImage] = useState(0)
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperType | null>(null)
  const [isLightboxOpen, setIsLightboxOpen] = useState(false)
  const mainSwiperRef = useRef<SwiperType | null>(null)

  // Navigation handlers
  const nextImage = () => {
    if (mainSwiperRef.current) {
      mainSwiperRef.current.slideNext()
    }
  }

  const prevImage = () => {
    if (mainSwiperRef.current) {
      mainSwiperRef.current.slidePrev()
    }
  }

  // Keyboard navigation for lightbox
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isLightboxOpen) return
      
      if (e.key === 'Escape') {
        setIsLightboxOpen(false)
      } else if (e.key === 'ArrowRight') {
        nextImage()
      } else if (e.key === 'ArrowLeft') {
        prevImage()
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isLightboxOpen])

  // Disable body scroll when lightbox is open
  useEffect(() => {
    if (isLightboxOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'auto'
    }
    
    return () => {
      document.body.style.overflow = 'auto'
    }
  }, [isLightboxOpen])

  return (
    <div className="">
        <div className="thumbnail"></div>
        <div className="main-image"></div>
    </div>
  )
}




