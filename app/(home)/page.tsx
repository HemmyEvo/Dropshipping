import BrandsSection from "@/components/shared/home/brand_section";
import Hero from "@/components/shared/home/hero";
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
import ProductShowcase from '@/components/shared/product/productShowcase';
    export default async function Page() {
const newArrivals = [
  {
    id: 1,
    name: "T-shirt with Tape Details",
    price: 120,
    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80",
    rating: 4,
    reviewCount: 86
  },
  {
    id: 2,
    name: "Skinny Fit Jeans",
    price: 240,
    originalPrice: 260,
    image: "https://images.unsplash.com/photo-1542272604-787c3835535d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80",
    rating: 5,
    reviewCount: 142
  },
  {
    id: 3,
    name: "Checkered Shirt",
    price: 180,
    image: "https://images.unsplash.com/photo-1598033129183-c4f50c736f10?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80",
    rating: 3,
    reviewCount: 54
  },
  {
    id: 4,
    name: "Striped T-shirt",
    price: 130,
    originalPrice: 160,
    image: "https://images.unsplash.com/photo-1503341504253-dff4815485f1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80",
    rating: 4,
    reviewCount: 120
  }
];

const topSelling = [
  {
    id: 5,
    name: "Vertical Striped Shirt",
    price: 212,
    originalPrice: 232,
    image: "https://images.unsplash.com/photo-1618354691373-d851c5c3a990?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80",
    rating: 5,
    reviewCount: 210
  },
  {
    id: 6,
    name: "Courage Graphic T-shirt",
    price: 145,
    image: "https://images.unsplash.com/photo-1523381294911-8d3cead13475?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80",
    rating: 4,
    reviewCount: 98
  },
  {
    id: 7,
    name: "Lease Fit Bermuda Shorts",
    price: 80,
    image: "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80",
    rating: 3,
    reviewCount: 45
  },
  {
    id: 8,
    name: "Faded Skinny Jeans",
    price: 210,
    image: "https://images.unsplash.com/photo-1582418702059-97ebafb35d09?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80",
    rating: 5,
    reviewCount: 167
  }
];
      return (
        <div>
          <Hero />
          <BrandsSection />
<CustomShapeDivider className="rotate-180 bg-[black]/60"/>



     {/* New Arrivals Section */}
      <ProductShowcase 
        title="NEW ARRIVALS"
        viewAllPath="/new-arrivals"
        products={newArrivals}
      />
<ZigzagDivider className="bg-black/60" />
<CurvedDivider className="rotate-180 bg-[black]/60" />
      
      {/* Top Selling Section */}
      <ProductShowcase 
        title="TOP SELLING"
        viewAllPath="/top-selling"
        products={topSelling}
      />
<WaveDivider className=" bg-[black]/70" />

        </div>
      )
    }