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
  
  // Safely access category name - handle both old and new category structures
  const categoryName = typeof product.category === 'object' && product.category !== null
    ? product.category.name // New structure: { name: string, subcategories: string[] }
    : product.category;     // Old structure: string
  
  // Build selected variants from URL
  const selectedVariants: {
    title: string;
    option: {
      label: string;
      price: number;
      stock: number;
      listPrice?: number;
      image?: { id: string; url: string; alt?: string };
      sku?: string;
    };
  }[] = [];

  if (product.variant && product.variant.length > 0) {
    product.variant.forEach((variant: VariantGroup) => {
      const selectedLabel =
        searchParams[variant.title.toLowerCase()] || variant.options[0].label;

      const selectedOption =
        variant.options.find((opt) => opt.label === selectedLabel) ||
        variant.options[0];

      selectedVariants.push({ title: variant.title, option: selectedOption });
    });
  }

  const loadMoreReviews = () => {
    setReviewsToShow(prev => prev + 3);
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
            <h3 className="text-xl font-semibold mb-6">All Reviews ({mockReviews.length})</h3>
            <div className="space-y-8">
              {mockReviews.slice(0, reviewsToShow).map((review) => (
                <div key={review.id} className="border-b border-gray-200 pb-8 last:border-0">
                  <div className="flex items-start mb-4">
                    <div className="flex items-center mr-4">
                      <Rating rating={review.rating} />
                    </div>
                    <h4 className="text-lg font-medium">{review.user}</h4>
                  </div>
                  <p className="text-gray-700 mb-2">{review.comment}</p>
                  <p className="text-sm text-gray-500">Posted on {review.date}</p>
                </div>
              ))}
            </div>
            {reviewsToShow < mockReviews.length && (
              <button 
                onClick={loadMoreReviews}
                className="mt-8 bg-gray-100 hover:bg-gray-200 text-gray-800 font-medium py-3 px-6 rounded-md transition-colors"
              >
                Load More Reviews
              </button>
            )}
          </div>
        );
      case 'faqs':
        return (
          <div className="mt-8">
            <h3 className="text-xl font-semibold mb-6">Frequently Asked Questions</h3>
            <div className="space-y-6">
              {mockFAQs.map((faq) => (
                <div key={faq.id}>
                  <h4 className="font-medium text-gray-900 mb-2">{faq.question}</h4>
                  <p className="text-gray-700">{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <Breadcrumb
        customItems={[
          { label: 'Home', href: '/' },
          { label: 'Shop', href: '/shop' },
          { label: 'Men', href: '/shop/men' },
          { label: 'T-shirts', href: '/shop/men/t-shirts' },
        ]}
      />

      <section className="mt-6">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-2">
          {/* Left - Gallery */}
          <div className="w-full">
            <ProductGallery images={product.images} />
          </div>

          {/* Right - Info */}
          <div className="flex w-full flex-col">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">{product.name}</h1>
            
            <div className="flex items-center gap-4 mb-6">
              <div className="flex items-center">
                <Rating rating={product.avgRating} />
                <span className="ml-2 text-sm text-gray-600">{product.avgRating.toFixed(1)}</span>
              </div>
              <span className="text-sm text-gray-600">{product.numReviews} ratings</span>
            </div>

            <div className="mb-6">
              <ProductPrice
                price={product.price}
                listPrice={product.listPrice}
                isDeal={product.tags.includes('todays-deal')}
                forListing={false}
                className="text-3xl font-bold"
              />
            </div>

            <p className="text-gray-700 mb-8 leading-relaxed">{product.description}</p>

            {/* Variant Selectors */}
            <div className="mb-8">
              {product.variant?.map((variant: VariantGroup) => (
                <div key={variant.title} className="mb-6">
                  <h3 className="text-lg font-medium text-gray-900 mb-3">{variant.title}</h3>
                  <SelectVariant
                    product={product}
                    variant={variant}
                    onChangeVariant={(newVariant) => {
                      const params = new URLSearchParams(window.location.search);
                      params.set(variant.title.toLowerCase(), newVariant[variant.title]);
                      params.set('page', '1');

                      const newUrl = window.location.pathname + '?' + params.toString();
                      window.history.replaceState({}, '', newUrl);
                    }}
                  />
                </div>
              ))}
            </div>

            {product.countInStock > 0 && (
              <div className="mb-8">
                <AddToCart
                  item={{
                    clientId: generateId(),
                    product: product.slug,
                    countInStock: product.countInStock,
                    name: product.name,
                    slug: product.slug,
                    category: categoryName,
                    price: round2(product.price),
                    quantity: 1,
                    shippingInfo: product.shippingInfo,
                    images: product.images,
                    variant: selectedVariants,
                  }}
                />
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Tabs Section */}
      <section className="mt-16">
        <div className="border-b border-gray-200">
          <div className="flex space-x-8">
            <button 
              className={`py-4 px-1 border-b-2 ${activeTab === 'details' ? 'border-black text-gray-900' : 'border-transparent text-gray-500'} text-sm font-medium`}
              onClick={() => setActiveTab('details')}
            >
              Product Details
            </button>
            <button 
              className={`py-4 px-1 border-b-2 ${activeTab === 'reviews' ? 'border-black text-gray-900' : 'border-transparent text-gray-500'} text-sm font-medium`}
              onClick={() => setActiveTab('reviews')}
            >
              Rating & Reviews
            </button>
            <button 
              className={`py-4 px-1 border-b-2 ${activeTab === 'faqs' ? 'border-black text-gray-900' : 'border-transparent text-gray-500'} text-sm font-medium`}
              onClick={() => setActiveTab('faqs')}
            >
              FAQs
            </button>
          </div>
        </div>
        
        {/* Tab Content */}
        {renderTabContent()}
      </section>
    </div>
  );
}