// BrandsSection.jsx
import React from 'react'
import VERSACE from '../../../assets/Group.png'
import ZARA from '../../../assets/zara-logo-1 1.png'
import GUCCI from '../../../assets/gucci-logo-1 1.png'
import PRADA from '../../../assets/prada-logo-1 1.png'
import CALVIN_KLEIN from '../../../assets/Group (1).png'
import Image from 'next/image'
function BrandsSection() {
    const BrandImages =[VERSACE,ZARA,GUCCI,PRADA,CALVIN_KLEIN]
  return (
    <div className="bg-black py-6">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16">
          {BrandImages.map((image,i) => <Image src={image} key={i} width={100} height={100} priority alt='Brand Images'  />)}
        </div>
      </div>
    </div>
  )
}

export default BrandsSection