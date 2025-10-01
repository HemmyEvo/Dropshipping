/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer"
import { 
  AlignLeftIcon, 
  XIcon, 
  User, 
  Heart, 
  Clock, 
  Star, 
  Gift, 
  Ticket, 
  Shield, 
  HelpCircle,
  Globe,
  LogOut,
  ChevronRight,
  ChevronDown
} from 'lucide-react'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { getAllNav } from '@/lib/actions/product.action'

interface Category {
  name: string;
  subcategories?: string[];
}

interface DrawerCategory extends Category {
  subCategories?: string[]; // For backward compatibility with mock data
}

export default function MobileDrawer() {
  const [open, setOpen] = useState(false)
  const [userStatus, setUserStatus] = useState('guest')
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null)
  const [categories, setCategories] = useState<DrawerCategory[]>([])

  // Simulate user authentication status
  useEffect(() => {
    const isLoggedIn = localStorage.getItem('userLoggedIn') === 'true'
    setUserStatus(isLoggedIn ? 'member' : 'guest')
  }, [])

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const categoriesData = await getAllNav();
        
        // Transform the data to match the expected structure
        const transformedCategories = categoriesData.categories.slice(0, 6).map((category: any) => ({
          name: category.name,
          // Use subcategories from DB if available, otherwise empty array
          subCategories: category.subcategories || []
        }));
        
        setCategories(transformedCategories);
      } catch (error) {
        console.error("Failed to fetch categories, using mock data:", error);
        // Use mock data with proper structure
        setCategories([
          { name: "Electronics", subCategories: ["Phones & Accessories", "Computers & Tablets", "Audio & Headphones", "Wearable Technology"] },
          { name: "Fashion", subCategories: ["Men's Clothing", "Women's Clothing", "Shoes", "Accessories", "Jewelry"] },
          { name: "Home & Garden", subCategories: ["Furniture", "Kitchen & Dining", "Home Decor", "Garden & Outdoor"] },
          { name: "Beauty & Health", subCategories: ["Skincare", "Makeup", "Hair Care", "Personal Care"] }
        ]);
      }
    };
    fetchCategories();
  }, []);

  const handleLogin = () => {
    localStorage.setItem('userLoggedIn', 'true')
    setUserStatus('member')
    setOpen(false)
  }

  const handleLogout = () => {
    localStorage.setItem('userLoggedIn', 'false')
    setUserStatus('guest')
    setOpen(false)
  }

  const toggleCategory = (categoryName: string) => {
    if (expandedCategory === categoryName) {
      setExpandedCategory(null);
    } else {
      setExpandedCategory(categoryName);
    }
  };

  const navigationItems = [
    { title: 'Home', path: '/', icon: null },
    { title: 'Flash Sale', path: '/flash-sale', icon: Clock, badge: 'HOT' },
    { title: 'My Orders', path: '/orders', icon: null },
    { title: 'My Wishlist', path: '/wishlist', icon: Heart },
    { title: 'My Reviews', path: '/reviews', icon: Star },
    
    { title: 'Invite Friends', path: '/invite', icon: Gift },
  ]

  const supportItems = [
    { title: 'Help Center', path: '/help', icon: HelpCircle },
    { title: 'Privacy & Security', path: '/privacy', icon: Shield },
    { title: 'Language', path: '/language', icon: Globe },
  ]

  return (
    <Drawer open={open} onOpenChange={setOpen} direction="left">
      <DrawerTrigger asChild className="md:hidden">
        <AlignLeftIcon className="h-6 w-6 cursor-pointer" />
      </DrawerTrigger>
      <DrawerContent className="h-full w-80 rounded-none mt-0 fixed left-0 bottom-0 bg-white border-r">
        <div className="p-4 h-full flex flex-col overflow-y-auto">
          {/* Header with close button */}
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold text-gray-900">Menu</h2>
            <button 
              onClick={() => setOpen(false)}
              className="p-1.5 rounded-md bg-gray-100 hover:bg-gray-200 transition-colors"
              aria-label="Close menu"
            >
              <XIcon className="h-5 w-5 text-gray-600" />
            </button>
          </div>

          {/* User section */}
          <div className="bg-gray-50 rounded-lg p-4 mb-6 border">
            {userStatus === 'guest' ? (
              <div className="flex flex-col items-center">
                <div className="w-16 h-16 rounded-full bg-gray-200 flex items-center justify-center mb-3">
                  <User className="h-8 w-8 text-gray-600" />
                </div>
                <p className="text-sm text-gray-600 mb-4">Hello, Guest!</p>
                <Button 
                  onClick={handleLogin}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                >
                  Sign In / Register
                </Button>
              </div>
            ) : (
              <div className="flex items-center">
                <div className="w-14 h-14 rounded-full bg-blue-100 flex items-center justify-center mr-3">
                  <User className="h-6 w-6 text-blue-600" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900">Welcome Back!</h3>
                  <p className="text-sm text-gray-600">Member since 2023</p>
                </div>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={handleLogout}
                  className="flex items-center gap-1 border-gray-300"
                >
                  <LogOut className="h-4 w-4" />
                  Logout
                </Button>
              </div>
            )}
          </div>

          {/* Categories section */}
          <div className="bg-gray-50 rounded-lg p-3 mb-6 border">
            <h3 className="font-semibold px-2 py-2 text-gray-900">Categories</h3>
            <nav className="flex flex-col">
              {categories.map((category, index) => {
                const hasSubCategories = category.subCategories && category.subCategories.length > 0;

                return (
                  <div key={index} className="border-b border-gray-200 last:border-b-0">
                    <div 
                      className="flex items-center px-3 py-3 rounded-md transition-colors hover:bg-blue-50 group cursor-pointer"
                      onClick={() => hasSubCategories && toggleCategory(category.name)}
                    >
                      <span className="flex-1 font-medium text-gray-900">{category.name}</span>
                      {hasSubCategories && (
                        <ChevronDown className={`h-4 w-4 transition-transform text-gray-500 ${expandedCategory === category.name ? 'rotate-180' : ''}`} />
                      )}
                    </div>

                    {expandedCategory === category.name && hasSubCategories && (
                      <div className="pl-6 pb-2">
                        {category.subCategories!.map((subCategory, idx) => (
                          <Link
                            key={idx}
                            href={`/search?category=${encodeURIComponent(category.name)}&subCategory=${encodeURIComponent(subCategory)}`}
                            className="flex items-center px-3 py-2.5 rounded-md transition-colors hover:bg-blue-50 group text-sm text-gray-700"
                            onClick={() => setOpen(false)}
                          >
                            <ChevronRight className="h-3.5 w-3.5 mr-2 text-gray-400" />
                            <span>{subCategory}</span>
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                )
              })}
            </nav>
          </div>

          {/* Navigation items */}
          <div className="bg-gray-50 rounded-lg p-3 mb-6 border">
            <h3 className="font-semibold px-2 py-2 text-gray-900">Main Navigation</h3>
            <nav className="flex flex-col">
              {navigationItems.map((item, index) => {
                const IconComponent = item.icon
                return (
                  <Link
                    key={index}
                    href={item.path}
                    className="flex items-center px-3 py-3 rounded-md transition-colors hover:bg-blue-50 group text-gray-700"
                    onClick={() => setOpen(false)}
                  >
                    {IconComponent && (
                      <IconComponent className="h-5 w-5 mr-3 text-gray-600 group-hover:text-blue-600" />
                    )}
                    <span className="flex-1 font-medium">{item.title}</span>
                    {item.badge && (
                      <Badge variant="outline" className="bg-red-100 text-red-700 border-red-200 text-xs">
                        {item.badge}
                      </Badge>
                    )}
                  </Link>
                )
              })}
            </nav>
          </div>

          {/* Support items */}
          <div className="bg-gray-50 rounded-lg p-3 mb-6 border">
            <h3 className="font-semibold px-2 py-2 text-gray-900">Support</h3>
            <nav className="flex flex-col">
              {supportItems.map((item, index) => {
                const IconComponent = item.icon
                return (
                  <Link
                    key={index}
                    href={item.path}
                    className="flex items-center px-3 py-3 rounded-md transition-colors hover:bg-blue-50 group text-gray-700"
                    onClick={() => setOpen(false)}
                  >
                    {IconComponent && (
                      <IconComponent className="h-5 w-5 mr-3 text-gray-600 group-hover:text-blue-600" />
                    )}
                    <span className="flex-1 font-medium">{item.title}</span>
                  </Link>
                )
              })}
            </nav>
          </div>

          {/* Footer */}
          <div className="mt-auto pt-4 text-center text-xs text-gray-500">
            <p>© 2025 {process.env.NEXT_PUBLIC_APP_NAME || 'ShopApp'}. All rights reserved.</p>
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  )
}