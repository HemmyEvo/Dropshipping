import { IProductInput } from "@/types"
import { toSlug } from "./utils"

const products: IProductInput[] = [

  {
    name: 'Nike Mens Slim-fit Long-Sleeve T-Shirt',
    slug: toSlug('Nike Mens Slim-fit Long-Sleeve T-Shirt'),
    sku: 'NIK-TS-001',
    category: 'T-Shirts',
    categoryUrl: '/category/t-shirts',
    images: [
      { id: 'img1', url: '/images/p11-1.jpg', alt: 'Nike T-Shirt front view' },
      { id: 'img2', url: '/images/p11-2.jpg', alt: 'Nike T-Shirt back view' }
    ],
    brand: 'Nike',
    description: 'Made with chemicals safer for human health and the environment',
    price: 21.80,
    listPrice: 0,
    countInStock: 11,
    numReviews: 7,
    avgRating: 4.71,
    numSales: 9,
    isPublished: true,
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
    sourceUrl: 'https://example.com/products/nike-slim-fit-tshirt'
  },
  {
    name: 'Jerzees Long-Sleeve Heavyweight Blend T-Shirt',
    slug: toSlug('Jerzees Long-Sleeve Heavyweight Blend T-Shirt'),
    sku: 'JER-TS-002',
    category: 'T-Shirts',
    categoryUrl: '/category/t-shirts',
    images: [
      { id: 'img1', url: '/images/p12-1.jpg', alt: 'Jerzees T-Shirt front' },
      { id: 'img2', url: '/images/p12-2.jpg', alt: 'Jerzees T-Shirt side' },
      { id: 'img3', url: '/images/p12-3.jpg', alt: 'Jerzees T-Shirt back' },
      { id: 'img4', url: '/images/p12-4.jpg', alt: 'Jerzees T-Shirt detail' }
    ],
    brand: 'Jerzees',
    description: 'Made with sustainably sourced USA grown cotton; Shoulder-to-shoulder tape; double-needle coverstitched front neck; Set-in sleeves; Rib cuffs with concealed seams; Seamless body for a wide printing area',
    price: 23.78,
    listPrice: 0,
    countInStock: 12,
    numReviews: 10,
    avgRating: 4.20,
    numSales: 29,
    isPublished: true,
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
    material: 'Cotton blend',
    sourceUrl: 'https://example.com/products/jerzees-heavyweight-tshirt'
  },
  {
    name: "Jerzees Men's Long-Sleeve T-Shirt",
    slug: toSlug('Jerzees Men Long-Sleeve T-Shirt'),
    sku: 'JER-TS-003',
    category: 'T-Shirts',
    categoryUrl: '/category/t-shirts',
    images: [
      { id: 'img1', url: '/images/p13-1.jpg', alt: 'Jerzees Long Sleeve front' },
      { id: 'img2', url: '/images/p13-2.jpg', alt: 'Jerzees Long Sleeve back' }
    ],
    brand: 'Jerzees',
    description: 'The Jerzees long sleeve t-shirt is made with dri-power technology that wicks away moisture to keep you cool and dry throughout your day. We also included a rib collar and cuffs for added durability, and a lay-flat collar for comfort. If you are looking for a versatile shirt that you can wear throughout the transitioning seasons, then look no further.',
    price: 13.86,
    listPrice: 16.03,
    countInStock: 13,
    numReviews: 12,
    avgRating: 4.00,
    numSales: 55,
    isPublished: true,
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
    sourceUrl: 'https://example.com/products/jerzees-longsleeve-tshirt'
  },
  {
    name: 'Decrum Mens Plain Long Sleeve T-Shirt - Comfortable Soft Fashion V Neck Full Sleeves Jersey Shirts',
    slug: toSlug('Decrum Mens Plain Long Sleeve T-Shirt - Comfortable Soft Fashion V Neck Full Sleeves Jersey Shirts'),
    sku: 'DEC-TS-004',
    category: 'T-Shirts',
    categoryUrl: '/category/t-shirts',
    images: [
      { id: 'img1', url: '/images/p14-1.jpg', alt: 'Decrum T-Shirt front' },
      { id: 'img2', url: '/images/p14-2.jpg', alt: 'Decrum T-Shirt back' }
    ],
    brand: 'Jerzees',
    description: 'Elevate your outfit with this soft long sleeve t shirt men. This full sleeves tee is the ultimate upgrade from your regular cotton t-shirt.',
    price: 26.95,
    listPrice: 46.03,
    countInStock: 14,
    numReviews: 14,
    avgRating: 3.85,
    numSales: 54,
    isPublished: true,
    tags: ['todays-deal'],
    variant: [
      {
        title: 'Size',
        options: [
          { label: 'XL', price: 26.95, stock: 7 },
          { label: 'XXL', price: 26.95, stock: 7 },
        ]
      },
      {
        title: 'Color',
        options: [
          { label: 'Yellow', price: 26.95, stock: 7 },
          { label: 'White', price: 26.95, stock: 7 },
        ]
      }
    ],
    ratingDistribution: [
      { rating: 1, count: 0 },
      { rating: 2, count: 2 },
      { rating: 3, count: 3 },
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
    material: 'Jersey fabric',
    sourceUrl: 'https://example.com/products/decrum-longsleeve-tshirt'
  },
  {
    name: "Muscle Cmdr Men's Slim Fit Henley Shirt Long&Short Business Sleeve Casual 3 Metal Buton Placket Casual Stylish T-Shirt",
    slug: toSlug("Muscle Cmdr Men's Slim Fit Henley Shirt Long&Short Business Sleeve Casual 3 Metal Buton Placket Casual Stylish T-Shirt"),
    sku: 'MUS-TS-005',
    category: 'T-Shirts',
    categoryUrl: '/category/t-shirts',
    images: [
      { id: 'img1', url: '/images/p15-1.jpg', alt: 'Muscle Cmdr Henley front' },
      { id: 'img2', url: '/images/p15-2.jpg', alt: 'Muscle Cmdr Henley back' }
    ],
    brand: 'Muscle Cmdr',
    description: "Slim Fit Design:Men's Muscle Slim Fit Button Henley Shirts are designed to fit snugly against your body, accentuating your muscles and creating a sleek silhouette that's perfect for any occasion.",
    price: 29.99,
    listPrice: 35.99,
    countInStock: 15,
    numReviews: 15,
    avgRating: 3.66,
    numSales: 54,
    isPublished: true,
    tags: ['new-arrival', 'featured'],
    variant: [
      {
        title: 'Size',
        options: [
          { label: 'XL', price: 29.99, stock: 8 },
          { label: 'XXL', price: 29.99, stock: 7 },
        ]
      },
      {
        title: 'Color',
        options: [
          { label: 'Green', price: 29.99, stock: 8 },
          { label: 'Yellow', price: 29.99, stock: 7 },
        ]
      }
    ],
    ratingDistribution: [
      { rating: 1, count: 1 },
      { rating: 2, count: 2 },
      { rating: 3, count: 3 },
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
    sourceUrl: 'https://example.com/products/muscle-cmdr-henley'
  },
  {
    name: 'Hanes Mens Long Sleeve Beefy Henley Shirt',
    slug: toSlug('Hanes Mens Long Sleeve Beefy Henley Shirt'),
    sku: 'HAN-TS-006',
    category: 'T-Shirts',
    categoryUrl: '/category/t-shirts',
    images: [
      { id: 'img1', url: '/images/p16-1.jpg', alt: 'Hanes Henley front' },
      { id: 'img2', url: '/images/p16-2.jpg', alt: 'Hanes Henley back' }
    ],
    brand: 'Jerzees',
    description: 'Heavyweight cotton (Heathers are 60% cotton/40% polyester; Pebblestone is 75% cotton/25% polyester)',
    price: 25.30,
    listPrice: 32.99,
    countInStock: 16,
    numReviews: 13,
    avgRating: 3.46,
    numSales: 56,
    isPublished: true,
    tags: ['best-seller', 'todays-deal'],
    variant: [
      {
        title: 'Size',
        options: [
          { label: 'XL', price: 25.30, stock: 8 },
          { label: 'XXL', price: 25.30, stock: 8 },
        ]
      },
      {
        title: 'Color',
        options: [
          { label: 'Grey', price: 25.30, stock: 8 },
          { label: 'White', price: 25.30, stock: 8 },
        ]
      }
    ],
    ratingDistribution: [
      { rating: 1, count: 1 },
      { rating: 2, count: 2 },
      { rating: 3, count: 3 },
      { rating: 4, count: 4 },
      { rating: 5, count: 3 },
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
    material: 'Heavyweight cotton',
    sourceUrl: 'https://example.com/products/hanes-beefy-henley'
  },
  // Jeans
  {
    name: 'Silver Jeans Co. Mens Jace Slim Fit Bootcut Jeans',
    slug: toSlug('Silver Jeans Co. Mens Jace Slim Fit Bootcut Jeans'),
    sku: 'SIL-JN-007',
    category: 'Jeans',
    categoryUrl: '/category/jeans',
    images: [
      { id: 'img1', url: '/images/p21-1.jpg', alt: 'Silver Jeans front' },
      { id: 'img2', url: '/images/p21-2.jpg', alt: 'Silver Jeans back' }
    ],
    brand: 'Silver Jeans Co',
    description: 'Silver Jeans Co. Jace Slim Fit Bootcut Jeans - Consider Jace a modern cowboy jean. It sits below the waist and features a slim fit through the hip and thigh. Finished with an 18” bootcut leg opening that complements the slimmer silhouette while still fitting over boots',
    price: 95.34,
    listPrice: 0,
    countInStock: 54,
    numReviews: 7,
    avgRating: 4.71,
    numSales: 21,
    isPublished: true,
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
    sourceUrl: 'https://example.com/products/silver-jeans-jace'
  },
  {
    name: "Levi's mens 505 Regular Fit Jeans (Also Available in Big & Tall)",
    slug: toSlug("Levi's mens 505 Regular Fit Jeans (Also Available in Big & Tall)"),
    sku: 'LEV-JN-008',
    category: 'Jeans',
    categoryUrl: '/category/jeans',
    images: [
      { id: 'img1', url: '/images/p22-1.jpg', alt: 'Levis 505 front' },
      { id: 'img2', url: '/images/p22-2.jpg', alt: 'Levis 505 back' }
    ],
    brand: "Levi's",
    description: 'A veritable classic, this 505 is made to have a comfortable look and style.',
    price: 59.99,
    listPrice: 69.99,
    countInStock: 22,
    numReviews: 10,
    avgRating: 4.20,
    numSales: 54,
    isPublished: true,
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
    sourceUrl: 'https://example.com/products/levis-505-jeans'
  },
  {
    name: 'Essentials Mens Straight-Fit Stretch Jean',
    slug: toSlug('Essentials Mens Straight-Fit Stretch Jean'),
    sku: 'ESS-JN-009',
    category: 'Jeans',
    categoryUrl: '/category/jeans',
    images: [
      { id: 'img1', url: '/images/p23-1.jpg', alt: 'Essentials Jeans front' },
      { id: 'img2', url: '/images/p23-2.jpg', alt: 'Essentials Jeans back' }
    ],
    brand: 'Essentials',
    description: 'These classic 5-pocket straight-fit jeans are crafted with a bit of stretch for additional comfort and to help maintain their shape',
    price: 38.90,
    listPrice: 45.00,
    countInStock: 23,
    numReviews: 12,
    avgRating: 4.00,
    numSales: 54,
    isPublished: true,
    tags: ['best-seller'],
    variant: [
      {
        title: 'Size',
        options: [
          { label: '30Wx30L', price: 38.90, stock: 8 },
          { label: '34Wx30L', price: 38.90, stock: 8 },
          { label: '36Wx30L', price: 38.90, stock: 7 },
        ]
      },
      {
        title: 'Color',
        options: [
          { label: 'Grey', price: 38.90, stock: 12 },
          { label: 'Blue', price: 38.90, stock: 11 },
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
    material: 'Stretch denim',
    sourceUrl: 'https://example.com/products/essentials-stretch-jeans'
  },
  {
    name: "Buffalo David Bitton Mens Men's Driven Relaxed Denim JeansJeans",
    slug: toSlug("Buffalo David Bitton Mens Men's Driven Relaxed Denim JeansJeans"),
    sku: 'BUF-JN-010',
    category: 'Jeans',
    categoryUrl: '/category/jeans',
    images: [
      { id: 'img1', url: '/images/p24-1.jpg', alt: 'Buffalo Jeans front' },
      { id: 'img2', url: '/images/p24-2.jpg', alt: 'Buffalo Jeans back' }
    ],
    brand: 'Buffalo David Bitton',
    description: 'Stretch recycled denim jeans in an authentic and sanded wash blue. Features a comfortable low-rise waist with a relaxed fit at the leg. The distressed look gives these jeans an effortlessly worn-in feel. The eco-friendly logo patch in tan and red is at the back waistband. The signature maple leaf graphic is debossed at the zip-fly.',
    price: 69.99,
    listPrice: 100.00,
    countInStock: 24,
    numReviews: 14,
    avgRating: 3.85,
    numSales: 53,
    isPublished: true,
    tags: ['todays-deal'],
    variant: [
      {
        title: 'Size',
        options: [
          { label: '30Wx30L', price: 69.99, stock: 8 },
          { label: '34Wx30L', price: 69.99, stock: 8 },
          { label: '36Wx30L', price: 69.99, stock: 8 },
        ]
      },
      {
        title: 'Color',
        options: [
          { label: 'Blue', price: 69.99, stock: 12 },
          { label: 'Grey', price: 69.99, stock: 12 },
        ]
      }
    ],
    ratingDistribution: [
      { rating: 1, count: 0 },
      { rating: 2, count: 2 },
      { rating: 3, count: 3 },
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
    material: 'Recycled denim',
    sourceUrl: 'https://example.com/products/buffalo-driven-jeans'
  },
  {
    name: 'Dickies Mens Relaxed Fit Carpenter Jean',
    slug: toSlug('Dickies Mens Relaxed Fit Carpenter Jean'),
    sku: 'DIC-JN-011',
    category: 'Jeans',
    categoryUrl: '/category/jeans',
    images: [
      { id: 'img1', url: '/images/p25-1.jpg', alt: 'Dickies Jeans front' },
      { id: 'img2', url: '/images/p25-2.jpg', alt: 'Dickies Jeans back' }
    ],
    brand: 'Dickies',
    description: 'Relaxed work jean with traditional carpenter-style pockets and logo patch at back pockets',
    price: 95.34,
    listPrice: 0,
    countInStock: 25,
    numReviews: 15,
    avgRating: 3.66,
    numSales: 48,
    isPublished: true,
    tags: ['new-arrival', 'featured'],
    variant: [
      {
        title: 'Size',
        options: [
          { label: '30Wx30L', price: 95.34, stock: 9 },
          { label: '34Wx30L', price: 95.34, stock: 8 },
          { label: '36Wx30L', price: 95.34, stock: 8 },
        ]
      },
      {
        title: 'Color',
        options: [
          { label: 'Blue', price: 95.34, stock: 13 },
          { label: 'Grey', price: 95.34, stock: 12 },
        ]
      }
    ],
    ratingDistribution: [
      { rating: 1, count: 1 },
      { rating: 2, count: 2 },
      { rating: 3, count: 3 },
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
    material: 'Durable denim',
    sourceUrl: 'https://example.com/products/dickies-carpenter-jeans'
  },
  {
    name: 'Wrangler mens Premium Performance Cowboy Cut Slim Fit Jean',
    slug: toSlug('Wrangler mens Premium Performance Cowboy Cut Slim Fit Jean'),
    sku: 'WRA-JN-012',
    category: 'Jeans',
    categoryUrl: '/category/jeans',
    images: [
      { id: 'img1', url: '/images/p26-1.jpg', alt: 'Wrangler Jeans front' },
      { id: 'img2', url: '/images/p26-2.jpg', alt: 'Wrangler Jeans back' }
    ],
    brand: 'Wrangler',
    description: 'Designed with a functional fit in mind, these jeans are made to stack over your favorite pair of boots. Constructed with a slim fit in the waist, seat, and thigh, this jean is made for both function and comfort for long days in the saddle.',
    price: 81.78,
    listPrice: 149.99,
    countInStock: 26,
    numReviews: 13,
    avgRating: 3.46,
    numSales: 48,
    isPublished: true,
    tags: ['best-seller', 'todays-deal'],
    variant: [
      {
        title: 'Size',
        options: [
          { label: '30Wx30L', price: 81.78, stock: 9 },
          { label: '34Wx30L', price: 81.78, stock: 9 },
          { label: '36Wx30L', price: 81.78, stock: 8 },
        ]
      },
      {
        title: 'Color',
        options: [
          { label: 'Blue', price: 81.78, stock: 13 },
          { label: 'Grey', price: 81.78, stock: 13 },
        ]
      }
    ],
    ratingDistribution: [
      { rating: 1, count: 1 },
      { rating: 2, count: 2 },
      { rating: 3, count: 3 },
      { rating: 4, count: 4 },
      { rating: 5, count: 3 },
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
    material: 'Premium denim',
    sourceUrl: 'https://example.com/products/wrangler-cowboy-jeans'
  },
  // Watches
  {
    name: "Seiko Men's Analogue Watch with Black Dial",
    slug: toSlug("Seiko Men's Analogue Watch with Black Dial"),
    sku: 'SEI-WT-013',
    category: 'Wrist Watches',
    categoryUrl: '/category/watches',
    images: [
      { id: 'img1', url: '/images/p31-1.jpg', alt: 'Seiko Watch front' },
      { id: 'img2', url: '/images/p31-2.jpg', alt: 'Seiko Watch back' }
    ],
    brand: 'Seiko',
    description: 'Casing: Case made of stainless steel Case shape: round Case colour: silver Glass: Hardlex Clasp type: Fold over clasp with safety',
    price: 530.00,
    listPrice: 0,
    countInStock: 31,
    numReviews: 7,
    avgRating: 4.71,
    numSales: 48,
    isPublished: true,
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
    sourceUrl: 'https://example.com/products/seiko-analogue-watch'
  },
  {
    name: 'SEIKO 5 Sport SRPJ83 Beige Dial Nylon Automatic Watch, Beige, Automatic Watch',
    slug: toSlug('SEIKO 5 Sport SRPJ83 Beige Dial Nylon Automatic Watch, Beige, Automatic Watch'),
    sku: 'SEI-WT-014',
    category: 'Wrist Watches',
    categoryUrl: '/category/watches',
    images: [
      { id: 'img1', url: '/images/p32-1.jpg', alt: 'Seiko 5 Sport front' },
      { id: 'img2', url: '/images/p32-2.jpg', alt: 'Seiko 5 Sport back' }
    ],
    brand: 'Seiko',
    description: 'Seiko 5 Sports Collection Inspired by vintage field/aviator style: Automatic with manual winding capability',
    price: 375.83,
    listPrice: 400.00,
    countInStock: 32,
    numReviews: 10,
    avgRating: 4.20,
    numSales: 48,
    isPublished: true,
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
    sourceUrl: 'https://example.com/products/seiko-5-sport-watch'
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