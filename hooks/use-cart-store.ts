import { create } from "zustand"
import { persist, createJSONStorage } from "zustand/middleware"

type Variant = { [key: string]: string }

type Image = {
  id: string
  url: string
  alt?: string
}

export type OrderItem = {
  clientId: string
  product: string
  name: string
  slug: string
  shippingInfo?: {
    deliveryTime: string
    shippingFrom: string
    cost: number
  }
  category: string
  quantity: number
  countInStock: number
  images: Image[]
  price: number
  variant?: Variant[]
}

// ✅ Helpers
function normalizeVariant(variant?: Variant[]) {
  return variant?.map((v) =>
    Object.fromEntries(
      Object.entries(v).map(([k, v]) => [k.toLowerCase(), v.toLowerCase()])
    )
  )
}

function isSameVariant(a?: Variant[], b?: Variant[]) {
  if (!a && !b) return true
  if (!a || !b) return false
  if (a.length !== b.length) return false

  return a.every((v1, i) => {
    const v2 = b[i]
    return (
      Object.keys(v1).length === Object.keys(v2).length &&
      Object.entries(v1).every(([k, v]) => v2[k] === v)
    )
  })
}

// ✅ Store types
interface CartState {
  items: OrderItem[]
  addItem: (item: OrderItem, quantity: number) => Promise<string>
  removeItem: (clientId: string) => Promise<void>
  updateQuantity: (clientId: string, quantity: number) => Promise<void>
  clearCart: () => Promise<void>
}

// ✅ Zustand store with persistence
export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],

      addItem: async (item, quantity) => {
        console.log("[Cart] Adding item:", { item, quantity })
        const { items } = get()

        const existingItem = items.find(
          (x) =>
            x.product === item.product &&
            isSameVariant(normalizeVariant(x.variant), normalizeVariant(item.variant))
        )

        let updatedItems: OrderItem[]

        if (existingItem) {
          console.log("[Cart] Item already exists, updating quantity")
          updatedItems = items.map((x) =>
            x.product === item.product &&
            isSameVariant(normalizeVariant(x.variant), normalizeVariant(item.variant))
              ? { ...x, quantity: x.quantity + quantity }
              : x
          )
        } else {
          console.log("[Cart] New item, adding")
          updatedItems = [
            ...items,
            { ...item, clientId: crypto.randomUUID(), quantity },
          ]
        }

        set({ items: updatedItems })
        console.log("[Cart] Updated cart items:", updatedItems)

        const clientId = updatedItems.find(
          (x) =>
            x.product === item.product &&
            isSameVariant(normalizeVariant(x.variant), normalizeVariant(item.variant))
        )?.clientId

        if (!clientId) {
          console.error("[Cart] ERROR: clientId not found after addItem")
          throw new Error("Failed to resolve clientId for added item")
        }

        console.log("[Cart] Returning clientId:", clientId)
        return clientId
      },

      removeItem: async (clientId) => {
        console.log("[Cart] Removing item:", clientId)
        const { items } = get()
        const updatedItems = items.filter((x) => x.clientId !== clientId)
        set({ items: updatedItems })
        console.log("[Cart] Updated cart items:", updatedItems)
      },

      updateQuantity: async (clientId, quantity) => {
        console.log("[Cart] Updating quantity:", { clientId, quantity })
        const { items } = get()
        const updatedItems = items.map((x) =>
          x.clientId === clientId ? { ...x, quantity } : x
        )
        set({ items: updatedItems })
        console.log("[Cart] Updated cart items:", updatedItems)
      },

      clearCart: async () => {
        console.log("[Cart] Clearing cart")
        set({ items: [] })
        console.log("[Cart] Cart is now empty")
      },
    }),
    {
      name: "cart-storage", // ✅ localStorage key
      storage: createJSONStorage(() => localStorage),
    }
  )
)
