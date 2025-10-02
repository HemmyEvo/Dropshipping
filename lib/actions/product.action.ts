/* eslint-disable @typescript-eslint/no-explicit-any */
'use server'

import { connectToDatabase } from '@/lib/db'
import { Product } from '@/lib/db/model/product.model'
import { IProductInput } from '@/types'
import { PAGE_SIZE } from '../constants'

export async function getAllCategories() {
  await connectToDatabase();
  
  // Get distinct category names
  const categories = await Product.find({ isPublished: true }).distinct('category.name');
  
  // Get all subcategories from the category objects
  const products = await Product.find({ isPublished: true }).select('category.subcategories');
  const allSubCategories = products.flatMap(product => 
    product.category?.subcategories || []
  );
  const subCategories = [...new Set(allSubCategories)]; // Remove duplicates
  
  return {
    categories: JSON.parse(JSON.stringify(categories)),
    subCategories: JSON.parse(JSON.stringify(subCategories))
  };
}

export async function getAllNav() {
  await connectToDatabase();
  
  // Get all products with published status
  const products = await Product.find({ isPublished: true }).select('category');
  
  // Group by category name and collect all subcategories
  const categoryMap = new Map();
  
  products.forEach(product => {
    if (product.category && product.category.name) {
      const categoryName = product.category.name;
      
      if (!categoryMap.has(categoryName)) {
        categoryMap.set(categoryName, {
          name: categoryName,
          subcategories: new Set()
        });
      }
      
      // Add subcategories if they exist
      if (product.category.subcategories && Array.isArray(product.category.subcategories)) {
        product.category.subcategories.forEach((subcat:any) => {
          if (subcat) {
            categoryMap.get(categoryName).subcategories.add(subcat);
          }
        });
      }
    }
  });
  
  // Convert to array and transform subcategories from Set to Array
  const categories = Array.from(categoryMap.values()).map(category => ({
    name: category.name,
    subcategories: Array.from(category.subcategories)
  }));
  
  return {
    categories: JSON.parse(JSON.stringify(categories))
  };
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
  
  const transformedProducts = products.map(product => ({
    name: product.name,
    href: `/product/${product.slug}`,
    image: product.images[0]?.url || '',
    price: product.price,
    listPrice: product.listPrice,
    category: product.category?.name || '', // Access category name
    subCategory: product.category?.subcategories?.[0] || '', // Access first subcategory
    brand: product.brand || '' // Brand is now a string
  }))
  
  return JSON.parse(JSON.stringify(transformedProducts))
}

export async function getProductBySlug(slug: string) {
  await connectToDatabase()
  
  // Use const instead of let since product is never reassigned
  const product = await Product.findOne({ slug, isPublished: true })
  
  if (!product) throw new Error('Product not found')
  
  // Convert to plain object and handle population manually if needed
  const productObj = product.toObject ? product.toObject() : product
  
  // If category and brand are ObjectIds, we might need to populate them
  // But for now, let's just return the basic product data
  return JSON.parse(JSON.stringify(productObj)) as IProductInput
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
  
  // Use the product's slug to exclude the current product
  const conditions: any = {
    isPublished: true,
    slug: { $ne: productId } // Exclude current product by slug
  }
  
  // Match by category name (now a string)
  conditions['category.name'] = category;
  
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


// Get products by subcategory
export async function getProductsBySubCategory({
  subCategory,
  limit = PAGE_SIZE,
  page = 1,
}: {
  subCategory: string
  limit?: number
  page: number
}) {
  await connectToDatabase()
  const skipAmount = (Number(page) - 1) * limit
  
  // Search for products that have this subcategory in their category.subcategories array
  const conditions = {
    isPublished: true,
    'category.subcategories': subCategory
  }
  
  const products = await Product.find(conditions)
    .sort({ createdAt: 'desc' })
    .skip(skipAmount)
    .limit(limit)
  const productsCount = await Product.countDocuments(conditions)
  return {
    data: JSON.parse(JSON.stringify(products)) as IProductInput[],
    totalPages: Math.ceil(productsCount / limit),
  }
}

