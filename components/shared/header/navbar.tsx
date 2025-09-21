/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'
import { ChevronDown, ChevronRight } from 'lucide-react'
import React, { useState, useEffect } from 'react'
import { getAllCategories } from '@/lib/actions/product.action'

interface Category {
  name: string;
  subcategories?: string[];
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

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        // Try to fetch real categories first
        const categoriesData = await getAllCategories();
        
        // Check if we have subcategories in the response
        const hasSubcategories = categoriesData.categories.some((cat: any) => 
          cat.subcategories && Array.isArray(cat.subcategories)
        );
        
        if (hasSubcategories) {
          // Use the categories as they are from the API
          setCategories(categoriesData.categories.slice(0, 6));
        } else {
          // Map the category strings to objects and use mock subcategories
          const transformedCategories = categoriesData.categories.map((category: any) => {
            const categoryName = typeof category === 'object' ? category.name : category;
            const mockCategory = mockCategoriesWithSubs.find(mock => 
              mock.name.toLowerCase() === categoryName.toLowerCase()
            );
            
            return {
              name: categoryName,
              subcategories: mockCategory?.subcategories || []
            };
          });
          
          setCategories(transformedCategories.slice(0, 6));
        }
      } catch (error) {
        // Fallback to mock data if API fails
        console.error("Failed to fetch categories, using mock data:", error);
        setCategories(mockCategoriesWithSubs);
      }
    };
    fetchCategories();
  }, []);

  const handleCategoryHover = (category: Category) => {
    setActiveCategory(category);
    setIsHovered(true);
  };

  return (
    <nav className="flex items-center space-x-6">
      <div 
        className="relative group"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => {
          setIsHovered(false);
          setActiveCategory(null);
        }}
      >
        <button className="flex items-center font-medium text-sm transition-colors hover:text-purple-600 bg-purple-100 px-3 py-2 rounded-md">
          Categories
          <ChevronDown className="ml-1 h-4 w-4 transition-transform group-hover:rotate-180" />
        </button>
        
        {isHovered && (
          <div className="absolute top-full left-0 w-96 bg-white border rounded-md shadow-lg py-2 z-50 animate-in fade-in-50 flex">
            {/* Categories List */}
            <div className="w-1/2 border-r p-2">
              {categories.map((category, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between px-4 py-2 text-sm hover:bg-purple-50 transition-colors rounded-md"
                  onMouseEnter={() => handleCategoryHover(category)}
                >
                  <span>{category.name}</span>
                  {category.subcategories && category.subcategories.length > 0 && (
                    <ChevronRight className="h-4 w-4" />
                  )}
                </div>
              ))}
            </div>
            
            {/* Subcategories Panel */}
            <div className="w-1/2 p-2">
              {activeCategory && activeCategory.subcategories && activeCategory.subcategories.length > 0 && (
                <>
                  <h3 className="font-semibold px-2 py-1 text-purple-700">{activeCategory.name}</h3>
                  <div className="grid grid-cols-1 gap-1">
                    {activeCategory.subcategories.map((subCategory, idx) => (
                      <a
                        key={idx}
                        href={`/search?category=${activeCategory.name}&subCategory=${subCategory.toLowerCase().replace(/\s+/g, '-')}`}
                        className="block px-2 py-1 text-sm hover:bg-purple-50 transition-colors rounded-md"
                      >
                        {subCategory}
                      </a>
                    ))}
                  </div>
                </>
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
  )
}