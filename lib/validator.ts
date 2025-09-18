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
  image: z.string().optional(),
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
  date: z.date()
})

// Helper function to validate ObjectId strings
const objectIdSchema = z.string().refine((value) => Types.ObjectId.isValid(value), {
  message: 'Invalid ObjectId format'
})

export const ProductInputSchema = z.object({
  name: z.string().min(3, 'Name must be at least 3 characters'),
  slug: z.string().min(3, 'Slug must be at least 3 characters'),
  sku: z.string().min(1, 'Sku is required'),
  category: z.string().min(1, 'Category is required'), 
  categoryUrl: z.string().optional(),
  images: z.array(imageSchema).min(1, 'Product must have at least one image'),
  brand: z.string().min(1, 'Brand is required'), 
  description: z.string().min(1, 'Description is required'),
  price: Price('Price'),
  listPrice: Price('List price').optional(),
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
  variant: z.array(variantGroupSchema).optional(),
  tags: z.array(z.string()).default([]),
  ratingDistribution: z.array(ratingDistributionSchema).optional(),
  reviews: z.array(reviewSchema).optional(),
  shippingInfo: shippingInfoSchema,
  material: z.string().optional(),
  sourceUrl: z.string().url("Source Url must be a valid Url")
})

// Transform schema that converts string IDs to ObjectIds
export const ProductInputWithObjectIdsSchema = ProductInputSchema.transform((data) => ({
  ...data,
  category: new Types.ObjectId(data.category),
  brand: new Types.ObjectId(data.brand),
  // If user field in reviews should also be ObjectId:
  reviews: data.reviews?.map(review => ({
    ...review,
    user: new Types.ObjectId(review.user)
  }))
}))