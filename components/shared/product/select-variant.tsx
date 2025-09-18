'use client'

import { Button } from '@/components/ui/button'
import { IProductInput, VariantGroup } from '@/types'
import Link from 'next/link'
import Image from 'next/image'
import { useSearchParams } from 'next/navigation'
import { Separator } from '@/components/ui/separator'

export default function SelectVariant({
  product,
  variant
}: {
  product: IProductInput
  variant: VariantGroup
}) {
  const searchParams = useSearchParams()
  const selectedOption = searchParams.get(variant.title.toLowerCase()) || ''

  return (
    <>
      {variant && (
        <div className=" space-y-2">
          <div className="font-medium">{variant.title}:</div>
          <div className="flex flex-wrap gap-2">
            {variant.options.map((opt) => {
              // clone current params so we can preserve other selections
              const params = new URLSearchParams(searchParams.toString())
              params.set(variant.title.toLowerCase(), opt.label)

              return (
                <Button
                  asChild
                  key={opt.label}
                  variant="outline"
                  className={
                    selectedOption === opt.label
                      ? 'border-2 border-primary'
                      : 'border-2'
                  }
                >
                  <Link replace scroll={false} href={`?${params.toString()}`}>
                    {opt.image ? (
                      <Image
                        src={opt.image}
                        alt={opt.label}
                        width={40}
                        height={40}
                        className="rounded-md object-cover"
                      />
                    ) : (
                      opt.label
                    )}
                  </Link>
                </Button>
              )
            })}
          </div>
          <Separator className='my-4'/>
        </div>
      )}
    </>
  )
}
