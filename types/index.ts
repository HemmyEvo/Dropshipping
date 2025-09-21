import { CartSchema, imageSchema, OrderItemSchema, packageDimensionSchema, ProductInputSchema, ratingDistributionSchema, reviewSchema, shippingInfoSchema, variantGroupSchema, variantOptionSchema } from "@/lib/validator";
import z from "zod";

export type IProductInput = z.infer<typeof ProductInputSchema>
export type VariantGroup = z.infer<typeof variantGroupSchema>
export type VariantOption = z.infer<typeof variantOptionSchema>
export type IIMage = z.infer<typeof imageSchema>
export type IReview = z.infer<typeof reviewSchema>
export type IRatingDistribution = z.infer<typeof ratingDistributionSchema>
export type ShippingInfo = z.infer<typeof shippingInfoSchema>
export type PackageDimensions = z.infer<typeof packageDimensionSchema>
 export type OrderItem = z.infer<typeof OrderItemSchema>
   export type Cart = z.infer<typeof CartSchema>
export type Data = {
      products: IProductInput[]
      headerMenus: {
        name: string
        href: string
      }[]
      carousels: {
        image: string
        url: string
        title: string
        buttonCaption: string
        isPublished: boolean
      }[]
    }