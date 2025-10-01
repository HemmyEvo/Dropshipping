/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import React, { useState } from 'react';
import SelectVariant from '@/components/shared/product/select-variant';
import ProductPrice from '@/components/shared/product/product-price';
import ProductGallery from '@/components/shared/product/product-gallery';
import Rating from '@/components/shared/product/rating';
import { VariantGroup, IProductInput } from '@/types';
import Breadcrumb from '@/components/shared/product/bread-crumb';
import AddToCart from '@/components/shared/product/add-to-cart';
import { generateId, round2 } from '@/lib/utils';
import ProductSlider from '@/components/shared/product/product-slider';

type Props = {
  product: IProductInput;
  relatedProducts: IProductInput[];
  searchParams: { [key: string]: string };
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
  material: "100% Cotton",
  fit: "Regular Fit",
  care: "Machine wash cold, tumble dry low",
  sku: "OL-TS-001",
  weight: "0.4 lbs",
  dimensions: "10 × 12 × 1 in"
};

export default function ProductClient({ product, relatedProducts, searchParams }: Props) {
  const [activeTab, setActiveTab] = useState('details');
  const [reviewsToShow, setReviewsToShow] = useState(3);
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
    // Initialize with first option for each variant
    const initial: any = {};
    if (product.variant) {
      product.variant.forEach((variant) => {
        initial[variant.title] = variant.options[0];
      });
    }
    return initial;
  });

  const handleVariantChange = (variantTitle: string, newOption: any) => {
    setSelectedVariants((prev) => ({
      ...prev,
      [variantTitle]: newOption,
    }));
  };

  const categoryName = typeof product.category === 'object' && product.category !== null
    ? product.category.name
    : product.category;

  const loadMoreReviews = () => {
    setReviewsToShow(prev => Math.min(prev + 3, mockReviews.length));
  };

  const calculateTotalPrice = () => {
    let totalPrice = product.price;
    Object.values(selectedVariants).forEach(variant => {
      totalPrice += variant.price || 0;
    });
    return totalPrice;
  };

  const calculateTotalListPrice = () => {
    let totalListPrice = product.listPrice || product.price;
    Object.values(selectedVariants).forEach(variant => {
      totalListPrice += variant.listPrice || variant.price || 0;
    });
    return totalListPrice;
  };

  const renderTabContent = () => {
    switch(activeTab) {
      case 'details':
        return (
          <div className="mt-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-semibold mb-4">Product Information</h3>
                <div className="space-y-3">
                  <div className="flex">
                <span className="w-32 font-medium text-gray-600">Material:</span>
                    <span>{productDetails.material}</span>
                  </div>
     <div className="flex">
                    <span className="w-32 font-medium text-gray-600">Fit:</span>
                    <span>{productDetails.fit}</span>
                  </div>
                  <div className="flex">
                    <span className="w-32 font-medium text-gray-600">Care:</span>
                    <span>{productDetails.care}</span>
                  </div>
                </div>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-4">Additional Details</h3>
                <div className="space-y-3">
                   <div className="flex">
                    <span className="w-32 font-medium text-gray-600">SKU:</span>
                    <span>{productDetails.sku}</span>
                  </div>
                  <div className="flex">
                    <span className="w-32 font-medium text-gray-600">Weight:</span>
                    <span>{productDetails.weight}</span>
                  </div>
                  <div className="flex">
                    <span className="w-32 font-medium text-gray-600">Dimensions:</span>
                    <span>{productDetails.dimensions}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      case 'reviews':
        return (
          <div className="mt-8">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold">All Reviews ({mockReviews.length})</h3>
              <div className="flex items-center gap-4">
                <div className="flex items-center">
                  <Rating rating={product.avgRating} />
                  <span className="ml-2 text-lg font-medium">{product.avgRating.toFixed(1)}</span>
                </div>
                <span className="text-gray-600">({product.numReviews} ratings)</span>
              </div>
            </div>
            <div className="space-y-8">
              {mockReviews.slice(0, reviewsToShow).map((review) => (
                <div key={review.id} className="border-b border-gray-200 pb-8 last:border-0">
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-4">
                    <div className="flex items-center">
                      <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                        <span className="font-medium text-gray-700">
                          {review.user.charAt(0)}
                        </span>
                      </div>
                      <div className="min-w-0">
                        <h4 className="text-lg font-medium truncate">{review.user}</h4>
                        <div className="flex items-center mt-1">
                          <Rating rating={review.rating} />
                        </div>
                      </div>
                    </div>
                    <p className="text-sm text-gray-500 flex-shrink-0">{review.date}</p>
                  </div>
                  <p className="text-gray-700 leading-relaxed break-words">{review.comment}</p>
                </div>
              ))}
            </div>
            {reviewsToShow < mockReviews.length && (
              <div className="text-center mt-8">
                <button 
                  onClick={loadMoreReviews}
                  className="bg-gray-100 hover:bg-gray-200 text-gray-800 font-medium py-3 px-8 rounded-md transition-colors duration-200 w-full sm:w-auto"
                >
                  Load More Reviews ({mockReviews.length - reviewsToShow} remaining)
                </button>
              </div>
            )}
          </div>
        );
      case 'faqs':
        return (
          <div className="mt-8">
            <h3 className="text-xl font-semibold mb-6">Frequently Asked Questions</h3>
            <div className="space-y-6">
              {mockFAQs.map((faq) => (
                <div key={faq.id} className="border border-gray-200 rounded-lg p-4 sm:p-6 hover:border-gray-300 transition-colors">
                  <h4 className="font-semibold text-gray-900 mb-3 text-lg break-words">{faq.question}</h4>
                  <p className="text-gray-700 leading-relaxed break-words">{faq.answer}</p>
                </div>
              ))}
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
    { label: categoryName || 'Products', href: `/shop/${categoryName?.toLowerCase()}` },
    { label: product.name, href: `#` },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-8">
      <div className="overflow-hidden w-full">
        <Breadcrumb customItems={breadcrumbItems} />

        <section className="mt-6">
          <div className="grid grid-cols-1 gap-8 lg:gap-12 lg:grid-cols-2">
            {/* Left - Gallery */}
            <div className="w-full">
              <ProductGallery images={product.images} />
            </div>

            {/* Right - Info */}
            <div className="flex w-full flex-col">
              <div className="mb-4">
                {product.tags.includes('todays-deal') && (
                  <span className="inline-block bg-red-100 text-red-800 text-sm font-medium px-3 py-1 rounded-full mb-3">
                    Today&apos;s Deal
                  </span>
                )}
                {product.countInStock === 0 && (
                  <span className="inline-block bg-gray-100 text-gray-800 text-sm font-medium px-3 py-1 rounded-full mb-3">
                    Out of Stock
                  </span>
                )}
              </div>

              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-2 break-words">
                {product.name}
              </h1>
              
              <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 mb-6">
                <div className="flex items-center">
                  <Rating rating={product.avgRating} />
                  <span className="ml-2 text-sm text-gray-600">{product.avgRating.toFixed(1)}</span>
                </div>
                <span className="text-sm text-gray-600">({product.numReviews} ratings)</span>
                {product.countInStock > 0 && (
                  <span className="text-sm text-green-600 font-medium">
                    In Stock ({product.countInStock} available)
                  </span>
                )}
              </div>

              <div className="mb-6">
                <ProductPrice
                  price={calculateTotalPrice()}
                  listPrice={calculateTotalListPrice()}
                  isDeal={product.tags.includes('todays-deal')}
                  forListing={false}
                  className="text-2xl sm:text-3xl font-bold"
                />
              </div>

              <p className="text-gray-700 mb-6 sm:mb-8 leading-relaxed text-base sm:text-lg break-words">
                {product.description}
              </p>

              {/* Variant Selectors */}
              <div className="mb-6 sm:mb-8 space-y-4 sm:space-y-6">
                {product.variant?.map((variant: VariantGroup) => (
                  <SelectVariant
                    key={variant.title}
                    product={product}
                    variant={variant}
                    onChangeVariant={(newOption) => handleVariantChange(variant.title, newOption[variant.title])}
                  />
                ))}
              </div>

              {product.countInStock > 0 ? (
              <div className="mb-8 max-w-1/2 ">
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
              <div className="mb-8">
                  <button
                    disabled
                  className="w-full bg-gray-300 text-gray-500 font-semibold py-4 px-6 rounded-lg cursor-not-allowed"
                  >
                    Out of Stock
                  </button>
                </div>
              )}

              {/* Additional Product Info */}
              <div className="border-t border-gray-200 pt-4 sm:pt-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 text-sm">
                  <div className="flex items-center">
                    <svg className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                    </svg>
                    <span className="break-words">Free shipping on orders over $50</span>
                  </div>
                  <div className="flex items-center">
                    <svg className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 8v8m-4-5v5m-4-2v2m-2 4h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <span className="break-words">30-day money back guarantee</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Tabs Section */}
        <section className="mt-12 sm:mt-16 border-t border-gray-200 pt-8 sm:pt-12">
          <div className="border-b border-gray-200">
            <div className="flex space-x-4 sm:space-x-8 overflow-x-auto no-scrollbar">
              <button 
                className={`py-3 sm:py-4 cursor-pointer px-1 border-b-2 whitespace-nowrap flex-shrink-0 ${
                  activeTab === 'details' 
                    ? 'border-black text-gray-900 font-semibold' 
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                } text-sm font-medium transition-colors duration-200`}
                onClick={() => setActiveTab('details')}
              >
                Product Details
              </button>
              <button 
                className={`py-3 sm:py-4 cursor-pointer px-1 border-b-2 whitespace-nowrap flex-shrink-0 ${
                  activeTab === 'reviews' 
                    ? 'border-black text-gray-900 font-semibold' 
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                } text-sm font-medium transition-colors duration-200`}
                onClick={() => setActiveTab('reviews')}
              >
                Rating & Reviews ({mockReviews.length})
              </button>
              <button 
                className={`py-3 sm:py-4 cursor-pointer px-1 border-b-2 whitespace-nowrap flex-shrink-0 ${
                  activeTab === 'faqs' 
                    ? 'border-black text-gray-900 font-semibold' 
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                } text-sm font-medium transition-colors duration-200`}
                onClick={() => setActiveTab('faqs')}
              >
                FAQs ({mockFAQs.length})
              </button>
            </div>
          </div>
          
          {/* Tab Content */}
          <div className="py-6 sm:py-8">
            {renderTabContent()}
          </div>
        </section>

        {/* Related Products */}
        <section className="mt-12 sm:mt-16">
          <ProductSlider products={relatedProducts}/>
        </section>
      </div>
    </div>
  );
}