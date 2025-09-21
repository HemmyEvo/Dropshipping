'use client'

import { Button } from '@/components/ui/button'
import { IProductInput, VariantGroup } from '@/types'
import Image from 'next/image'
import { useSearchParams, useRouter } from 'next/navigation'
import { Separator } from '@/components/ui/separator'
import { useEffect, useState } from 'react'

export default function SelectVariant({
  product,
  variant,
  onChangeVariant,
}: {
  product: IProductInput
  variant: VariantGroup
  onChangeVariant: (variant: Record<string, string>) => void
}) {
  const searchParams = useSearchParams()
  const router = useRouter()

  // initial selected option → from params or default to first
  const initial =
    searchParams.get(variant.title.toLowerCase()) || variant.options[0]?.label || ''
  const [selectedOption, setSelectedOption] = useState(initial)

  // sync with parent
  useEffect(() => {
    if (selectedOption) {
      onChangeVariant({ [variant.title]: selectedOption })
    }
  }, [selectedOption, onChangeVariant, variant.title])

  const handleSelectOption = (option: string) => {
    setSelectedOption(option)

    // update the URL shallowly (no reload)
    const params = new URLSearchParams(searchParams.toString())
    params.set(variant.title.toLowerCase(), option)
    router.replace(`?${params.toString()}`, { scroll: false })
  }

  return (
    <>
      {variant && (
        <div className="space-y-2">
          <div className="font-medium">{variant.title}:</div>
          <div className="flex flex-wrap gap-2">
            {variant.options.map((opt) => {
              const isSelected = selectedOption === opt.label

              return (
                <Button
                  key={opt.label}
                  type="button"
                  variant="outline"
                  className={`
                    flex items-center justify-center transition-all duration-200
                    ${opt.image ? 'w-12 h-12 rounded-md' : 'rounded-full px-4 py-2'}
                    ${isSelected ? 'border-2 border-primary bg-primary/10' : 'border'}
                  `}
                  onClick={() => handleSelectOption(opt.label)}
                >
                  {opt.image ? (
                    <Image
                      src={opt.image.url}
                      alt={opt.label}
                      width={40}
                      height={40}
                      className="rounded-md object-cover"
                    />
                  ) : (
                    <span className={`text-sm ${isSelected ? 'font-semibold text-primary' : ''}`}>
                      {opt.label}
                    </span>
                  )}
                </Button>
              )
            })}
          </div>
          <Separator className="my-4" />
        </div>
      )}
    </>
  )
}
