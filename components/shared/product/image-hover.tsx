'use client'
import { Eye, Heart } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useState, useEffect, useRef } from 'react'

const ImageHover = ({
  src,
  hoverSrcs = [],
  alt,
  href
}: {
  src: string
  hoverSrcs?: string[]
  alt: string
  href?: string
}) => {
  const [isHovered, setIsHovered] = useState(false)
  const [currentHoverIndex, setCurrentHoverIndex] = useState(0)
  const [isWishlistAdded, setIsWishlistAdded] = useState(false);
  const hoverTimeout = useRef<NodeJS.Timeout | null>(null)
  const hoverInterval = useRef<NodeJS.Timeout | null>(null)

  const handleMouseEnter = () => {
    hoverTimeout.current = setTimeout(() => {
      setIsHovered(true)
      if (hoverSrcs.length > 0) {
        hoverInterval.current = setInterval(() => {
          setCurrentHoverIndex(prev => (prev + 1) % hoverSrcs.length)
        }, 1000) // cycle like AliExpress
      }
    }, 300) // delay before hover starts
  }

  const handleMouseLeave = () => {
    if (hoverTimeout.current) clearTimeout(hoverTimeout.current)
    if (hoverInterval.current) clearInterval(hoverInterval.current)
    setIsHovered(false)
    setCurrentHoverIndex(0)
  }

  const HandleAddToWishlist = () => {
    // Add your logic to add the product to the wishlist here
    console.log('Added to wishlist');
    setIsWishlistAdded(prev => !prev);
  }

  useEffect(() => {
    return () => {
      if (hoverTimeout.current) clearTimeout(hoverTimeout.current)
      if (hoverInterval.current) clearInterval(hoverInterval.current)
    }
  }, [])

  return (
    <div
      className="relative bg-white w-full h-48 md:h-56 overflow-hidden"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Default image */}
      <Link href={href || '#'} className="block h-full">
        <Image
          src={src}
          alt={alt}
          fill
          sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
          className={`object-contain p-3 transition-opacity duration-300 ${
            isHovered && hoverSrcs.length > 0 ? 'opacity-0' : 'opacity-100'
          }`}
        />
      </Link>

      {/* Hover images */}
      {hoverSrcs.map((hoverSrc, index) => (
        <Link key={index} href={href || '#'} className="block h-full">
          <Image
            src={hoverSrc}
            alt={alt}
            fill
            sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
            className={`absolute inset-0 object-contain p-3 transition-opacity duration-300 ${
              isHovered && index === currentHoverIndex
                ? 'opacity-100'
                : 'opacity-0'
            }`}
          />
        </Link>
      ))}
      
      {/* Action buttons (appear on hover) */}
      {isHovered && (
        <div className='absolute z-30 top-2 right-2 flex flex-col gap-2'>
          <button 
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              HandleAddToWishlist();
            }}
            className="w-8 h-8 flex items-center justify-center rounded-full bg-white shadow-md hover:bg-gray-50 transition-colors"
          >
            <Heart className={`w-4 h-4 ${isWishlistAdded ? 'fill-red-500 text-red-500' : 'text-gray-600'}`}/>
          </button>
          
          {href && (
            <Link 
              href={href}
              className="w-8 h-8 flex items-center justify-center rounded-full bg-white shadow-md hover:bg-gray-50 transition-colors"
            >
              <Eye className='w-4 h-4 text-gray-600'/>
            </Link>
          )}
        </div>
      )}
      
      {/* Hover overlay */}
      {isHovered && (
        <div className='absolute inset-0 bg-black/10 z-20'/>
      )}
    </div>
  )
}

export default ImageHover