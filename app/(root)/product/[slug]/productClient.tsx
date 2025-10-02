/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import React, { useState, useCallback, useEffect } from 'react';
import SelectVariant from '@/components/shared/product/select-variant';
import ProductPrice from '@/components/shared/product/product-price';
import ProductGallery from '@/components/shared/product/product-gallery';
import Rating from '@/components/shared/product/rating';
import { VariantGroup, IProductInput } from '@/types';
import Breadcrumb from '@/components/shared/product/bread-crumb';
import AddToCart from '@/components/shared/product/add-to-cart';
import { generateId, round2 } from '@/lib/utils';
import ProductSlider from '@/components/shared/product/product-slider';
import { getProductsBySubCategory} from '@/lib/actions/product.action';

type Props = {
  product: IProductInput;
  relatedProducts: IProductInput[];
};

// Mock reviews data
const mockReviews = [
  {
    id: 1,
    user: "Samantha D.",
    rating: 5,
    comment: "I absolutely love this t-shirt! The design is unique and the fabric feels so comfortable. As a fellow designer, I appreciate the attention to detail. It's become my favorite go-to shirt.",
    date: "August 14, 2023"
  },
  {
    id: 2,
    user: "Alex M.",
    rating: 5,
    comment: "The t-shirt exceeded my expectations! The colors are vibrant and the print quality is top-notch. Being a UI/UX designer myself, I'm quite picky about aesthetics, and this t-shirt definitely gets a thumbs up from me.",
    date: "August 15, 2023"
  },
  {
    id: 3,
    user: "Ethan R.",
    rating: 5,
    comment: "This t-shirt is a must-have for anyone who appreciates good design. The minimalistic yet stylish pattern caught my eye, and the fit is perfect. I can see the designer's touch in every aspect of this shirt.",
    date: "August 16, 2023"
  },
  {
    id: 4,
    user: "Olivia P.",
    rating: 5,
    comment: "As a UI/UX enthusiast, I value simplicity and functionality. This t-shirt not only represents those principles but also feels great to wear. I'm evident that the designer poured their creativity into making this t-shirt stand out.",
    date: "August 17, 2023"
  },
  {
    id: 5,
    user: "Ava H.",
    rating: 5,
    comment: "I'm not just wearing a t-shirt; I'm wearing a piece of design philosophy. The intricate details and thoughtful layout of the design make this shirt a conversation starter.",
    date: "August 19, 2023"
  },
  {
    id: 6,
    user: "Liam K.",
    rating: 5,
    comment: "This t-shirt is a fusion of comfort and creativity. The fabric is soft, and the design speaks volumes about the designer's skill. It's like wearing a piece of art that reflects my passion for both design and fashion.",
    date: "August 18, 2023"
  }
];

// Mock FAQ data
const mockFAQs = [
  {
    id: 1,
    question: "What is the material of this t-shirt?",
    answer: "This t-shirt is made from 100% premium cotton, ensuring softness and breathability for all-day comfort."
  },
  {
    id: 2,
    question: "How should I care for this t-shirt?",
    answer: "We recommend machine washing in cold water with similar colors and tumble drying on low. Avoid bleaching to preserve the graphic print."
  },
  {
    id: 3,
    question: "What sizes are available?",
    answer: "This t-shirt is available in sizes Small through XX-Large. Please refer to our size chart for accurate measurements."
  },
  {
    id: 4,
    question: "How long does shipping take?",
    answer: "Standard shipping typically takes 5-7 business days. Express shipping options are available at checkout for faster delivery."
  },
  {
    id: 5,
    question: "What is your return policy?",
    answer: "We offer a 30-day return policy for unworn items with original tags attached. Please see our returns page for more details."
  }
];

// Mock product details
const productDetails = {
  material: "100% Premium Cotton",
  fit: "Regular Fit - True to Size",
  care: "Machine wash cold, tumble dry low, do not bleach",
  sku: "TS-2024-PREMIUM",
  weight: "0.4 lbs (180g)",
  dimensions: "10 × 12 × 1 inches",
  origin: "Designed in USA, Premium Quality Fabric"
};

