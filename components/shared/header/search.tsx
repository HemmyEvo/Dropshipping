import { SearchIcon } from 'lucide-react'
import { Input } from '@/components/ui/input'

   export default  function SearchComponent() {

     return (
       <form
         action='/search'
         method='GET'
         className='flex flex-1  items-stretch '
       >
        <div className="rounded-full flex-1 overflow-hidden py-1 space-x-3 bg-[#F0F0F0] items-center px-3  flex">

        <SearchIcon className='w-4 h-4 bg-transparent' />
        
         <Input
           className='flex-1 rounded-none outline-none border-none focus-visible:border-none text-black text-base h-full'
           placeholder={`Search for Products...`}
           name='q'
           type='search'
         />
      
        </div>
       </form>
     )
   }