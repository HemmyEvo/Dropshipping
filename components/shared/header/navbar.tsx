'use client'
import { ChevronDown } from 'lucide-react'
import React, { useState } from 'react'

function Navbar() {
  const [isHovered, setIsHovered] = useState(false)
  
  const shopItems = [
    { title: 'All Products', path: '/products' },
    { title: 'Electronics', path: '/category/electronics' },
    { title: 'Fashion', path: '/category/fashion' },
    { title: 'Home & Garden', path: '/category/home-garden' },
    { title: 'Beauty & Health', path: '/category/beauty-health' },
  ]

  return (
    <nav className="flex items-center space-x-6">
      <div 
        className="relative group"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <button className="flex items-center font-medium text-sm transition-colors hover:text-purple-600">
          Shop
          <ChevronDown className="ml-1 h-4 w-4 transition-transform group-hover:rotate-180" />
        </button>
        
        {isHovered && (
          <div className="absolute top-full left-0 w-48 bg-white border rounded-md shadow-lg py-2 z-10 animate-in fade-in-50">
            {shopItems.map((item, index) => (
              <a
                key={index}
                href={item.path}
                className="block px-4 py-2 text-sm hover:bg-purple-50 transition-colors"
              >
                {item.title}
              </a>
            ))}
          </div>
        )}
      </div>
      
      <a href="/search?tag=discount-sales" className="font-medium text-sm transition-colors hover:text-purple-600">
        Discount Sales
      </a>
      
      <a href="/search?tag=new-arrivals" className="font-medium text-sm transition-colors hover:text-purple-600">
        New Arrivals
      </a>
      
      <a href="/search?tag=brands" className="font-medium text-sm transition-colors hover:text-purple-600">
        Brands
      </a>
    </nav>
  )
}

export default Navbar