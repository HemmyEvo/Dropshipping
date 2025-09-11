'use client'
import { ChevronDown, ChevronUp } from 'lucide-react'
import React, { useState } from 'react'

function Navbar() {
  const [toggleShop, setToggleShop] = useState(false)
  const Links = [
    {title:'Products', path:'/product'},
    {title:'Return & Refunds', path:'/returns'},
    {title:'Track Orders', path:'/track-orders'},
    {title:'Customer Services', path:'/customer-care'},
    
  ]
  return (
        <ul className='flex items-center pl-2 space-x-4 pr-2'>
          {toggleShop &&(
            <div className="flex absolute  px-2 py-4  bg-[white] shadow-2xl rounded-b-lg top-full">
              <div className='space-y-2 py-2 flex-col flex bg-[yellow]/25'>
                {Links.map((link,i) => {
                  return(          
                    <a className='w-full px-2 rounded py-1 shadow-lg bg-[#e9e9e9] hover:bg-black/20' href={link.path} key={i}>{link.title }</a>
                  )
                })}

              </div>
            </div>
          )}
      <li onClick={() => setToggleShop(prev => !prev)}  className='flex cursor-pointer items-center space-x-1'>
        <p>Shop</p>
        {!toggleShop ? <ChevronDown className='mt-1' /> : <ChevronUp className='mt-1' />}
      </li>
      <li className='cursor-pointer'>
        <a href="/search?tag=discount-sales">Discount Sales</a>
      </li>
      <li className='cursor-pointer'>
        <a href="/search?tag=new-arrivals">New Arrivals</a>
      </li>
      <li className='cursor-pointer'>
        <a href="/search?tag=brands">Brands</a>
      </li>
    </ul>
  )
}

export default Navbar