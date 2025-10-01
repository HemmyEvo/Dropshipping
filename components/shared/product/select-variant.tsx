/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import { Button } from '@/components/ui/button'
import { IProductInput, VariantGroup } from '@/types'
import Image from 'next/image'
import { Separator } from '@/components/ui/separator'
import { useCallback, useEffect, useState } from 'react'

export default function SelectVariant({

  variant,
  onChangeVariant,
}: {
  product: IProductInput
  variant: VariantGroup
  onChangeVariant: (variant: Record<string, any>) => void
}) {
  // Initialize with the first option
  const [selectedOption, setSelectedOption] = useState(variant.options[0])

  // Memoize the onChangeVariant callback to prevent unnecessary re-renders
  const stableOnChangeVariant = useCallback(onChangeVariant, [])

  // Sync with parent when selected option changes - only when selectedOption actually changes
  useEffect(() => {
    if (selectedOption) {
      stableOnChangeVariant({ 
        [variant.title]: {
          label: selectedOption.label,
          price: selectedOption.price || 0,
          stock: selectedOption.stock || 0,
          listPrice: selectedOption.listPrice,
          image: selectedOption.image,
          sku: selectedOption.sku
        }
      })
    }
  }, [selectedOption, stableOnChangeVariant, variant.title])

  const handleSelectOption = (option: typeof variant.options[0]) => {
    // Only update if it's a different option
    if (selectedOption.label !== option.label) {
      setSelectedOption(option)
    }
  }

  // Find the option object by label for comparison
  const isOptionSelected = (option: typeof variant.options[0]) => {
    return selectedOption.label === option.label
  }

  return (
    <>
      {variant && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="font-medium text-gray-900">{variant.title}:</div>
            {selectedOption && (
              <div className="text-sm text-gray-600">
                Selected: <span className="font-semibold text-primary">{selectedOption.label}</span>
                {selectedOption.price > 0 && (
                  <span className="ml-2 text-green-600">
                    (+${selectedOption.price.toFixed(2)})
                  </span>
                )}
              </div>
            )}
          </div>
          
          <div className="flex flex-wrap gap-3">
            {variant.options.map((opt) => {
              const isSelected = isOptionSelected(opt)
              const isOutOfStock = (opt.stock || 0) <= 0

              return (
                <Button
                  key={opt.label}
                  type="button"
                  variant="outline"
                  disabled={isOutOfStock}
                  className={`
                    relative flex items-center cursor-pointer justify-center transition-all duration-200
                    ${opt.image ? 'w-14 h-14 rounded-lg' : 'rounded-lg px-4 py-3 min-w-14'}
                    ${isSelected 
                      ? 'border-2 border-primary bg-primary/5 shadow-sm' 
                      : 'border border-gray-300 hover:border-gray-400'
                    }
                    ${isOutOfStock 
                      ? 'opacity-50 cursor-not-allowed grayscale' 
                      : 'hover:shadow-md'
                    }
                  `}
                  onClick={() => !isOutOfStock && handleSelectOption(opt)}
                >
                  {opt.image ? (
                    <div className="relative cursor-pointer w-10 h-10">
                      <Image
                        src={opt.image.url}
                        alt={opt.label}
                        fill
                        className="rounded-md object-cover"
                        sizes="40px"
                      />
                      {isSelected && (
                        <div className="absolute -top-1 -right-1 w-4 h-4 bg-primary rounded-full flex items-center justify-center">
                          <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        </div>
                      )}
                    </div>
                  ) : (
                    <span className={`
                      text-sm font-medium
                      ${isSelected ? 'text-primary' : 'text-gray-700'}
                      ${isOutOfStock ? 'line-through' : ''}
                    `}>
                      {opt.label}
                    </span>
                  )}
                  
                  {/* Out of stock overlay */}
                  {isOutOfStock && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-full h-px bg-gray-400 rotate-45 transform origin-center"></div>
                    </div>
                  )}
                </Button>
              )
            })}
          </div>

          {/* Option details */}
          {selectedOption && (
            <div className="text-sm text-gray-600 space-y-1">
              {selectedOption.price > 0 && (
                <div>Additional cost: <span className="font-semibold text-green-600">+${selectedOption.price.toFixed(2)}</span></div>
              )}
              {selectedOption.stock !== undefined && (
                <div>
                  Stock: {' '}
                  <span className={`font-semibold ${
                    selectedOption.stock > 10 ? 'text-green-600' : 
                    selectedOption.stock > 0 ? 'text-yellow-600' : 'text-red-600'
                  }`}>
                    {selectedOption.stock > 10 ? 'In Stock' : 
                     selectedOption.stock > 0 ? `Only ${selectedOption.stock} left` : 'Out of Stock'}
                  </span>
                </div>
              )}
            </div>
          )}
          
          <Separator className="my-2" />
        </div>
      )}
    </>
  )
}