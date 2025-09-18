'use server'

import { connectToDatabase } from '@/lib/db'
import {  Product }  from '@/lib/db/model/product.model'
import { IProductInput } from '@/types'
import { PAGE_SIZE } from '../constants'

export async function getAllCategories() {
  await connectToDatabase()
  
  // If categories are stored as names directly in products
  const categories = await Product.find({ isPublished: true }).distinct('category')
  
  // If categories are ObjectIds but you don't have a Category model,
  // you might need to store category names elsewhere or use a different approach
  return JSON.parse(JSON.stringify(categories))
}

   export async function getProductsByTag({
     tag,
     limit = 10,
   }: {
     tag: string
     limit?: number
   }) {
     await connectToDatabase()
     const products = await Product.find({
       tags: { $in: [tag] },
       isPublished: true,
     })
       .sort({ createdAt: 'desc' })
       .limit(limit)
     return JSON.parse(JSON.stringify(products)) as IProductInput[]
   }


export async function getProductsForCard({
  tag,
  limit = 4,
}: {
  tag: string
  limit?: number
}) {
  await connectToDatabase()
  
  const products = await Product.find(
    { tags: { $in: [tag] }, isPublished: true }
  )
  .select({
    name: 1,
    slug: 1,
    images: { $slice: 1 },
    price: 1,
    listPrice: 1,
    category: 1, 
    brand: 1     
  })
  .sort({ createdAt: 'desc' })
  .limit(limit)
  .lean()
  
  // You'll need to handle the ObjectIds for category and brand
  // Either convert them to strings or fetch the actual names if possible
  const transformedProducts = products.map(product => ({
    name: product.name,
    href: `/product/${product.slug}`,
    image: product.images[0]?.url || '',
    price: product.price,
    listPrice: product.listPrice,
    category: product.category?.toString() || '', // Convert ObjectId to string
    brand: product.brand?.toString() || ''        // Convert ObjectId to string
  }))
  
  return JSON.parse(JSON.stringify(transformedProducts))
}

 export async function getProductBySlug(slug: string) {
     await connectToDatabase()
     const product = await Product.findOne({ slug, isPublished: true })
     if (!product) throw new Error('Product not found')
     return JSON.parse(JSON.stringify(product)) as IProductInput
   }
   // GET RELATED PRODUCTS: PRODUCTS WITH SAME CATEGORY
   export async function getRelatedProductsByCategory({
     category,
     productId,
     limit = PAGE_SIZE,
     page = 1,
   }: {
     category: string
     productId: string
     limit?: number
     page: number
   }) {
     await connectToDatabase()
     const skipAmount = (Number(page) - 1) * limit
     const conditions = {
       isPublished: true,
       category,
       sku: {$ne: productId}
     }
     const products = await Product.find(conditions)
       .sort({ numSales: 'desc' })
       .skip(skipAmount)
       .limit(limit)
     const productsCount = await Product.countDocuments(conditions)
     return {
       data: JSON.parse(JSON.stringify(products)) as IProductInput[],
       totalPages: Math.ceil(productsCount / limit),
     }
   }