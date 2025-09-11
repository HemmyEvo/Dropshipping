import Image from 'next/image'
import React from 'react'
import HeroImage from '../../../assets/HeroImage.png'
import HeroStar from '../../../assets/HeroStar.png'
import { Button } from '@/components/ui/button'


function Hero() {
  return (
    <div className='bg-[#F2F0F1]   md:h-[70vh]  '>
        <div className="wrapper md:w-5/6 mx-auto px-4 grid py-4 md:py-0 h-full gap-10 md:grid-cols-2">

        <div className="text-cont flex justify-center items-center ">
            <div className="space-y-3">
                <h1 className='text-4xl font-bold font-integral md:max-w-xs'>FIND CLOTHES THAT MATCHES YOUR STYLE</h1>
                <p className='text-sm text-[black]/60'>Browse through our diverse range of meticulously crafted garments, designed to bring out your individuality and cater to your sense of style.</p>
                <div className="button">
                    <Button className='bg-black'>
                        Shop Now
                    </Button>
                </div>
            </div>
        </div>
        <div className="image-cont w-full h-full transition-all ease-in-out min-h-[300px]  relative">
            <div className="image-wrapper lg:w-2/3 mx-auto h-full bg-[green]">
            <Image src={HeroStar} height={60} width={60} priority={true} className='object-contain absolute right-2/8 -top-2 md:top-10 z-30  md:right-1/8 object-center' alt='HeroImage' />
            <Image src={HeroImage}  priority={true} className='object-cover h-full w-full object-center' alt='HeroImage' />
            <Image src={HeroStar} height={40} width={40} priority={true} className='object-contain absolute top-5/12 z-30 left-1/8 object-center' alt='HeroImage' />
            </div>

        </div>
        </div>
    </div>
  )
}

export default Hero