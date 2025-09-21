import { IProductInput } from "@/types"
import { toSlug } from "./utils"

const products: IProductInput[] = [

  // Watches
{
  name: "Seiko Men's Analogue Watch with Black Dial",
  slug: toSlug("Seiko Men's Analogue Watch with Black Dial"),
  sku: 'SEI-WT-013',
  category: {
  name: 'Watches',
  subcategories: ['Wrist Watches']
},
  categoryUrl: '/category/watches',
  images: [
    { id: 'img1', url: '/images/p31-1.jpg', alt: 'Seiko Watch front' },
    { id: 'img2', url: '/images/p31-2.jpg', alt: 'Seiko Watch back' }
  ],
  brand: 'Seiko',
  description: 'Casing: Case made of stainless steel Case shape: round Case colour: silver Glass: Hardlex Clasp type: Fold over clasp with safety',
  shortDescription: 'Elegant analogue watch with black dial and stainless steel case',
  price: 530.00,
  listPrice: 0,
  discountPercentage: 0,
  countInStock: 31,
  numReviews: 7,
  avgRating: 4.71,
  numSales: 48,
  isPublished: true,
  isFeatured: false,
  tags: ['new-arrival'],
  variant: [
    {
      title: 'Style',
      options: [
        { label: 'Standard', price: 530.00, stock: 31 },
      ]
    }
  ],
  ratingDistribution: [
    { rating: 1, count: 0 },
    { rating: 2, count: 0 },
    { rating: 3, count: 0 },
    { rating: 4, count: 2 },
    { rating: 5, count: 5 },
  ],
  reviews: [],
  shippingInfo: {
    deliveryTime: '7-10 business days',
    shippingFrom: 'Japan',
    cost: 12.99,
    packageDimensions: {
      length: 6,
      width: 6,
      height: 4,
      weight: 0.8
    }
  },
  material: 'Stainless steel',
  weight: '0.8 lbs',
  dimensions: '6 × 6 × 4 in',
  careInstructions: 'Avoid water exposure. Clean with a soft cloth.',
  sourceUrl: 'https://example.com/products/seiko-analogue-watch',
  specifications: {
    'Case Material': 'Stainless steel',
    'Case Shape': 'Round',
    'Case Color': 'Silver',
    'Glass': 'Hardlex',
    'Clasp Type': 'Fold over clasp with safety'
  },
  metaTitle: "Seiko Men's Analogue Watch with Black Dial",
  metaDescription: 'Elegant Seiko analogue watch with black dial and stainless steel case',
  relatedProducts: [],
  seoKeywords: ['seiko', 'analogue watch', 'mens watch', 'black dial watch']
},
{
  name: 'SEIKO 5 Sport SRPJ83 Beige Dial Nylon Automatic Watch, Beige, Automatic Watch',
  slug: toSlug('SEIKO 5 Sport SRPJ83 Beige Dial Nylon Automatic Watch, Beige, Automatic Watch'),
  sku: 'SEI-WT-014',
   category: {
  name: 'Watches',
  subcategories: ['Wrist Watches']
},
  categoryUrl: '/category/watches',
  images: [
    { id: 'img1', url: '/images/p32-1.jpg', alt: 'Seiko 5 Sport front' },
    { id: 'img2', url: '/images/p32-2.jpg', alt: 'Seiko 5 Sport back' }
  ],
  brand: 'Seiko',
  description: 'Seiko 5 Sports Collection Inspired by vintage field/aviator style: Automatic with manual winding capability',
  shortDescription: 'Automatic sports watch with beige dial and nylon strap',
  price: 375.83,
  listPrice: 400.00,
  discountPercentage: 6,
  countInStock: 32,
  numReviews: 10,
  avgRating: 4.20,
  numSales: 48,
  isPublished: true,
  isFeatured: true,
  tags: ['featured'],
  variant: [
    {
      title: 'Style',
      options: [
        { label: 'Standard', price: 375.83, stock: 32 },
      ]
    }
  ],
  ratingDistribution: [
    { rating: 1, count: 1 },
    { rating: 2, count: 0 },
    { rating: 3, count: 0 },
    { rating: 4, count: 4 },
    { rating: 5, count: 5 },
  ],
  reviews: [],
  shippingInfo: {
    deliveryTime: '7-10 business days',
    shippingFrom: 'Japan',
    cost: 12.99,
    packageDimensions: {
      length: 6,
      width: 6,
      height: 4,
      weight: 0.8
    }
  },
  material: 'Stainless steel with nylon strap',

  weight: '0.8 lbs',
  dimensions: '6 × 6 × 4 in',
  careInstructions: 'Avoid water exposure. Clean with a soft cloth.',
  sourceUrl: 'https://example.com/products/seiko-5-sport-watch',
  specifications: {
    'Movement': 'Automatic with manual winding',
    'Case Material': 'Stainless steel',
    'Strap Material': 'Nylon',
    'Water Resistance': '100m',
    'Crystal': 'Hardlex'
  },
  metaTitle: 'SEIKO 5 Sport Automatic Watch',
  metaDescription: 'Automatic sports watch with beige dial and durable nylon strap',
  relatedProducts: [],
  seoKeywords: ['seiko 5', 'automatic watch', 'sports watch', 'nylon strap watch']
},

// Jeans
{
  name: 'Silver Jeans Co. Mens Jace Slim Fit Bootcut Jeans',
  slug: toSlug('Silver Jeans Co. Mens Jace Slim Fit Bootcut Jeans'),
  sku: 'SIL-JN-007',
 category: {
  name: 'Clothing',
  subcategories: ['men','Jean']
},
  categoryUrl: '/category/jeans',
  images: [
    { id: 'img1', url: '/images/p21-1.jpg', alt: 'Silver Jeans front' },
    { id: 'img2', url: '/images/p21-2.jpg', alt: 'Silver Jeans back' }
  ],
  brand: 'Silver Jeans Co',
  description: 'Silver Jeans Co. Jace Slim Fit Bootcut Jeans - Consider Jace a modern cowboy jean. It sits below the waist and features a slim fit through the hip and thigh. Finished with an 18” bootcut leg opening that complements the slimmer silhouette while still fitting over boots',
  shortDescription: 'Slim fit bootcut jeans with modern cowboy style',
  price: 95.34,
  listPrice: 0,
  discountPercentage: 0,
  countInStock: 54,
  numReviews: 7,
  avgRating: 4.71,
  numSales: 21,
  isPublished: true,
  isFeatured: false,
  tags: ['new-arrival'],
  variant: [
    {
      title: 'Size',
      options: [
        { label: '30Wx30L', price: 95.34, stock: 18 },
        { label: '34Wx30L', price: 95.34, stock: 18 },
        { label: '36Wx30L', price: 95.34, stock: 18 },
      ]
    },
    {
      title: 'Color',
      options: [
        { label: 'Blue', price: 95.34, stock: 27 },
        { label: 'Grey', price: 95.34, stock: 27 },
      ]
    }
  ],
  ratingDistribution: [
    { rating: 1, count: 0 },
    { rating: 2, count: 0 },
    { rating: 3, count: 0 },
    { rating: 4, count: 2 },
    { rating: 5, count: 5 },
  ],
  reviews: [],
  shippingInfo: {
    deliveryTime: '5-7 business days',
    shippingFrom: 'USA',
    cost: 6.99,
    packageDimensions: {
      length: 16,
      width: 12,
      height: 2,
      weight: 1.2
    }
  },
  material: 'Denim',
  weight: '1.2 lbs',
  dimensions: '16 × 12 × 2 in',
  careInstructions: 'Machine wash cold with like colors. Tumble dry low.',
  sourceUrl: 'https://example.com/products/silver-jeans-jace',
  specifications: {
    'Fit': 'Slim Bootcut',
    'Rise': 'Below Waist',
    'Leg Opening': '18"',
    'Closure': 'Button Fly'
  },
  metaTitle: 'Silver Jeans Co. Mens Jace Slim Fit Bootcut Jeans',
  metaDescription: 'Slim fit bootcut jeans with modern cowboy style and comfortable fit',
  relatedProducts: [],
  seoKeywords: ['silver jeans', 'slim fit jeans', 'bootcut jeans', 'mens jeans']
},
{
  name: "Levi's mens 505 Regular Fit Jeans (Also Available in Big & Tall)",
  slug: toSlug("Levi's mens 505 Regular Fit Jeans (Also Available in Big & Tall)"),
  sku: 'LEV-JN-008',
  category: {
  name: 'Clothing',
  subcategories: ['men','Jeans'],
},

  categoryUrl: '/category/jeans',
  images: [
    { id: 'img1', url: '/images/p22-1.jpg', alt: 'Levis 505 front' },
    { id: 'img2', url: '/images/p22-2.jpg', alt: 'Levis 505 back' }
  ],
  brand: "Levi's",
  description: 'A veritable classic, this 505 is made to have a comfortable look and style.',
  shortDescription: 'Classic regular fit jeans with timeless style',
  price: 59.99,
  listPrice: 69.99,
  discountPercentage: 14,
  countInStock: 22,
  numReviews: 10,
  avgRating: 4.20,
  numSales: 54,
  isPublished: true,
  isFeatured: true,
  tags: ['featured'],
  variant: [
    {
      title: 'Size',
      options: [
        { label: '30Wx30L', price: 59.99, stock: 8 },
        { label: '34Wx30L', price: 59.99, stock: 7 },
        { label: '36Wx30L', price: 59.99, stock: 7 },
      ]
    },
    {
      title: 'Color',
      options: [
        { label: 'Blue', price: 59.99, stock: 11 },
        { label: 'Grey', price: 59.99, stock: 11 },
      ]
    }
  ],
  ratingDistribution: [
    { rating: 1, count: 1 },
    { rating: 2, count: 0 },
    { rating: 3, count: 0 },
    { rating: 4, count: 4 },
    { rating: 5, count: 5 },
  ],
  reviews: [],
  shippingInfo: {
    deliveryTime: '5-7 business days',
    shippingFrom: 'USA',
    cost: 6.99,
    packageDimensions: {
      length: 16,
      width: 12,
      height: 2,
      weight: 1.2
    }
  },
  material: 'Denim',

  weight: '1.2 lbs',
  dimensions: '16 × 12 × 2 in',
  careInstructions: 'Machine wash cold with like colors. Tumble dry low.',
  sourceUrl: 'https://example.com/products/levis-505-jeans',
  specifications: {
    'Fit': 'Regular',
    'Rise': 'Mid Rise',
    'Leg Opening': '16"',
    'Closure': 'Zipper Fly'
  },
  metaTitle: "Levi's mens 505 Regular Fit Jeans",
  metaDescription: 'Classic regular fit jeans with timeless style and comfortable fit',
  relatedProducts: [],
  seoKeywords: ['levis', '505 jeans', 'regular fit jeans', 'mens jeans']
},

// T-Shirts
{
  name: 'Nike Mens Slim-fit Long-Sleeve T-Shirt',
  slug: toSlug('Nike Mens Slim-fit Long-Sleeve T-Shirt'),
  sku: 'NIK-TS-001',
    category: {
  name: 'Clothing',
  subcategories: ['men','T-Shirts'],
},

  categoryUrl: '/category/t-shirts',
  images: [
    { id: 'img1', url: '/images/p11-1.jpg', alt: 'Nike T-Shirt front view' },
    { id: 'img2', url: '/images/p11-2.jpg', alt: 'Nike T-Shirt back view' }
  ],
  brand: 'Nike',
  description: 'Made with chemicals safer for human health and the environment',
  shortDescription: 'Slim-fit long-sleeve t-shirt with eco-friendly materials',
  price: 21.80,
  listPrice: 0,
  discountPercentage: 0,
  countInStock: 11,
  numReviews: 7,
  avgRating: 4.71,
  numSales: 9,
  isPublished: true,
  isFeatured: false,
  tags: ['new-arrival'],
  variant: [
    {
      title: 'Size',
      options: [
        { label: 'S', price: 21.80, stock: 3 },
        { label: 'M', price: 21.80, stock: 3 },
        { label: 'L', price: 21.80, stock: 2 },
        { label: 'XL', price: 21.80, stock: 2 },
        { label: 'XXL', price: 21.80, stock: 1 },
      ]
    },
    {
      title: 'Color',
      options: [
        { label: 'Green', price: 21.80, stock: 4 },
        { label: 'Red', price: 21.80, stock: 4 },
        { label: 'Black', price: 21.80, stock: 3 },
      ]
    }
  ],
  ratingDistribution: [
    { rating: 1, count: 0 },
    { rating: 2, count: 0 },
    { rating: 3, count: 0 },
    { rating: 4, count: 2 },
    { rating: 5, count: 5 },
  ],
  reviews: [],
  shippingInfo: {
    deliveryTime: '3-5 business days',
    shippingFrom: 'USA',
    cost: 4.99,
    packageDimensions: {
      length: 12,
      width: 10,
      height: 1,
      weight: 0.5
    }
  },
  material: 'Cotton blend',

  weight: '0.5 lbs',
  dimensions: '12 × 10 × 1 in',
  careInstructions: 'Machine wash cold. Tumble dry low.',
  sourceUrl: 'https://example.com/products/nike-slim-fit-tshirt',
  specifications: {
    'Fit': 'Slim',
    'Sleeve': 'Long Sleeve',
    'Neckline': 'Crew Neck',
    'Fabric': 'Cotton Blend'
  },
  metaTitle: 'Nike Mens Slim-fit Long-Sleeve T-Shirt',
  metaDescription: 'Slim-fit long-sleeve t-shirt made with eco-friendly materials',
  relatedProducts: [],
  seoKeywords: ['nike', 'slim fit t-shirt', 'long sleeve', 'eco-friendly']
},
{
  name: 'Jerzees Long-Sleeve Heavyweight Blend T-Shirt',
  slug: toSlug('Jerzees Long-Sleeve Heavyweight Blend T-Shirt'),
  sku: 'JER-TS-002',
  category: {
  name: 'Clothing',
  subcategories: ['men','T-Shirts'],
},

  categoryUrl: '/category/t-shirts',
  images: [
    { id: 'img1', url: '/images/p12-1.jpg', alt: 'Jerzees T-Shirt front' },
    { id: 'img2', url: '/images/p12-2.jpg', alt: 'Jerzees T-Shirt side' },
    { id: 'img3', url: '/images/p12-3.jpg', alt: 'Jerzees T-Shirt back' },
    { id: 'img4', url: '/images/p12-4.jpg', alt: 'Jerzees T-Shirt detail' }
  ],
  brand: 'Jerzees',
  description: 'Made with sustainably sourced USA grown cotton; Shoulder-to-shoulder tape; double-needle coverstitched front neck; Set-in sleeves; Rib cuffs with concealed seams; Seamless body for a wide printing area',
  shortDescription: 'Heavyweight blend long-sleeve t-shirt with sustainable cotton',
  price: 23.78,
  listPrice: 0,
  discountPercentage: 0,
  countInStock: 12,
  numReviews: 10,
  avgRating: 4.20,
  numSales: 29,
  isPublished: true,
  isFeatured: true,
  tags: ['featured'],
  variant: [
    {
      title: 'Size',
      options: [
        { label: 'S', price: 23.78, stock: 3 },
        { label: 'M', price: 23.78, stock: 3 },
        { label: 'L', price: 23.78, stock: 2 },
        { label: 'XL', price: 23.78, stock: 2 },
        { label: 'XXL', price: 23.78, stock: 2 },
      ]
    },
    {
      title: 'Color',
      options: [
        { label: 'Yellow', price: 23.78, stock: 4 },
        { label: 'Red', price: 23.78, stock: 4 },
        { label: 'Black', price: 23.78, stock: 4 },
      ]
    }
  ],
  ratingDistribution: [
    { rating: 1, count: 1 },
    { rating: 2, count: 0 },
    { rating: 3, count: 0 },
    { rating: 4, count: 4 },
    { rating: 5, count: 5 },
  ],
  reviews: [],
  shippingInfo: {
    deliveryTime: '3-5 business days',
    shippingFrom: 'USA',
    cost: 4.99,
    packageDimensions: {
      length: 12,
      width: 10,
      height: 1,
      weight: 0.6
    }
  },
  
  weight: '0.6 lbs',
  dimensions: '12 × 10 × 1 in',
  careInstructions: 'Machine wash cold. Tumble dry low.',
  sourceUrl: 'https://example.com/products/jerzees-heavyweight-tshirt',
  specifications: {
    'Fit': 'Regular',
    'Sleeve': 'Long Sleeve',
    'Neckline': 'Crew Neck',
    'Fabric': 'Heavyweight Cotton Blend'
  },
  metaTitle: 'Jerzees Long-Sleeve Heavyweight Blend T-Shirt',
  metaDescription: 'Heavyweight blend long-sleeve t-shirt made with sustainable USA cotton',
  relatedProducts: [],
  seoKeywords: ['jerzees', 'heavyweight t-shirt', 'long sleeve', 'sustainable cotton']
},
{
  name: "Jerzees Men's Long-Sleeve T-Shirt",
  slug: toSlug('Jerzees Men Long-Sleeve T-Shirt'),
  sku: 'JER-TS-003',
     category: {
  name: 'Clothing',
  subcategories: ['men','T-Shirts'],
},
  categoryUrl: '/category/t-shirts',
  images: [
    { id: 'img1', url: '/images/p13-1.jpg', alt: 'Jerzees Long Sleeve front' },
    { id: 'img2', url: '/images/p13-2.jpg', alt: 'Jerzees Long Sleeve back' }
  ],
  brand: 'Jerzees',
  description: 'The Jerzees long sleeve t-shirt is made with dri-power technology that wicks away moisture to keep you cool and dry throughout your day. We also included a rib collar and cuffs for added durability, and a lay-flat collar for comfort. If you are looking for a versatile shirt that you can wear throughout the transitioning seasons, then look no further.',
  shortDescription: 'Moisture-wicking long-sleeve t-shirt with comfort features',
  price: 13.86,
  listPrice: 16.03,
  discountPercentage: 14,
  countInStock: 13,
  numReviews: 12,
  avgRating: 4.00,
  numSales: 55,
  isPublished: true,
  isFeatured: false,
  tags: ['best-seller'],
  variant: [
    {
      title: 'Size',
      options: [
        { label: 'XL', price: 13.86, stock: 7 },
        { label: 'XXL', price: 13.86, stock: 6 },
      ]
    },
    {
      title: 'Color',
      options: [
        { label: 'Green', price: 13.86, stock: 7 },
        { label: 'White', price: 13.86, stock: 6 },
      ]
    }
  ],
  ratingDistribution: [
    { rating: 1, count: 1 },
    { rating: 2, count: 0 },
    { rating: 3, count: 2 },
    { rating: 4, count: 4 },
    { rating: 5, count: 5 },
  ],
  reviews: [],
  shippingInfo: {
    deliveryTime: '3-5 business days',
    shippingFrom: 'USA',
    cost: 4.99,
    packageDimensions: {
      length: 12,
      width: 10,
      height: 1,
      weight: 0.5
    }
  },
  material: 'Cotton blend',

  weight: '0.5 lbs',
  dimensions: '12 × 10 × 1 in',
  careInstructions: 'Machine wash cold. Tumble dry low.',
  sourceUrl: 'https://example.com/products/jerzees-longsleeve-tshirt',
  specifications: {
    'Technology': 'Dri-Power Moisture Wicking',
    'Fit': 'Regular',
    'Sleeve': 'Long Sleeve',
    'Collar': 'Rib Collar with Lay-Flat Design'
  },
  metaTitle: "Jerzees Men's Long-Sleeve T-Shirt",
  metaDescription: 'Moisture-wicking long-sleeve t-shirt with comfort features and durable construction',
  relatedProducts: [],
  seoKeywords: ['jerzees', 'long sleeve t-shirt', 'moisture wicking', 'comfort fit']
}
];


const data = {
  shopItems : [
    { title: 'All Products', path: '/products' },
    { title: 'Electronics', path: '/category/electronics' },
    { title: 'Fashion', path: '/category/fashion' },
    { title: 'Home & Garden', path: '/category/home-garden' },
    { title: 'Beauty & Health', path: '/category/beauty-health' },
  ],
     headerMenus: [
       {
         name: "Today's Deal",
         href: '/search?tag=todays-deal',
       },
       {
         name: 'New Arrivals',
         href: '/search?tag=new-arrival',
       },
       {
         name: 'Featured Products',
         href: '/search?tag=featured',
       },
       {
         name: 'Best Sellers',
         href: '/search?tag=best-seller',
       },
       {
         name: 'Browsing History',
         href: '/#browsing-history',
       },
       {
         name: 'Customer Service',
         href: '/page/customer-service',
       },
       {
         name: 'About Us',
         href: '/page/about-us',
       },
       {
         name: 'Help',
         href: '/page/help',
       },
     ],
     products,
   }

   export default data