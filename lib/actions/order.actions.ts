import { z } from 'zod'
import { round2 } from '../utils'
import { CartSchema, OrderItemSchema, shippingInfoSchema } from '../validator'

// ✅ Helper: validate and calculate
export const calcDeliveryDateAndPrice = async ({
  items,
  deliveryDateIndex,
  shippingInfo,
}: {
  items: z.infer<typeof OrderItemSchema>[]
  deliveryDateIndex?: number
  shippingInfo?: z.infer<typeof shippingInfoSchema>
}) => {
  // Validate items first
  const parsedItems = z.array(OrderItemSchema).parse(items)

  const itemsPrice = round2(
    parsedItems.reduce((acc, item) => acc + item.price * item.quantity, 0)
  )

  const shippingPrice = shippingInfo ? round2(shippingInfo.cost) : 0
  const taxPrice = round2(itemsPrice * 0.15)
  const totalPrice = round2(itemsPrice + shippingPrice + taxPrice)

  // Delivery date (example: deliveryDateIndex is days from today)
  let expectedDeliveryDate: Date | undefined = undefined
  if (deliveryDateIndex !== undefined) {
    expectedDeliveryDate = new Date()
    expectedDeliveryDate.setDate(expectedDeliveryDate.getDate() + deliveryDateIndex)
  }

  // Validate full cart against CartSchema
  const cart = CartSchema.parse({
    items: parsedItems,
    itemsPrice,
    shippingPrice,
    totalPrice,
    deliveryDateIndex,
    expectedDeliveryDate,
  })

  return cart
}
