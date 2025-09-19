
    import { getProductBySlug, getRelatedProductsByCategory } from '@/lib/actions/product.action'
   import SelectVariant from '@/components/shared/product/select-variant'
   import ProductPrice from '@/components/shared/product/product-price'
   import ProductGallery from '@/components/shared/product/product-gallery'
   import { Separator } from '@/components/ui/separator'
   import ProductSlider from '@/components/shared/product/product-slider'
import Rating from '@/components/shared/product/rating'
import { VariantGroup } from '@/types'
import Breadcrumb from '@/components/shared/product/bread-crumb'
import BrowsingHistoryList from '@/components/shared/browsing-history-list'
import AddToBrowsingHistory from '@/components/shared/product/add-to-browsing-history'

   export async function generateMetadata(props: {
     params: Promise<{ slug: string }>
   }) {
     const params = await props.params
     const product = await getProductBySlug(params.slug)
     if (!product) {
       return { title: 'Product not found' }
     }
     return {
       title: product.name,
       description: product.description,
     }
   }

   export default async function ProductDetails(props: {
     params: Promise<{ slug: string }>
     searchParams: Promise<{ page: string; color: string; size: string }>
   }) {
     const searchParams = await props.searchParams

     const { page } = searchParams

     const params = await props.params

     const { slug } = params

     const product = await getProductBySlug(slug)

     const relatedProducts = await getRelatedProductsByCategory({
       category: product.category,
       productId: product.sku,
       page: Number(page || '1'),
     })

     return (
       <div>
        <AddToBrowsingHistory slug={product.slug} category={product.category} />

      <Breadcrumb 
        customItems={[
          { label: 'Home', href: '/' },
          { label: 'Shop', href: '/shop' },
          { label: `${product.category}` , href: `/search?category=${product.category}` },
        ]}
      />


         <section className='mt-6 '>
           <div className='grid grid-cols-1 gap-4  md:grid-cols-2 '>


             <div className=' h-full  sm:px-1 md:px-10 w-full'>
               <ProductGallery images={product.images.map(img => img)} />
             </div>

             <div className='flex w-full  flex-col gap-2 '>
               <div className='flex flex-col gap-3'>
                
                 <h1 className=' font-floryanna font-bold text-lg lg:text-xl'>
                   {product.name}
                 </h1>
                 <div className='flex items-center gap-2'>
                   <span>{product.avgRating.toFixed(1)}</span>
                   <Rating rating={product.avgRating} />
                   <span>{product.numReviews} ratings</span>
                 </div>
                 <div className='flex flex-col gap-3 sm:flex-row sm:items-center'>
                   <div className='flex gap-3'>
                     <ProductPrice
                       price={product.price}
                       listPrice={product.listPrice}
                       isDeal={product.tags.includes('todays-deal')}
                       forListing={false}
                     />
                   </div>
                 </div>
                    <p className='p-medium-16  lg:p-regular-18'>
                   {product.description}
                 </p>
                 <Separator />
               </div>
                <div>
                {product.variant?.map((variant: VariantGroup) => (
                <SelectVariant key={variant.title} product={product} variant={variant} />
                ))}
                </div>

    
            
             </div> 
   
           </div>
         </section>

         <section className='mt-10'>
           <ProductSlider
             products={relatedProducts.data}
             title={`Best Sellers in ${product.category}`}
           />
         </section>

           <section>
     <BrowsingHistoryList className='mt-10' />
   </section>
       </div>
     )
   }