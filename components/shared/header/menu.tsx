'use client'
import { Search, ShoppingCartIcon, UserCircle2 } from 'lucide-react'
import Link from 'next/link'
import { useState } from 'react'
import SearchComponent from './search'


   export default function Menu() {
    const [toggleSearch, setToggleSearch] = useState(false)

     return (
       <div className='flex justify-end'>
        {toggleSearch && (
            <div className="absolute p-2 md:hidden left-0 right-0 top-full bg-white">
               <SearchComponent />
            </div>
        )}
         <nav className='flex  items-center gap-3 w-full'>
            <Search onClick={() => setToggleSearch(prev => !prev)} className='h-6 w-6 md:hidden cursor-pointer' />
           <Link href='/cart' className='header-button'>
             <ShoppingCartIcon className='h-6 w-6' />
           </Link>
           <Link href='/cart' className='header-button'>
            
             <UserCircle2 className='h-6 w-6' />
           </Link>

         </nav>
       </div>
     )
   }