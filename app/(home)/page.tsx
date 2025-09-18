/* eslint-disable @typescript-eslint/no-explicit-any */
import BrandsSection from "@/components/shared/home/brand_section";
import Hero from "@/components/shared/home/hero";
import OurHappyCustomers from "@/components/shared/home/testimonial";

import {
  TextDivider,
  LineDivider,
  OrnamentalDivider,
  GradientDivider,
  DottedDivider,
  SectionDivider,
  WaveDivider,
  ZigzagDivider,
  CurvedDivider,
  CustomShapeDivider,
  IconDivider,
  DoubleLineDivider
} from '@/components/shared/div-divider';
import {ProductShowcase} from '@/components/shared/product/productShowcase';
import { getAllCategories, getProductsForCard,getProductsByTag } from "@/lib/actions/product.action";
import { toSlug } from "@/lib/utils";
import { Card, CardContent } from "@/components/ui/card";
import ProductSlider from "@/components/shared/product/product-slider";

// Sample images for dress styles


export default async function Page() {
  const categories = (await getAllCategories()).slice(0, 4);
  const newArrivals = await getProductsForCard({
    tag: 'new-arrival',
    limit: 4,
  });
  const todaysDeals = await getProductsByTag({ tag: 'todays-deal' })
  const bestSellingProducts = await getProductsByTag({ tag: 'best-seller' })
     const featureds = await getProductsForCard({
       tag: 'featured',
       limit: 4,
     })
     const bestSellers = await getProductsForCard({
       tag: 'best-seller',
       limit: 4,
     })
   const cards = [
       {
         title: 'Categories to explore',
         link: {
           text: 'See More',
           href: '/search',
         },
         items: categories.map((category:any) => ({
           name: category,
           image: `/images/${toSlug(category)}.jpg`,
           href: `/search?category=${category}`,
         })),
       },
       {
         title: 'Explore New Arrivals',
         items: newArrivals,
         link: {
           text: 'View All',
           href: '/search?tag=new-arrival',
         },
       },
       {
         title: 'Discover Best Sellers',
         items: bestSellers,
         link: {
           text: 'View All',
           href: '/search?tag=new-arrival',
         },
       },
       {
         title: 'Featured Products',
         items: featureds,
         link: {
           text: 'Shop Now',
           href: '/search?tag=new-arrival',
         },
       },
     ]


  // Transform categories to match the expected format for BrowseByDressStyle
  const dressStyles = categories.slice(0, 4).map((category:any, index:number) => ({
   
    name: category || `Category ${index + 1}`,
    image: `/images/${toSlug(category)}.jpg` ,
    link: `/search?category=${category || `category-${index + 1}`}`
  }));
 console.log('Rendering Home Page with categories:', dressStyles);
  return (
    <div>
      <Hero />
      <BrandsSection />

      {/* New Arrivals Section */}
      <ProductShowcase 
       cards={cards}
      />
       <Card className='w-full  rounded-none'>
          <CardContent className='p-4 items-center gap-3'>
            <ProductSlider title={"Today's Deals"} products={todaysDeals} />
          </CardContent>
        </Card>

          <Card className='w-full rounded-none'>
       <CardContent className='p-4 items-center gap-3'>
         <ProductSlider
           title='Best Selling Products'
           products={bestSellingProducts}
           hideDetails
         />
       </CardContent>
     </Card>
      {/* Browse By Dress Style Section */}
      {/* <BrowseByDressStyle styles={dressStyles}/> */}

      <OurHappyCustomers />
    </div>
  );
}