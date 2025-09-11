'use client'
import { APP_NAME } from '@/lib/constants'
import {  APP_SLOGAN } from '@/lib/constants'
import image1 from '../../../assets/Badge.png'
import image2 from '../../../assets/Badge (1).png'
import image3 from '../../../assets/Badge (2).png'
import image4 from '../../../assets/Badge (3).png'
import image5 from '../../../assets/Badge (4).png'
import Link from 'next/link'
import { useState } from 'react'
import { EnvelopeIcon } from '@heroicons/react/24/outline' // Install with: npm install @heroicons/react
import { Github, Instagram, LucideFacebook, MailWarning, Twitter } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Image from 'next/image'

const allLinks = {
  Company: [
    { title: 'Products', path: '/product' },
    { title: 'Return & Refunds', path: '/returns' },
    { title: 'Track Orders', path: '/track-orders' },
    { title: 'Customer Services', path: '/customer-care' },
  ],
  Help: [
    { title: 'Products', path: '/product' },
    { title: 'Return & Refunds', path: '/returns' },
    { title: 'Track Orders', path: '/track-orders' },
    { title: 'Customer Services', path: '/customer-care' },
  ],
  FAQ: [
    { title: 'Products', path: '/product' },
    { title: 'Return & Refunds', path: '/returns' },
    { title: 'Track Orders', path: '/track-orders' },
    { title: 'Customer Services', path: '/customer-care' },
  ],
}

const images = [image1,image2,image3, image4,image5]

export default function Footer() {
  const [email, setEmail] = useState('')
  const error = false;
  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Subscribed with:', email)
    setEmail('')
  }

  return (
    // bg-[#F0F0F0]
    <footer className="bg-[#F0F0F0]">
      <div className="wrapper  px-2 md:px-0   md:w-5/6 mx-auto">


      {/* NewsLetter  */}
      <div className="newsletter-wrapper max-h-[128px] w-full sm:max-h-[85px] ">
              <div className="bg-black -translate-y-1/2  flex-col sm:flex-row gap-4 text-[#F0F0F0] rounded-xl shadow-xl px-7 py-5 flex items-center  ">
      {/* text container  */}
      <div className=" sm:w-1/2">
        <h1 className='text-2xl font-integral max-w-prose font-extrabold uppercase break-words'>Stay up to date about our latest Offers</h1>
      </div>
      

      {/* Input field  */}
      <div className="flex flex-col w-full gap-4  sm:justify-center sm:items-center sm:w-1/2">
        {/* Email field  */}
        <div className="email-cont w-[90%] ">

        <div className=" flex items-center bg-[#F0F0F0] rounded-3xl space-x-2 px-5 py-2">
        <EnvelopeIcon className='w-5 h-5 text-black'/>
        <input className='text-black flex-1 outline-none placeholder:text-black py-1' type="text" placeholder='Enter your email address' />
        </div>
        {
          error &&(
              <div className="error pl-6 flex space-x-2 items-center">
                <MailWarning className='text-destructive w-4 h-4'/>
                <p className='text-destructive text-sm'>Please enter a valid mail</p>
              </div>
          )
        }
        
        </div>


        {/* Subscribe Button  */}
        <Button className='w-[90%] bg-[#F0f0f0] hover:bg-[#f0f0f0]/90 cursor-pointer text-black text-md font-normal  py-6 rounded-3xl'>
          Subscribe to Newsletter 
        </Button>
      </div>

      </div>
      </div>


      {/* Middle of the footer  */}
      <div className="flex flex-col space-y-7 py-6  border-b-2 lg:flex-row  ">
        {/* Logo and slogan  */}
        <div className="logo_slogan h-full flex flex-col space-y-3 ">
        <h1 className='font-semibold text-lg'>{APP_NAME}</h1>
        <p className='lg:max-w-[18rem] text-[black]/60 text-sm'> {APP_SLOGAN}</p>

        <div className="flex space-x-5">
          <div className="flex justify-center border-2  hover:bg-black hover:text-white items-center cursor-pointer p-1 rounded-full bg-white">
          <Twitter />
          </div>
          <div className="flex justify-center border-2 hover:bg-black hover:text-white transition-all ease-in-out items-center cursor-pointer p-1 rounded-full bg-white">
          <LucideFacebook />
          </div>
          <div className="flex justify-center border-2 hover:bg-black hover:text-white transition-all ease-in-out items-center cursor-pointer p-1 rounded-full bg-white">    
          <Instagram />
          </div>
          <div className="flex justify-center border-2 hover:bg-black hover:text-white transition-all ease-in-out items-center cursor-pointer p-1 rounded-full bg-white">
             <Github />
          </div>

       
        </div>
        </div>

        {/* Links  */}
        <div className="links px-1 flex-1 grid grid-cols-2 md:grid-cols-3 gap-5 lg:grid-cols-4">
          
            <div className="company">
              <h1 className='text-md font-semibold'>Company</h1>
              {allLinks.Company.map((link,i) => <div className="py-1 mt-2 text-sm text-[black]/60" key={i}><a href={link.path}>{link.title}</a></div>)}
            </div>
            <div className="company">
              <h1 className='text-md font-semibold'>Help</h1>
              {allLinks.Help.map((link,i) => <div className="py-1 mt-2 text-sm text-[black]/60" key={i}><a href={link.path}>{link.title}</a></div>)}
            </div>
            <div className="company">
              <h1 className='text-md font-semibold'>FAQ</h1>
              {allLinks.Company.map((link,i) => <div className="py-1 mt-2 text-sm text-[black]/60" key={i}><a href={link.path}>{link.title}</a></div>)}
            </div>
            <div className="company">
              <h1 className='text-md font-semibold'>Resources</h1>
              {allLinks.Company.map((link,i) => <div className="py-1 mt-2 text-sm text-[black]/60" key={i}><a href={link.path}>{link.title}</a></div>)}
            </div>
         
          
        </div>
      </div>

      
      {/* Bottom of the footer  */}
      <div className="flex justify-between flex-col sm:flex-row items-center py-4">
        <div>
          <p className='text-sm text-[black]/60'>{APP_NAME} &copy; 2025 | All Rights Reserved</p>
          </div>
        <div className="flex space-x-2 md:space-x-3">
          {images.map((image,i) => <Image src={image} key={i} width={50} height={50} alt='payment images' />)}
        </div>
      </div>
      </div>
    </footer>

  )
}
