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
import React, { useState } from 'react'

export default function CartPage() {
  const { items, updateQuantity, removeItem, clearCart } = useCartStore()
  const router = useRouter()
  const [selectedItems, setSelectedItems] = useState<Set<string>>(new Set())

  // Toggle selection of all items
  const toggleSelectAll = () => {
    if (selectedItems.size === items.length) {
      setSelectedItems(new Set())
    } else {
      setSelectedItems(new Set(items.map(item => item.clientId)))
    }
  }

  // Toggle selection of individual item
  const toggleItemSelection = (clientId: string) => {
    const newSelectedItems = new Set(selectedItems)
    if (newSelectedItems.has(clientId)) {
      newSelectedItems.delete(clientId)
    } else {
      newSelectedItems.add(clientId)
    }
    setSelectedItems(newSelectedItems)
  }

  // Delete selected items
  const deleteSelectedItems = () => {
    selectedItems.forEach(clientId => removeItem(clientId))
    setSelectedItems(new Set())
  }

  // Calculate prices for selected items only
  const selectedItemsArray = items.filter(item => selectedItems.has(item.clientId))
  const itemsToCalculate = selectedItems.size > 0 ? selectedItemsArray : items

  const itemsPrice = itemsToCalculate.reduce(
    (acc: number, item: OrderItem) => acc + item.price * item.quantity,
    0
  )

  const shippingCost = itemsToCalculate.reduce(
    (acc: number, item: OrderItem) => acc + (item.shippingInfo?.cost || 0),
    0
  )

  const totalPrice = itemsPrice + shippingCost

  return (
    <div className="min-h-screen bg-gray-100 px-2 py-4 sm:p-4 md:p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 gap-2">
          <h1 className="text-xl sm:text-2xl font-bold text-gray-800">Shopping Cart</h1>
          <div className="flex items-center justify-between sm:justify-end gap-4">
            <span className="text-sm text-gray-600">{items.length} items</span>
            {items.length > 0 && selectedItems.size > 0 && (
              <Button
                variant="outline"
                size="sm"
                onClick={deleteSelectedItems}
                className="text-red-500 border-red-200 hover:bg-red-50 h-8"
              >
                <i className="fas fa-trash-alt mr-1"></i>
                Delete ({selectedItems.size})
              </Button>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6">
          {/* Main cart items */}
          <div className="lg:col-span-2">
            {items.length === 0 ? (
              <Card className="bg-white rounded-md shadow-sm border border-gray-200">
                <CardContent className="p-6 sm:p-8 text-center">
                  <div className="mb-4">
                    <i className="fas fa-shopping-cart text-4xl text-orange-500"></i>
                  </div>
                  <h2 className="text-lg sm:text-xl font-medium text-gray-800 mb-2">Your cart is empty</h2>
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
                <div className="bg-white border-b border-gray-200 px-4 py-3 flex items-center">
                  <div className="flex items-center mr-2 sm:mr-4">
                    <input 
                      type="checkbox" 
                      className="h-4 w-4 text-orange-500 border-gray-300 rounded focus:ring-orange-500"
                      checked={selectedItems.size === items.length && items.length > 0}
                      onChange={toggleSelectAll}
                    />
                    <span className="ml-2 text-sm text-gray-700 hidden xs:inline">Select all</span>
                  </div>
                  <div className="flex-1"></div>
                  <div className="text-sm text-gray-600 hidden md:block">Unit Price</div>
                  <div className="text-sm text-gray-600 ml-4 md:ml-8 lg:ml-16">Quantity</div>
                  <div className="text-sm text-gray-600 ml-4 md:ml-8 lg:ml-16 hidden sm:block">Subtotal</div>
                  <div className="text-sm text-gray-600 ml-4 md:ml-8 lg:ml-16 hidden xs:block">Action</div>
                </div>

                <CardContent className="p-0">
                  {items.map((item: OrderItem) => (
                    <div key={item.clientId} className="border-b border-gray-200 last:border-0">
                      <div className="flex items-start p-3 sm:p-4 md:p-6">
                        <div className="flex items-start flex-1 min-w-0">
                          <div className="flex items-center mr-2 sm:mr-4 mt-1 sm:mt-2">
                            <input 
                              type="checkbox" 
                              className="h-4 w-4 text-orange-500 border-gray-300 rounded focus:ring-orange-500"
                              checked={selectedItems.has(item.clientId)}
                              onChange={() => toggleItemSelection(item.clientId)}
                            />
                          </div>

                          <Link href={`/product/${item.slug}`} className="flex-shrink-0">
                            <div className="relative w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 bg-white rounded border border-gray-200 overflow-hidden">
                              <Image
                                src={item.images[0].url}
                                alt={item.name}
                                fill
                                sizes="(max-width: 640px) 64px, (max-width: 768px) 80px, 96px"
                                className="object-contain"
                              />
                            </div>
                          </Link>

                          <div className="ml-2 sm:ml-4 flex-1 min-w-0">
                            <Link
                              href={`/product/${item.slug}`}
                              className="text-sm md:text-base text-gray-800 hover:text-orange-500 line-clamp-2"
                            >
                              {item.name}
                            </Link>

                            {item.variant && item.variant.length > 0 && (
                              <div className="mt-1 sm:mt-2 flex flex-wrap gap-1">
                                {item.variant.map((v: any, i: number) => (
                                  <span
                                    key={i}
                                    className="text-xs text-gray-600 bg-gray-100 px-1.5 py-0.5 rounded"
                                  >
                                    {v.title}: {v.option}
                                  </span>
                                ))}
                              </div>
                            )}

                            <div className="mt-1 sm:mt-2 flex flex-wrap items-center text-xs text-gray-500 gap-1 sm:gap-2">
                              {item.shippingInfo?.cost === 0 ? (
                                <span className="text-green-600">
                                  <i className="fas fa-truck-fast mr-1"></i>
                                  Free Shipping
                                </span>
                              ) : (
                                <span className="text-gray-600">
                                  <i className="fas fa-truck mr-1"></i>
                                  Shipping: <ProductPrice price={item.shippingInfo?.cost || 0} plain />
                                </span>
                              )}
                              <span className="flex items-center">
                                <i className="fas fa-check-circle text-green-500 mr-1"></i>
                                In stock
                              </span>
                            </div>

                            {/* Mobile price and quantity */}
                            <div className="mt-2 flex flex-col sm:hidden gap-2">
                              <div className="flex items-center justify-between">
                                <span className="text-sm font-medium text-gray-800">Price:</span>
                                <span className="text-sm font-medium text-gray-800">
                                  <ProductPrice price={item.price} plain />
                                </span>
                              </div>
                              
                              <div className="flex items-center justify-between">
                                <span className="text-sm font-medium text-gray-800">Quantity:</span>
                                <div className="w-20">
                                  <Select
                                    value={item.quantity.toString()}
                                    onValueChange={(value) =>
                                      updateQuantity(item.clientId, Number(value))
                                    }
                                  >
                                    <SelectTrigger className="h-8 w-full rounded border-gray-300 text-xs">
                                      <SelectValue>{item.quantity}</SelectValue>
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
                              </div>
                              
                              <div className="flex items-center justify-between border-t pt-2">
                                <span className="text-sm font-medium text-gray-800">Subtotal:</span>
                                <span className="text-sm font-medium text-orange-500">
                                  <ProductPrice price={item.price * item.quantity} plain />
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="hidden sm:flex items-center space-x-4 md:space-x-8">
                          <div className="text-sm md:text-base font-medium text-gray-800 w-16 text-right">
                            <ProductPrice price={item.price} plain />
                          </div>

                          <div className="w-20 md:w-24">
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
                            aria-label="Remove item"
                          >
                            <i className="fas fa-trash-alt text-sm"></i>
                          </Button>
                        </div>

                        {/* Mobile delete button */}
                        <div className="sm:hidden ml-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-gray-400 hover:text-orange-500 hover:bg-orange-50 rounded-full h-8 w-8 p-0"
                            onClick={() => removeItem(item.clientId)}
                            aria-label="Remove item"
                          >
                            <i className="fas fa-trash-alt text-sm"></i>
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            )}
          </div>

          {/* Order Summary - Fixed alignment */}
          {items.length > 0 && (
            <div className="lg:col-span-1">
              <Card className="bg-white rounded-md shadow-sm border border-gray-200 sticky top-4 sm:top-6">
                <CardHeader className="text-base sm:text-lg font-semibold border-b border-gray-200 py-3 sm:py-4">
                  Order Summary
                </CardHeader>
                <CardContent className="p-4 sm:p-6">
                  <div className="space-y-3 sm:space-y-4">
                    <div className="flex justify-between text-sm">
                      <span>Items ({selectedItems.size > 0 ? selectedItems.size : items.length})</span>
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

                    <div className="pt-3 sm:pt-4 border-t border-gray-200">
                      <div className="flex justify-between text-base sm:text-lg font-bold">
                        <span>Total</span>
                        <span className="text-orange-500">
                          <ProductPrice price={totalPrice} plain />
                        </span>
                      </div>
                    </div>

                    <Button
                      onClick={() => router.push('/checkout')}
                      className="w-full bg-orange-500 hover:bg-orange-600 text-white py-2 sm:py-3 rounded-md font-medium text-sm sm:text-base"
                      disabled={selectedItems.size > 0 && itemsToCalculate.length === 0}
                    >
                      {selectedItems.size > 0 ? 'Place Order for Selected Items' : 'Place Order'}
                    </Button>

                    <div className="text-xs text-gray-500 pt-3 sm:pt-4 border-t border-gray-200">
                      By placing your order, you agree to our <a href="#" className="text-blue-500 hover:underline">Terms of Service</a>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <div className="mt-4 bg-white rounded-md shadow-sm border border-gray-200 p-3 sm:p-4">
                <div className="flex items-center text-xs sm:text-sm text-gray-600">
                  <i className="fas fa-shield-alt text-gray-400 mr-2"></i>
                  <span>Your order is protected by {APP_NAME}&apos;s Buyer Protection policy</span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Recently Viewed */}
        <div className="mt-8 sm:mt-10">
          <BrowsingHistoryList className="mt-4 sm:mt-6" />
        </div>
      </div>
    </div>
  )
}