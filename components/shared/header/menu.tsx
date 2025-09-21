'use client'
import { Search, ShoppingCartIcon, UserCircle2 } from 'lucide-react'
import Link from 'next/link'
import { useState } from 'react'
import SearchComponent from './search'
import useIsMounted from '@/hooks/use-is-mounted'
import { cn } from '@/lib/utils'
import { useCartStore, type OrderItem } from '@/hooks/use-cart-store'

export default function Menu() {
  const [toggleSearch, setToggleSearch] = useState(false)
  const isMounted = useIsMounted()

  // ✅ directly access items
  const { items } = useCartStore()

  // ✅ typed reduce
  const cartItemsCount = items.reduce(
    (a: number, c: OrderItem) => a + c.quantity,
    0
  )

  return (
    <div className="flex justify-end">
      {toggleSearch && (
        <div className="absolute p-2 md:hidden left-0 right-0 top-full bg-white">
          <SearchComponent />
        </div>
      )}
      <nav className="flex items-center gap-3 w-full">
        <Search
          onClick={() => setToggleSearch((prev) => !prev)}
          className="h-6 w-6 md:hidden cursor-pointer"
        />
        <Link href="/cart" className="relative">
          <ShoppingCartIcon className="h-5 w-5" />
              {isMounted && cartItemsCount > 0 && (
            <span
              className={cn(
                `absolute -top-2 -right-2 h-4 w-4 rounded-full bg-purple-600 text-xs text-white flex items-center justify-center`,
                cartItemsCount >= 10 && 'text-[10px] px-0'
              )}
            >
              {cartItemsCount > 99 ? '99+' : cartItemsCount}
            </span>
          )}
        </Link>
        <Link href="/account" className="header-button">
          <UserCircle2 className="h-6 w-6" />
        </Link>
      </nav>
    </div>
  )
}
