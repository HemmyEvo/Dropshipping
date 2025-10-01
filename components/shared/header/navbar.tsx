/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'
import { ChevronDown, ChevronRight } from 'lucide-react'
import React, { useState, useEffect } from 'react'
import { getAllNav } from '@/lib/actions/product.action'

interface Category {
  name: string;
  subcategories: string[];
}

// Mock data for demonstration
const mockCategoriesWithSubs = [
  { name: "Electronics", subcategories: ["Phones & Accessories", "Computers & Tablets", "Audio & Headphones", "Wearable Technology"] },
  { name: "Fashion", subcategories: ["Men's Clothing", "Women's Clothing", "Shoes", "Accessories", "Jewelry"] },
  { name: "Home & Garden", subcategories: ["Furniture", "Kitchen & Dining", "Home Decor", "Garden & Outdoor"] },
  { name: "Beauty & Health", subcategories: ["Skincare", "Makeup", "Hair Care", "Personal Care"] }
];

export default function Navbar() {
  const [isHovered, setIsHovered] = useState(false)
  const [activeCategory, setActiveCategory] = useState<Category | null>(null)
  const [categories, setCategories] = useState<Category[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setIsLoading(true);
        const categoriesData = await getAllNav();
        console.log("Fetched categories:", categoriesData);
        
        // The API now returns categories in the correct format
        if (categoriesData.categories && categoriesData.categories.length > 0) {
          // Filter out categories without subcategories and limit to 6
          const validCategories = categoriesData.categories
            .filter((cat: Category) => cat.subcategories && cat.subcategories.length > 0)
            .slice(0, 6);
          
          if (validCategories.length > 0) {
            setCategories(validCategories);
          } else {
            // Fallback to mock data if no valid categories with subcategories
            setCategories(mockCategoriesWithSubs);
          }
        } else {
          // Fallback to mock data if no categories returned
          setCategories(mockCategoriesWithSubs);
        }
      } catch (error) {
        console.error("Failed to fetch categories, using mock data:", error);
        setCategories(mockCategoriesWithSubs);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchCategories();
  }, []);

  const handleCategoryHover = (category: Category) => {
    setActiveCategory(category);
  };

  const handleMouseLeave = () => {
    // Add a small delay to prevent flickering when moving to subcategories
    setTimeout(() => {
      setIsHovered(false);
      setActiveCategory(null);
    }, 100);
  };

  if (isLoading) {
    return (
      <nav className="flex items-center space-x-6">
        <div className="flex items-center font-medium text-sm text-gray-400 bg-gray-100 px-3 py-2 rounded-md">
          Loading...
        </div>
        {['Flash Sale', 'New Arrivals', 'Best Sellers', 'Brands'].map((item) => (
          <div key={item} className="font-medium text-sm text-gray-300">
            {item}
          </div>
        ))}
      </nav>
    );
  }

  return (
    <nav className="flex items-center space-x-6">
      <div 
        className="relative group"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={handleMouseLeave}
      >
        <button className="flex items-center font-medium text-sm transition-colors hover:text-purple-600 bg-purple-100 px-3 py-2 rounded-md">
          Categories
          <ChevronDown className="ml-1 h-4 w-4 transition-transform group-hover:rotate-180" />
        </button>
        
        {isHovered && categories.length > 0 && (
          <div className="absolute top-full left-0 w-96 bg-white border rounded-md shadow-lg py-2 z-50 animate-in fade-in-50 flex">
            {/* Categories List */}
            <div className="w-1/2 border-r p-2">
              {categories.map((category, index) => (
                <div
                  key={index}
                  className={`flex items-center justify-between px-4 py-2 text-sm hover:bg-purple-50 transition-colors rounded-md cursor-pointer ${
                    activeCategory?.name === category.name ? 'bg-purple-50 text-purple-700' : ''
                  }`}
                  onMouseEnter={() => handleCategoryHover(category)}
                >
                  <span className="truncate">{category.name}</span>
                  {category.subcategories && category.subcategories.length > 0 && (
                    <ChevronRight className="h-4 w-4 flex-shrink-0" />
                  )}
                </div>
              ))}
            </div>
            
            {/* Subcategories Panel */}
            <div className="w-1/2 p-2">
              {activeCategory && activeCategory.subcategories.length > 0 ? (
                <>
                  <h3 className="font-semibold px-2 py-1 text-purple-700 border-b mb-2 truncate">
                    {activeCategory.name}
                  </h3>
                  <div className="space-y-1 max-h-64 overflow-y-auto">
                    {activeCategory.subcategories.map((subCategory, idx) => (
                      <a
                        key={idx}
                        href={`/search?category=${encodeURIComponent(activeCategory.name)}&subCategory=${encodeURIComponent(subCategory)}`}
                        className="block px-2 py-2 text-sm hover:bg-purple-50 transition-colors rounded-md hover:text-purple-700 truncate"
                        onClick={() => {
                          setIsHovered(false);
                          setActiveCategory(null);
                        }}
                      >
                        {subCategory}
                      </a>
                    ))}
                  </div>
                </>
              ) : (
                <div className="flex items-center justify-center h-full text-gray-500 text-sm">
                  {activeCategory ? 'No subcategories' : 'Select a category'}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
      
      <a href="/search?tag=flash-sale" className="font-medium text-sm transition-colors hover:text-red-600 text-red-500">
        Flash Sale
      </a>
      
      <a href="/search?tag=new-arrivals" className="font-medium text-sm transition-colors hover:text-purple-600">
        New Arrivals
      </a>
      
      <a href="/search?tag=best-sellers" className="font-medium text-sm transition-colors hover:text-purple-600">
        Best Sellers
      </a>
      
      <a href="/brands" className="font-medium text-sm transition-colors hover:text-purple-600">
        Brands
      </a>
    </nav>
  );
}