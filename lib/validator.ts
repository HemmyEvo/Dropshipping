import { z } from 'zod'
import { Types } from 'mongoose'
import { formatNumberWithDecimal } from './utils'

// Common
const Price = (field: string) =>
  z.coerce
    .number()
    .refine(
      (value) => /^\d+(\.\d{2})?$/.test(formatNumberWithDecimal(value)),
      `${field} must have exactly two decimal places (e.g., 49.99)`
    )

export const imageSchema = z.object({
  id: z.string(),
  url: z.string().url(),
  alt: z.string().optional()
})

export const variantOptionSchema = z.object({
  label: z.string(),
  price: z.number().positive(),
  listPrice: z.number().positive().optional(),
  stock: z.number().nonnegative(),
  image: imageSchema.optional(),
  sku: z.string().optional()
})

export const variantGroupSchema = z.object({
  title: z.string(),
  options: z.array(variantOptionSchema)
})

export const packageDimensionSchema = z.object({
  length: z.number().positive(),
  height: z.number().positive(),
  width: z.number().positive(),
  weight: z.number().positive(),
})

export const shippingInfoSchema = z.object({
  deliveryTime: z.string(),
  shippingFrom: z.string(),
  cost: z.number().nonnegative(),
  freeShippingThreshold: z.number().nonnegative().optional(), // Added free shipping threshold
  packageDimensions: packageDimensionSchema
})

export const ratingDistributionSchema = z.object({
  rating: z.number().min(1).max(5),
  count: z.number().nonnegative()
})

export const reviewSchema = z.object({
  id: z.string(),
  user: z.string(), // This should also be converted to ObjectId if it references a User
  rating: z.number().min(1).max(5),
  comment: z.string().optional(),
  date: z.date(),
  verifiedPurchase: z.boolean().default(false),
  helpful: z.number().nonnegative().default(0)
})

// Buy X Get Y promotion schema
export const buyXGetYPromotionSchema = z.object({
  buy: z.number().positive(), // Buy X items
  get: z.number().positive(), // Get Y items free
  appliesTo: z.enum(['same', 'different']).default('same'), // Applies to same product or different
  freeProductId: z.string().optional(), // If appliesTo is 'different', specify product ID
  maxApplications: z.number().positive().optional(), // Maximum times this promotion can be applied
})

// Helper function to validate ObjectId strings
const objectIdSchema = z.string().refine((value) => Types.ObjectId.isValid(value), {
  message: 'Invalid ObjectId format'
})

export const ProductInputSchema = z.object({
  name: z.string().min(3, 'Name must be at least 3 characters'),
  slug: z.string().min(3, 'Slug must be at least 3 characters'),
  sku: z.string().min(1, 'Sku is required'),
 category: z.object({
  name: z.string().min(1, 'Category name is required'),
  subcategories: z.array(z.string()).optional(),
}),
brand: z.string().min(1, 'Brand is required'),
  
  categoryUrl: z.string().optional(),
  images: z.array(imageSchema).min(1, 'Product must have at least one image'),

  description: z.string().min(1, 'Description is required'),
  shortDescription: z.string().optional(),
  price: Price('Price'),
  listPrice: Price('List price').optional(),
  discountPercentage: z.number().min(0).max(100).optional(),
  countInStock: z.coerce
    .number()
    .int()
    .nonnegative('count in stock must be a non-negative number'),
  numReviews: z.coerce
    .number()
    .int()
    .nonnegative('Number of reviews must be a non-negative number')
    .default(0),
  avgRating: z.coerce
    .number()
    .min(0, 'Average rating must be at least 0')
    .max(5, 'Average rating must be at most 5')
    .default(0),
  numSales: z.coerce
    .number()
    .int()
    .nonnegative('Number of sales must be a non-negative number')
    .default(0),
  isPublished: z.boolean().default(false),
  isFeatured: z.boolean().default(false),
  variant: z.array(variantGroupSchema).optional(),
  tags: z.array(z.string()).default([]),
  ratingDistribution: z.array(ratingDistributionSchema).optional(),
  reviews: z.array(reviewSchema).optional(),
  shippingInfo: shippingInfoSchema,
  material: z.string().optional(),
  weight: z.string().optional(),
  dimensions: z.string().optional(),
  careInstructions: z.string().optional(),
  sourceUrl: z.string().url("Source Url must be a valid Url"),
  specifications: z.record(z.string(), z.any()).optional(),
  metaTitle: z.string().optional(),
  metaDescription: z.string().optional(),
  relatedProducts: z.array(objectIdSchema).optional(),
  seoKeywords: z.array(z.string()).optional(),
  // Promotional conditions
  freeShippingThreshold: z.number().nonnegative().optional(), // Global free shipping threshold
  buyXGetY: buyXGetYPromotionSchema.optional(), // Buy X Get Y promotion
})

// Transform schema that converts string IDs to ObjectIds
export const ProductInputWithObjectIdsSchema = ProductInputSchema.transform((data) => ({
  ...data,
  // If user field in reviews should also be ObjectId:
  reviews: data.reviews?.map(review => ({
    ...review,
    user: new Types.ObjectId(review.user)
  })),
  relatedProducts: data.relatedProducts?.map(id => new Types.ObjectId(id)),
  // Convert freeProductId to ObjectId if it exists
  buyXGetY: data.buyXGetY ? {
    ...data.buyXGetY,
    freeProductId: data.buyXGetY.freeProductId ? new Types.ObjectId(data.buyXGetY.freeProductId) : undefined
  } : undefined
}))

export const selectedVariantSchema = z.object({
  title: z.string(),
  option: variantOptionSchema // ✅ only one chosen option
})

export const OrderItemSchema = z.object({
     clientId: z.string().min(1, 'clientId is required'),
     product: z.string().min(1, 'Product is required'),
     name: z.string().min(1, 'Name is required'),
     slug: z.string().min(1, 'Slug is required'),
     category: z.string().min(1, 'Category is required'),
     subCategory: z.string().optional(),
     shippingInfo: shippingInfoSchema.optional(), 
     quantity: z
       .number()
       .int()
       .nonnegative('Quantity must be a non-negative number'),
     countInStock: z
       .number()
       .int()
       .nonnegative('Quantity must be a non-negative number'),
     images: z.array(imageSchema).min(1, 'Product must have at least one image'),
     price: Price('Price'),
      variant: z.array(selectedVariantSchema).optional(),
   })

   export const CartSchema = z.object({
     items: z
       .array(OrderItemSchema)
       .min(1, 'Order must contain at least one item'),
     itemsPrice: z.number(),

     shippingInfo: shippingInfoSchema.optional(), 
     shippingPrice: z.optional(z.number()),
     totalPrice: z.number(),
     paymentMethod: z.optional(z.string()),
     deliveryDateIndex: z.optional(z.number()),
     expectedDeliveryDate: z.optional(z.date()),
   })