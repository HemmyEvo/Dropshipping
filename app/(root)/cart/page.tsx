/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import BrowsingHistoryList from '@/components/shared/browsing-history-list'
import ProductPrice from '@/components/shared/product/product-price'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { useCartStore, type OrderItem } from '@/hooks/use-cart-store'
import { APP_NAME } from '@/lib/constants'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React from 'react'

export default function CartPage() {
  const { items, updateQuantity, removeItem } = useCartStore()
  const router = useRouter()

  // Calculate prices
  const itemsPrice = items.reduce(
    (acc: number, item: OrderItem) => acc + item.price * item.quantity,
    0
  )

  const shippingCost = items.reduce(
    (acc: number, item: OrderItem) => acc + (item.shippingInfo?.cost || 0),
    0
  )

  const totalPrice = itemsPrice + shippingCost

  return (
    <div className="min-h-screen bg-gray-100 p-4 md:p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-gray-800">Shopping Cart</h1>
          <span className="text-sm text-gray-600">{items.length} items</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main cart items */}
          <div className="lg:col-span-2">
            {items.length === 0 ? (
              <Card className="bg-white rounded-md shadow-sm border border-gray-200">
                <CardContent className="p-8 text-center">
                  <div className="mb-4">
                    <i className="fas fa-shopping-cart text-4xl text-orange-500"></i>
                  </div>
                  <h2 className="text-xl font-medium text-gray-800 mb-2">Your cart is empty</h2>
                  <p className="text-gray-600 mb-6">Start shopping to add items to your cart</p>
                  <Button 
                    onClick={() => router.push('/')}
                    className="bg-orange-500 hover:bg-orange-600 text-white rounded-md px-6 py-2"
                  >
                    Continue Shopping
                  </Button>
                </CardContent>
              </Card>
            ) : (
              <Card className="bg-white rounded-md shadow-sm border border-gray-200 overflow-hidden">
                <div className="bg-white border-b border-gray-200 px-6 py-3 flex items-center">
                  <div className="flex items-center mr-4">
                    <input type="checkbox" className="h-4 w-4 text-orange-500 border-gray-300 rounded" />
                    <span className="ml-2 text-sm text-gray-700">Select all</span>
                  </div>
                  <div className="flex-1"></div>
                  <div className="text-sm text-gray-600">Unit Price</div>
                  <div className="text-sm text-gray-600 ml-16">Quantity</div>
                  <div className="text-sm text-gray-600 ml-16">Subtotal</div>
                  <div className="text-sm text-gray-600 ml-16">Action</div>
                </div>

                <CardContent className="p-0">
                  {items.map((item: OrderItem) => (
                    <div key={item.clientId} className="border-b border-gray-200 last:border-0">
                      <div className="flex items-start p-4 md:p-6">
                        <div className="flex items-start flex-1">
                          <div className="flex items-center mr-4 mt-2">
                            <input type="checkbox" className="h-4 w-4 text-orange-500 border-gray-300 rounded" />
                          </div>
                          
                          <Link href={`/product/${item.slug}`} className="flex-shrink-0">
                            <div className="relative w-20 h-20 md:w-24 md:h-24 bg-white rounded border border-gray-200 overflow-hidden">
                              <Image
                                src={item.images[0].url}
                                alt={item.name}
                                fill
                                sizes="96px"
                                className="object-contain"
                              />
                            </div>
                          </Link>

                          <div className="ml-4 flex-1">
                            <Link
                              href={`/product/${item.slug}`}
                              className="text-sm md:text-base text-gray-800 hover:text-orange-500 line-clamp-2"
                            >
                              {item.name}
                            </Link>

                            {item.variant && item.variant.length > 0 && (
                              <div className="mt-2 flex flex-wrap gap-2">
                                {item.variant.map((v: any, i: number) => (
                                  <span
                                    key={i}
                                    className="text-xs text-gray-600 bg-gray-100 px-2 py-1 rounded"
                                  >
                                    {v.title}: {v.option}
                                  </span>
                                ))}
                              </div>
                            )}

                            <div className="mt-2 flex items-center text-xs text-gray-500">
                              <span className="text-green-600 mr-2">
                                <i className="fas fa-truck-fast mr-1"></i>
                                Free Shipping
                              </span>
                              <span>
                                <i className="fas fa-check-circle text-green-500 mr-1"></i>
                                In stock
                              </span>
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center space-x-8">
                          <div className="text-sm md:text-base font-medium text-gray-800 w-16 text-right">
                            <ProductPrice price={item.price} plain />
                          </div>

                          <div className="w-24">
                            <Select
                              value={item.quantity.toString()}
                              onValueChange={(value) =>
                                updateQuantity(item.clientId, Number(value))
                              }
                            >
                              <SelectTrigger className="h-8 w-full rounded border-gray-300 text-sm">
                                <SelectValue>Qty: {item.quantity}</SelectValue>
                              </SelectTrigger>
                              <SelectContent>
                                {Array.from({ length: item.countInStock }).map((_, i) => (
                                  <SelectItem key={i + 1} value={`${i + 1}`}>
                                    {i + 1}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>

                          <div className="text-sm md:text-base font-medium text-orange-500 w-20 text-right">
                            <ProductPrice price={item.price * item.quantity} plain />
                          </div>

                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-gray-400 hover:text-orange-500 hover:bg-orange-50 rounded-full h-8 w-8 p-0"
                            onClick={() => removeItem(item.clientId)}
                          >
                            <i className="fas fa-trash-alt"></i>
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            )}
          </div>

          {/* Order Summary */}
          {items.length > 0 && (
            <div className="lg:col-span-1">
              <Card className="bg-white rounded-md shadow-sm border border-gray-200 sticky top-6">
                <CardHeader className="text-lg font-semibold border-b border-gray-200 py-4">
                  Order Summary
                </CardHeader>
                <CardContent className="p-6">
                  <div className="space-y-4">
                    <div className="flex justify-between text-sm">
                      <span>Items ({items.length})</span>
                      <span className="font-medium">
                        <ProductPrice price={itemsPrice} plain />
                      </span>
                    </div>
                    
                    <div className="flex justify-between text-sm">
                      <span>Shipping</span>
                      <span className="font-medium">
                        {shippingCost > 0 ? (
                          <ProductPrice price={shippingCost} plain />
                        ) : (
                          <span className="text-green-600">Free</span>
                        )}
                      </span>
                    </div>
                    
                    <div className="pt-4 border-t border-gray-200">
                      <div className="flex justify-between text-lg font-bold">
                        <span>Total</span>
                        <span className="text-orange-500">
                          <ProductPrice price={totalPrice} plain />
                        </span>
                      </div>
                    </div>
                    
                    <Button
                      onClick={() => router.push('/checkout')}
                      className="w-full bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-md font-medium text-base"
                    >
                      Place Order
                    </Button>
                    
                    <div className="text-xs text-gray-500 pt-4 border-t border-gray-200">
                      By placing your order, you agree to our <a href="#" className="text-blue-500">Terms of Service</a>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <div className="mt-4 bg-white rounded-md shadow-sm border border-gray-200 p-4">
                <div className="flex items-center text-sm text-gray-600">
                  <i className="fas fa-shield-alt text-gray-400 mr-2"></i>
                  <span>Your order is protected by {APP_NAME} &apos;s Buyer Protection policy</span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Recently Viewed */}
        <div className="mt-10">
          <BrowsingHistoryList className="mt-6" />
        </div>
      </div>
    </div>
  )
}