export default function ProductClient({ product, relatedProducts }: Props) {
  const [activeTab, setActiveTab] = useState('details');
  const [reviewsToShow, setReviewsToShow] = useState(3);
  const [subCategoryProducts, setSubCategoryProducts] = useState<IProductInput[]>([]);
  const [selectedVariants, setSelectedVariants] = useState<{
    [key: string]: {
      label: string;
      price: number;
      stock: number;
      listPrice?: number;
      image?: { id: string; url: string; alt?: string };
      sku?: string;
    };
  }>(() => {
    const initial: any = {};
    if (product.variant) {
      product.variant.forEach((variant) => {
        initial[variant.title] = variant.options[0];
      });
    }
    return initial;
  });

  const handleVariantChange = useCallback((variantTitle: string, newOption: any) => {
    setSelectedVariants((prev) => ({
      ...prev,
      [variantTitle]: newOption,
    }));
  }, []);

  // Extract category and subcategory names
  const categoryName = typeof product.category === 'object' && product.category !== null
    ? product.category.name
    : product.category;

    // Add this helper function to extract subcategory from product
  const getProductSubCategory = (product: IProductInput): string | null => {
  if (!product.category) return null;
  
  if (typeof product.category === 'object' && product.category !== null) {
    // Return the first subcategory if available
    return product.category.subcategories?.[0] || null;
  }
  
  return null;
}

  const subCategoryName = getProductSubCategory(product);

  // Fetch related products from the same subcategory
  useEffect(() => {
    const fetchSubCategoryProducts = async () => {
      if (subCategoryName) {
        try {
          const result = await getProductsBySubCategory({
            subCategory: subCategoryName,
            page: 1,
            limit: 12
          });
          // Filter out the current product from the results
          const filteredProducts = result.data.filter(p => p.slug !== product.slug);
          setSubCategoryProducts(filteredProducts);
        } catch (error) {
          console.error('Error fetching subcategory products:', error);
        }
      }
    };

    fetchSubCategoryProducts();
  }, [subCategoryName, product.slug]);
  const loadMoreReviews = () => {
    setReviewsToShow(prev => Math.min(prev + 3, mockReviews.length));
  };

  const calculateTotalPrice = useCallback(() => {
    let totalPrice = product.price;
    Object.values(selectedVariants).forEach(variant => {
      totalPrice += variant.price || 0;
    });
    return totalPrice;
  }, [product.price, selectedVariants]);

  const calculateTotalListPrice = useCallback(() => {
    let totalListPrice = product.listPrice || product.price;
    Object.values(selectedVariants).forEach(variant => {
      totalListPrice += variant.listPrice || variant.price || 0;
    });
    return totalListPrice;
  }, [product.listPrice, product.price, selectedVariants]);

  const renderTabContent = () => {
    switch(activeTab) {
      case 'details':
        return (
          <div className="mt-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="space-y-6">
              
                <div className="bg-gray-50 rounded-lg p-6">
                  <h3 className="text-xl font-bold mb-4 text-gray-900">Product Specifications</h3>
                  <div className="space-y-4">
                    <div className="flex justify-between py-2 border-b border-gray-200">
                      <span className="font-semibold text-gray-700">Material:</span>
                      <span className="text-gray-900">{productDetails.material}</span>
                    </div>
                    <div className="flex justify-between py-2 border-b border-gray-200">
                      <span className="font-semibold text-gray-700">Fit:</span>
                      <span className="text-gray-900">{productDetails.fit}</span>
                    </div>
                    <div className="flex justify-between py-2 border-b border-gray-200">
                      <span className="font-semibold text-gray-700">Care Instructions:</span>
                      <span className="text-gray-900 text-right">{productDetails.care}</span>
                    </div>
                  </div>
                </div>
                
          
              </div>
              
              <div className="space-y-6">
                <div className="bg-gray-50 rounded-lg p-6">
                  <h3 className="text-xl font-bold mb-4 text-gray-900">Additional Information</h3>
                  <div className="space-y-4">
                    <div className="flex justify-between py-2 border-b border-gray-200">
                      <span className="font-semibold text-gray-700">SKU:</span>
                      <span className="text-gray-900 font-mono">{productDetails.sku}</span>
                    </div>
                    <div className="flex justify-between py-2 border-b border-gray-200">
                      <span className="font-semibold text-gray-700">Weight:</span>
                      <span className="text-gray-900">{productDetails.weight}</span>
                    </div>
                    <div className="flex justify-between py-2 border-b border-gray-200">
                      <span className="font-semibold text-gray-700">Dimensions:</span>
                      <span className="text-gray-900">{productDetails.dimensions}</span>
                    </div>
                    <div className="flex justify-between py-2 border-b border-gray-200">
                      <span className="font-semibold text-gray-700">Origin:</span>
                      <span className="text-gray-900">{productDetails.origin}</span>
                    </div>
                  </div>
                </div>
                
             
              </div>
            </div>
          </div>
        );
      case 'reviews':
        return (
          <div className="mt-6">
            <div className="bg-white rounded-lg p-6 mb-8 border border-gray-200">
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-6">
                <div className="flex items-center gap-4">
                  <div className="text-center bg-blue-50 rounded-lg p-4 min-w-20">
                    <div className="text-2xl font-bold text-blue-900">{product.avgRating.toFixed(1)}</div>
                    <div className="flex justify-center mt-1">
                      <Rating rating={product.avgRating} />
                    </div>
                    <div className="text-sm text-blue-700 mt-1">{product.numReviews} ratings</div>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">Customer Reviews</h3>
                    <p className="text-gray-600 mt-1">Read what our customers are saying</p>
                  </div>
                </div>
                <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200 whitespace-nowrap">
                  Write a Review
                </button>
              </div>
            </div>
            
            <div className="grid gap-6">
              {mockReviews.slice(0, reviewsToShow).map((review) => (
                <div key={review.id} className="bg-gray-50 rounded-lg p-6 hover:shadow-sm transition-shadow duration-200">
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-4">
                    <div className="flex items-start gap-4">
                      <div className="w-9 h-9 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center flex-shrink-0 shadow-sm">
                        <span className="font-bold text-white text-lg">
                          {review.user.charAt(0)}
                        </span>
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h4 className="text-lg font-semibold text-gray-900 truncate">{review.user}</h4>
                          <div className="flex items-center bg-green-100 text-green-800 text-xs font-medium px-2 py-1 rounded-full">
                            <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                            Verified Purchase
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Rating rating={review.rating} />
                          <span className="text-sm text-gray-500">{review.date}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <p className="text-gray-700 leading-relaxed ">{review.comment}</p>
                  <div className="flex gap-3 mt-4">
                    <button className="flex items-center gap-1 text-gray-500 hover:text-gray-700 text-sm transition-colors">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
                      </svg>
                      Helpful (24)
                    </button>
                 
                  </div>
                </div>
              ))}
            </div>
            
            {reviewsToShow < mockReviews.length && (
              <div className="text-center mt-8">
                <button 
                  onClick={loadMoreReviews}
                  className="bg-white hover:bg-gray-50 border border-gray-300 text-gray-800 font-semibold py-3 px-8 rounded-lg transition-all duration-200 hover:shadow-md inline-flex items-center gap-2"
                >
                  Load More Reviews
                  <span className="bg-gray-100 text-gray-600 text-sm px-2 py-1 rounded-full">
                    {mockReviews.length - reviewsToShow} remaining
                  </span>
                </button>
              </div>
            )}
          </div>
        );
      case 'faqs':
        return (
          <div className="mt-6">
            <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-8 mb-8 text-center">
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Frequently Asked Questions</h3>
              <p className="text-gray-600 text-lg">Find quick answers to common questions about this product</p>
            </div>
            
            <div className="space-y-4">
              {mockFAQs.map((faq, index) => (
                <div key={faq.id} className="bg-white border border-gray-200 rounded-xl p-6 hover:border-blue-300 transition-all duration-200 hover:shadow-sm">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center font-bold text-sm">
                      {index + 1}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-bold text-gray-900 text-lg mb-3 break-words">{faq.question}</h4>
                      <p className="text-gray-700 leading-relaxed break-words">{faq.answer}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="bg-gray-50 rounded-xl p-6 mt-8 text-center">
              <h4 className="font-bold text-gray-900 text-lg mb-2">Still have questions?</h4>
              <p className="text-gray-600 mb-4">Our customer support team is here to help you 24/7</p>
              <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200 inline-flex items-center gap-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                </svg>
                Contact Support
              </button>
            </div>
          </div>
        );
      default:
        return null;
    }
  };
  const breadcrumbItems = [
    { label: 'Home', href: '/' },
    { label: 'Shop', href: '/shop' },
    ...(categoryName ? [{ label: categoryName, href: `/shop/${categoryName.toLowerCase()}` }] : []),
    ...(subCategoryName ? [{ label: subCategoryName, href: `/shop/${categoryName?.toLowerCase()}/${subCategoryName.toLowerCase()}` }] : []),
    { label: product.name, href: '#' },
  ];

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-8">
        {/* Breadcrumb */}
        <div className="mb-6 sm:mb-8">
          <Breadcrumb customItems={breadcrumbItems} />
        </div>

        {/* Main Product Section */}
        <section className="mb-12 sm:mb-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 xl:gap-16">
            {/* Product Gallery - Fixed height issues */}
            <div className="w-full">
              <div className="sticky top-4">
                <ProductGallery images={product.images} />
              </div>
            </div>

            {/* Product Info */}
            <div className="w-full">
              <div className="space-y-6">
                {/* Badges */}
                <div className="flex flex-wrap gap-2">
                  {product.tags.includes('todays-deal') && (
                    <span className="inline-flex items-center gap-1 bg-red-100 text-red-800 text-sm font-bold px-3 py-1.5 rounded-full">
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M12.395 2.553a1 1 0 00-1.45-.385c-.345.23-.614.558-.822.88-.214.33-.403.713-.57 1.116-.334.804-.614 1.768-.84 2.734a31.365 31.365 0 00-.613 3.58 2.64 2.64 0 01-.945-1.067c-.328-.68-.398-1.534-.398-2.654A1 1 0 005.05 6.05 6.981 6.981 0 003 11a7 7 0 1011.95-4.95c-.592-.591-.98-.985-1.348-1.467-.363-.476-.724-1.063-1.207-2.03zM12.12 15.12A3 3 0 017 13s.879.5 2.5.5c0-1 .5-4 1.25-4.5.5 1 .786 1.293 1.371 1.879A2.99 2.99 0 0113 13a2.99 2.99 0 01-.879 2.121z" clipRule="evenodd" />
                      </svg>
                      Today&apos;s Deal
                    </span>
                  )}
                  {product.countInStock === 0 ? (
                    <span className="inline-flex items-center gap-1 bg-gray-100 text-gray-800 text-sm font-bold px-3 py-1.5 rounded-full">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
                      </svg>
                      Out of Stock
                    </span>
                  ) : product.countInStock < 10 ? (
                    <span className="inline-flex items-center gap-1 bg-orange-100 text-orange-800 text-sm font-bold px-3 py-1.5 rounded-full">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      Low Stock - Only {product.countInStock} left!
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 bg-green-100 text-green-800 text-sm font-bold px-3 py-1.5 rounded-full">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      In Stock - Ready to Ship
                    </span>
                  )}
                  <span className="inline-flex items-center gap-1 bg-blue-100 text-blue-800 text-sm font-bold px-3 py-1.5 rounded-full">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    Premium Quality
                  </span>
                </div>

                {/* Product Title */}
                <h1 className="text-xl font-serif sm:text-xl lg:text-2xl font-bold text-gray-900 leading-tight break-words">
                  {product.name}
                </h1>
                
                {/* Rating and Stock */}
                <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-6">
                  <div className="flex items-center gap-2">
                    <div className="flex items-center">
                      <Rating rating={product.avgRating} />
                      <span className="ml-2 text-lg font-bold text-gray-900">{product.avgRating.toFixed(1)}</span>
                    </div>
                    <span className="text-gray-600 text-sm">({product.numReviews} customer reviews)</span>
                  </div>
                 
                </div>

                {/* Price */}
                <div className="bg-gray-50 rounded-xl p-6">
                  <ProductPrice
                    price={calculateTotalPrice()}
                    listPrice={calculateTotalListPrice()}
                    isDeal={product.tags.includes('todays-deal')}
                    forListing={false}
                    className="text-2xl sm:text-3xl font-bold"
                  />
                </div>

                {/* Description */}
                <div className="prose prose-lg max-w-none">
                  <h1 className='font-bold text-lg'>Description:</h1>
                  <p className="text-gray-700  text-md leading-relaxed break-words">
                    {product.description}
                  </p>
                </div>

                {/* Variant Selectors */}
                <div className="space-y-6">
                  {product.variant?.map((variant: VariantGroup) => (
                    <div key={variant.title} className="bg-white border border-gray-200 rounded-xl p-6">
                      <SelectVariant
                        product={product}
                        variant={variant}
                        onChangeVariant={(newOption) => handleVariantChange(variant.title, newOption[variant.title])}
                      />
                    </div>
                  ))}
                </div>

                {/* Add to Cart */}
                {product.countInStock > 0 ? (
                  <div className="bg-white border border-gray-200 rounded-xl p-6">
                    <AddToCart
                      item={{
                        clientId: generateId(),
                        product: product.slug,
                        countInStock: product.countInStock,
                        name: product.name,
                        slug: product.slug,
                        category: categoryName,
                        price: round2(calculateTotalPrice()),
                        quantity: 1,
                        shippingInfo: product.shippingInfo,
                        images: product.images,
                        variant: Object.entries(selectedVariants).map(([title, option]) => ({ 
                          title, 
                          option: {
                            label: option.label,
                            price: option.price,
                            stock: option.stock,
                            listPrice: option.listPrice,
                            image: option.image,
                            sku: option.sku
                          }
                        })),
                      }}
                    />
                  </div>
                ) : (
                  <div className="bg-gray-50 rounded-xl p-6 text-center">
                    <div className="text-gray-500 mb-4">
                      <svg className="w-16 h-16 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
                      </svg>
                      <h3 className="text-xl font-bold text-gray-900 mb-2">Out of Stock</h3>
                      <p className="text-gray-600">This product is currently unavailable</p>
                    </div>
                    <button className="bg-gray-300 text-gray-500 font-semibold py-4 px-8 rounded-lg cursor-not-allowed w-full">
                      Notify When Available
                    </button>
                  </div>
                )}

                {/* Trust Badges */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 pt-6">
                  <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
                    <svg className="w-8 h-8 text-green-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <div>
                      <div className="font-semibold text-gray-900">Free Shipping</div>
                      <div className="text-sm text-gray-600">On orders over $50</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
                    <svg className="w-8 h-8 text-blue-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 8v8m-4-5v5m-4-2v2m-2 4h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <div>
                      <div className="font-semibold text-gray-900">30-Day Returns</div>
                      <div className="text-sm text-gray-600">Money back guarantee</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
                    <svg className="w-8 h-8 text-purple-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                    <div>
                      <div className="font-semibold text-gray-900">Secure Payment</div>
                      <div className="text-sm text-gray-600">100% protected</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Tabs Section */}
        <section className="mb-16">
          <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
            <div className="border-b border-gray-200">
              <div className="flex overflow-x-auto no-scrollbar">
                <button 
                  className={`flex-1 sm:flex-none py-4 px-6 border-b-2 whitespace-nowrap text-sm font-semibold transition-all duration-200 ${
                    activeTab === 'details' 
                      ? 'border-blue-600 text-blue-600 bg-blue-50' 
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:bg-gray-50'
                  }`}
                  onClick={() => setActiveTab('details')}
                >
                  Product Details
                </button>
                <button 
                  className={`flex-1 sm:flex-none py-4 px-6 border-b-2 whitespace-nowrap text-sm font-semibold transition-all duration-200 ${
                    activeTab === 'reviews' 
                      ? 'border-blue-600 text-blue-600 bg-blue-50' 
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:bg-gray-50'
                  }`}
                  onClick={() => setActiveTab('reviews')}
                >
                  Customer Reviews ({mockReviews.length})
                </button>
                <button 
                  className={`flex-1 sm:flex-none py-4 px-6 border-b-2 whitespace-nowrap text-sm font-semibold transition-all duration-200 ${
                    activeTab === 'faqs' 
                      ? 'border-blue-600 text-blue-600 bg-blue-50' 
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:bg-gray-50'
                  }`}
                  onClick={() => setActiveTab('faqs')}
                >
                  FAQs ({mockFAQs.length})
                </button>
              </div>
            </div>
            
            {/* Tab Content */}
            <div className="p-6 sm:p-8">
              {renderTabContent()}
            </div>
          </div>
        </section>

            {/* Related Products from Same Subcategory */}
        {subCategoryProducts.length > 0 && (
          <section className="mb-8">
            <div className="text-center mb-8">
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3">
                More from {subCategoryName}
              </h2>
              <p className="text-gray-600 text-lg">
                Discover similar products in this collection
              </p>
            </div>
            <ProductSlider products={subCategoryProducts} />
          </section>
        )}

        {/* Related Products */}
        <section className="mb-8">
          <div className="text-center mb-8">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3">You Might Also Like</h2>
            <p className="text-gray-600 text-lg">Customers who bought this item also viewed</p>
          </div>
          <ProductSlider products={relatedProducts}/>
        </section>
      </div>
    </div>
  );
}