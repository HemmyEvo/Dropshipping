'use client'

import { useState } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { IProductInput, VariantGroup, VariantOption } from '@/types'
import Image from "next/image"
import ProductPrice from "./product-price"
import { ShoppingCart, Truck, RotateCcw, Minus, Plus, X, Zap } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import SwatchSelector from './swatch-selector'

interface QuickViewModalProps {
  product: IProductInput
  open: boolean
  onOpenChange: (open: boolean) => void
}

const QuickViewModal = ({ product, open, onOpenChange }: QuickViewModalProps) => {
  const [selectedVariants, setSelectedVariants] = useState<Record<string, string>>({})
  const [quantity, setQuantity] = useState(1)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  const hasVariants = product.variant && product.variant.length > 0

  // Get selected variant option
  const getSelectedOption = (variantGroup: VariantGroup): VariantOption | undefined => {
    const selectedLabel = selectedVariants[variantGroup.title]
    return variantGroup.options.find(opt => opt.label === selectedLabel) || variantGroup.options[0]
  }

  // Calculate total price based on selected variants
  const calculateTotalPrice = (): number => {
    if (!hasVariants) return product.price * quantity
    
    let basePrice = product.price
    product.variant?.forEach(variantGroup => {
      const selectedOption = getSelectedOption(variantGroup)
      if (selectedOption?.price) {
        basePrice += selectedOption.price
      }
    })
    
    return basePrice * quantity
  }

  // Check if all variants are selected
  const allVariantsSelected = () => {
    if (!hasVariants) return true
    return product.variant?.every(variantGroup => selectedVariants[variantGroup.title])
  }

  // Handle variant selection
  const handleVariantSelect = (variantTitle: string, optionLabel: string) => {
    setSelectedVariants(prev => ({
      ...prev,
      [variantTitle]: optionLabel
    }))
  }

  // Handle quantity change
  const handleQuantityChange = (newQuantity: number) => {
    if (newQuantity >= 1 && newQuantity <= product.countInStock) {
      setQuantity(newQuantity)
    }
  }

  // Add to cart function
  const handleAddToCart = () => {
    const selectedOptions = hasVariants 
      ? product.variant?.map(variantGroup => ({
          title: variantGroup.title,
          option: getSelectedOption(variantGroup)
        }))
      : []

    const cartItem = {
      product: product.slug,
      name: product.name,
      price: calculateTotalPrice() / quantity, // Price per unit
      quantity,
      image: product.images[0].url,
      variants: selectedOptions,
      slug: product.slug
    }

    console.log('Adding to cart:', cartItem)
    // Here you would dispatch to your cart store
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto p-0">
        <DialogHeader className="p-6 pb-0">
          <DialogTitle className="flex justify-between items-center">
            <span>Quick View</span>
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={() => onOpenChange(false)}
              className="h-8 w-8"
            >
              <X className="h-4 w-4" />
            </Button>
          </DialogTitle>
        </DialogHeader>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-6">
          {/* Product Images */}
          <div className="space-y-4">
            <div className="relative aspect-square bg-gray-100 rounded-lg overflow-hidden">
              <Image
                src={product.images[currentImageIndex].url}
                alt={product.name}
                fill
                className="object-contain"
              />
              
              {/* Product badges */}
              <div className="absolute top-3 left-3 flex flex-col gap-2">
                {product.tags?.includes('todays-deal') && (
                  <Badge variant="destructive" className="px-2 py-1 font-bold">
                    <Zap className="h-3 w-3 mr-1" />
                    SALE
                  </Badge>
                )}
                {product.tags?.includes('new-arrival') && (
                  <Badge className="px-2 py-1 font-bold bg-blue-600">
                    NEW
                  </Badge>
                )}
              </div>
            </div>
            
            {/* Thumbnail gallery */}
            {product.images.length > 1 && (
              <div className="grid grid-cols-4 gap-2">
                {product.images.map((image, index) => (
                  <button
                    key={image.id}
                    className={`relative aspect-square bg-gray-100 rounded-md overflow-hidden border-2 ${
                      currentImageIndex === index ? 'border-blue-500' : 'border-transparent'
                    }`}
                    onClick={() => setCurrentImageIndex(index)}
                  >
                    <Image
                      src={image.url}
                      alt={product.name}
                      fill
                      className="object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>
          
          {/* Product Details */}
          <div className="space-y-6">
            <div>
              <p className="text-sm text-gray-500 uppercase tracking-wide">{product.brand}</p>
              <h2 className="text-2xl font-bold mt-1">{product.name}</h2>
              
              <div className="flex items-center mt-2">
                <ProductPrice 
                  price={calculateTotalPrice() / quantity} 
                  listPrice={product.listPrice}
                  isDeal={product.tags?.includes('todays-deal')}
                />
                <span className="text-sm text-gray-500 ml-2">/ unit</span>
              </div>
              
              {product.countInStock > 0 ? (
                <p className="text-green-600 text-sm mt-2">
                  In Stock ({product.countInStock} available)
                </p>
              ) : (
                <p className="text-red-600 text-sm mt-2">Out of Stock</p>
              )}
            </div>
            
            {/* Variant Selection */}
            {hasVariants && product.variant?.map((variantGroup, index) => (
              <div key={index} className="space-y-3">
                <Label className="text-sm font-medium">{variantGroup.title}</Label>
                
                {variantGroup.title.toLowerCase().includes('color') ? (
                  <SwatchSelector
                    colors={variantGroup.options.map(opt => opt.label)}
                    selectedColor={selectedVariants[variantGroup.title] || variantGroup.options[0].label}
                    onColorSelect={(color) => handleVariantSelect(variantGroup.title, color)}
                    size="md"
                  />
                ) : (
                  <RadioGroup
                    value={selectedVariants[variantGroup.title] || variantGroup.options[0].label}
                    onValueChange={(value) => handleVariantSelect(variantGroup.title, value)}
                    className="flex flex-wrap gap-2"
                  >
                    {variantGroup.options.map((option, optIndex) => (
                      <div key={optIndex} className="flex items-center space-x-2">
                        <RadioGroupItem 
                          value={option.label} 
                          id={`${variantGroup.title}-${optIndex}`}
                          className="sr-only"
                        />
                        <Label
                          htmlFor={`${variantGroup.title}-${optIndex}`}
                          className={`border rounded-md px-3 py-2 text-sm cursor-pointer transition-colors ${
                            selectedVariants[variantGroup.title] === option.label
                              ? 'border-blue-500 bg-blue-50 text-blue-700'
                              : 'border-gray-300 hover:border-gray-400'
                          }`}
                        >
                          {option.label}
                          {option.price > 0 && ` (+$${option.price})`}
                        </Label>
                      </div>
                    ))}
                  </RadioGroup>
                )}
              </div>
            ))}
            
            {/* Quantity Selector */}
            <div className="space-y-3">
              <Label className="text-sm font-medium">Quantity</Label>
              <div className="flex items-center border rounded-md w-fit">
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-10 w-10"
                  onClick={() => handleQuantityChange(quantity - 1)}
                  disabled={quantity <= 1}
                >
                  <Minus className="h-4 w-4" />
                </Button>
                <span className="w-10 text-center font-medium">{quantity}</span>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-10 w-10"
                  onClick={() => handleQuantityChange(quantity + 1)}
                  disabled={quantity >= product.countInStock}
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </div>
            
            {/* Total Price */}
            <div className="flex justify-between items-center pt-4 border-t">
              <span className="font-medium">Total:</span>
              <span className="text-xl font-bold">${calculateTotalPrice().toFixed(2)}</span>
            </div>
            
            {/* Action Buttons */}
            <div className="flex gap-3 pt-4">
              <Button 
                className="flex-1" 
                size="lg"
                onClick={handleAddToCart}
                disabled={product.countInStock === 0 || !allVariantsSelected()}
              >
                <ShoppingCart className="h-5 w-5 mr-2" />
                Add to Cart
              </Button>
              
              <Button variant="outline" size="lg" asChild>
                <a href={`/product/${product.slug}`}>View Details</a>
              </Button>
            </div>
            
            {/* Additional Info */}
            <div className="pt-4 border-t text-sm text-gray-600 space-y-2">
              <div className="flex items-center">
                <Truck className="h-4 w-4 mr-2" />
                <span>
                  {product.shippingInfo?.cost === 0 
                    ? 'Free shipping' 
                    : `Shipping: $${product.shippingInfo?.cost}`
                  }
                  {product.shippingInfo?.deliveryTime && ` • ${product.shippingInfo.deliveryTime}`}
                </span>
              </div>
              
              <div className="flex items-center">
                <RotateCcw className="h-4 w-4 mr-2" />
                <span>30-day return policy</span>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default QuickViewModal