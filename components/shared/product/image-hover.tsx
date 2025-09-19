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
      className="relative bg-[black]/20 w-full h-52 "
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Default image */}
      {isHovered && (<div className='absolute transition ease-in-out bg-black/30 inset-0 z-20'/>)}
      {isHovered && (
        <div className='icon-section-left right-6 absolute z-30 top-3  py-3 px-2 rounded-full bg-black/30 hover:bg-black/50 cursor-pointer'>
          <Heart onClick={() => HandleAddToWishlist()} className={`'w-6 h-6 text-[#ffffffc9] ${isWishlistAdded ? 'fill-[red]' : '' }`}/>
          {href && 
          <Link href={href}>
          <Eye className='w-6 h-6 text-white mt-2'/>
          </Link>
          }
          
          </div>

      )}
      <Image
        src={src}
        alt={alt}
        fill
        className={`object-cover object-center transition-opacity duration-300 ${
          isHovered && hoverSrcs.length > 0 ? 'opacity-0' : 'opacity-100'
        }`}
      />  

      {/* Hover images */}
      {hoverSrcs.map((hoverSrc, index) => (
        <Image
          key={index}
          src={hoverSrc}
          alt={alt}
          fill
          sizes="80vw"
          className={`absolute inset-0 object-cover object-center transition-opacity duration-300 ${
            isHovered && index === currentHoverIndex
              ? 'opacity-100'
              : 'opacity-0'
          }`}
        />
      ))}
    </div>
  )
}

export default ImageHover
