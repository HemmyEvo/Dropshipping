'use client'
import { APP_NAME } from '@/lib/constants'
import {  APP_SLOGAN } from '@/lib/constants'

import Link from 'next/link'
import { useState } from 'react'
import { EnvelopeIcon } from '@heroicons/react/24/outline' // Install with: npm install @heroicons/react
import { MailWarning } from 'lucide-react'
import { Button } from '@/components/ui/button'

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
      <div className="wrapper -translate-y-1/2 md:w-5/6 mx-auto">


      {/* NewsLetter  */}
      <div className="bg-black flex-col sm:flex-row gap-4 text-[#F0F0F0] rounded-4xl shadow-xl px-7 py-5 flex items-center  ">
      {/* text container  */}
      <div className=" sm:w-1/2">
        <h1 className='text-2xl max-w-prose font-extrabold uppercase break-words'>Stay upto date about our latest Offers</h1>
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


      {/* Middle of the footer  */}
      <div className="py-9">
        {/* Logo and slogan  */}
        <div className="logo_slogan">
        <h1>{APP_NAME}</h1>
        <p className='max-w-prose'> {APP_SLOGAN}</p>
        </div>
      </div>

      </div>
    </footer>

  )
}
