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
    image: "https://cdn.pixabay.com/photo/2016/10/02/22/17/red-t-shirt-1710578_1280.jpg",  // flat lay red tee
    rating: 4,
    reviewCount: 86
  },
  {
    id: 2,
    name: "Skinny Fit Jeans",
    price: 240,
    originalPrice: 260,
    image: "https://cdn.pixabay.com/photo/2016/11/29/04/13/jeans-1866575_1280.jpg",  // jeans product shot
    rating: 5,
    reviewCount: 142
  },
  {
    id: 3,
    name: "Checkered Shirt",
    price: 180,
    image: "https://cdn.pixabay.com/photo/2017/08/02/13/58/checkered-shirt-2566961_1280.jpg",
    rating: 3,
    reviewCount: 54
  },
  {
    id: 4,
    name: "Striped T-shirt",
    price: 130,
    originalPrice: 160,
    image: "https://cdn.pixabay.com/photo/2017/09/07/18/53/t-shirt-2724445_1280.jpg",
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
    image: "https://cdn.pixabay.com/photo/2015/10/03/07/52/t-shirt-968927_1280.jpg",
    rating: 5,
    reviewCount: 210
  },
  {
    id: 6,
    name: "Courage Graphic T-shirt",
    price: 145,
    image: "https://cdn.pixabay.com/photo/2014/12/15/13/40/t-shirt-568363_1280.jpg",
    rating: 4,
    reviewCount: 98
  },
  {
    id: 7,
    name: "Lease Fit Bermuda Shorts",
    price: 80,
    image: "https://cdn.pixabay.com/photo/2016/03/27/19/47/shorts-1284652_1280.jpg",
    rating: 3,
    reviewCount: 45
  },
  {
    id: 8,
    name: "Faded Skinny Jeans",
    price: 210,
    image: "https://cdn.pixabay.com/photo/2020/02/22/08/26/demim-jeans-4852215_1280.jpg",
    rating: 5,
    reviewCount: 167
  }
];
      return (
        <div>
          <Hero />
          <BrandsSection />
<CustomShapeDivider className="rotate-180 "/>



     {/* New Arrivals Section */}
      <ProductShowcase 
        title="NEW ARRIVALS"
        viewAllPath="/new-arrivals"
        products={newArrivals}
      />
<ZigzagDivider className="rotate-180" />
<CurvedDivider  />
      
      {/* Top Selling Section */}
      <ProductShowcase 
        title="TOP SELLING"
        viewAllPath="/top-selling"
        products={topSelling}
      />
<WaveDivider />

        </div>
      )
    }