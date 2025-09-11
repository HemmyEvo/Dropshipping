import { APP_NAME } from '@/lib/constants'
   import Link from 'next/link'
   import Menu from './menu'
   import { Button } from '@/components/ui/button'
   import { AlignLeftIcon, MenuIcon } from 'lucide-react'
   import data from '@/lib/data'
   import SearchComponent from './search'
import Notifications from './notification'
import Navbar from './navbar'

   export default function Header() {
     return (
       <header>
        {/* Notifications  */}
        <Notifications />

        {/* Main header  */}
         <div className='px-1 py-2 md:px-1 lg:px-8 items-center relative bg-white'>

           <div className='flex items-center justify-between'>

             <div className='flex items-center'>
                <div className="menu-bar md:hidden mr-2">
                <AlignLeftIcon className='h-6 cursor-pointer w-6' />
                </div>
               <Link
                 href='/'
                 className='flex items-center font-integral header-button font-semibold tracking-wide text-xl m-1 '
               >
               
                 {APP_NAME}
               </Link>
             </div>
          
             <div className='hidden  md:flex items-center flex-1 max-w-4xl'>
                <Navbar />
               <SearchComponent />
             </div>
             <div >
             <Menu />
             </div>

           </div>  

         </div>
        
       </header>
     )
   }