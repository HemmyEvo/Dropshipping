/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import { Button } from '@/components/ui/button'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

import { useCartStore } from '@/hooks/use-cart-store'
import { useToast } from '@/hooks/use-toast'
import { OrderItem } from '@/types'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

export default function AddToCart({
  item,
  minimal = false,
}: {
  item: OrderItem
  minimal?: boolean
}) {
  const router = useRouter()
  const { toast } = useToast()
  const { addItem } = useCartStore()

  const [quantity, setQuantity] = useState(1)
  const [isLoading, setIsLoading] = useState(false)

  const normalizeItem = () => ({
    ...item,
    variant: item.variant?.map((v: any) => ({
      ...v,
      option: typeof v.option === 'string' ? v.option : v.option.label,
    })),
  })

  const handleAddToCart = async (q: number, redirectToCheckout = false) => {
    setIsLoading(true)
    try {
      await addItem(normalizeItem(), q)

      if (redirectToCheckout) {
        router.push('/checkout')
      } else {
        toast({
          description: 'Added to Cart',
        })
      }
    } catch (error: any) {
      toast({
        variant: 'destructive',
        description: error.message || 'Something went wrong',
      })
    } finally {
      setIsLoading(false)
    }
  }

  return minimal ? (
    <Button
      className="rounded-full cursor-pointer w-auto"
      onClick={() => handleAddToCart(1)}
      disabled={isLoading}
    >
      {isLoading ? 'Adding…' : 'Add to Cart'}
    </Button>
  ) : (
    <div className="w-full space-y-2">
      <Select
        value={quantity.toString()}
        onValueChange={(i) => setQuantity(Number(i))}
      >
        <SelectTrigger>
          <SelectValue>Quantity: {quantity}</SelectValue>
        </SelectTrigger>
        <SelectContent position="popper">
          {Array.from({ length: item.countInStock }).map((_, i) => (
            <SelectItem key={i + 1} value={`${i + 1}`}>
              {i + 1}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Button
        className="rounded-full cursor-pointer w-full"
        type="button"
        disabled={isLoading}
        onClick={() => handleAddToCart(quantity)}
      >
        {isLoading ? 'Adding…' : 'Add to Cart'}
      </Button>

      <Button
        variant="secondary"
        disabled={isLoading}
        onClick={() => handleAddToCart(quantity, true)}
        className="w-full rounded-full"
      >
        Buy Now
      </Button>
    </div>
  )
}
