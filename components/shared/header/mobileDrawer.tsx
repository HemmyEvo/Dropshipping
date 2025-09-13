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
  LogOut
} from 'lucide-react'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'

export default function MobileDrawer() {
  const [open, setOpen] = useState(false)
  const [userStatus, setUserStatus] = useState('guest')
  
  // Simulate user authentication status
  useEffect(() => {
    // Check if user is logged in (in a real app, this would be from context or store)
    const isLoggedIn = localStorage.getItem('userLoggedIn') === 'true'
    setUserStatus(isLoggedIn ? 'member' : 'guest')
  }, [])
  
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

  const navigationItems = [
    { title: 'Home', path: '/', icon: null },
    { title: 'Flash Sale', path: '/flash-sale', icon: Clock, badge: 'HOT' },
    { title: 'Categories', path: '/categories', icon: null },
    { title: 'My Orders', path: '/orders', icon: null },
    { title: 'My Wishlist', path: '/wishlist', icon: Heart },
    { title: 'My Reviews', path: '/reviews', icon: Star },
    { title: 'Coupons', path: '/coupons', icon: Ticket, badge: 'NEW' },
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
      <DrawerContent className="h-full w-80 rounded-none mt-0 fixed left-0 bottom-0 bg-gradient-to-b from-purple-50 to-white">
        <div className="p-4 h-full flex flex-col overflow-y-auto">
          {/* Header with close button */}
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              Menu
            </h2>
            <button 
              onClick={() => setOpen(false)}
              className="p-1 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
            >
              <XIcon className="h-5 w-5" />
            </button>
          </div>
          
          {/* User section */}
          <div className="bg-white rounded-xl p-4 shadow-sm mb-4">
            {userStatus === 'guest' ? (
              <div className="flex flex-col items-center">
                <div className="w-16 h-16 rounded-full bg-gradient-to-r from-purple-400 to-pink-400 flex items-center justify-center mb-2">
                  <User className="h-8 w-8 text-white" />
                </div>
                <p className="text-sm text-gray-600 mb-3">Hello, Guest!</p>
                <Button 
                  onClick={handleLogin}
                  className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white"
                >
                  Sign In / Register
                </Button>
              </div>
            ) : (
              <div className="flex items-center">
                <div className="w-14 h-14 rounded-full bg-gradient-to-r from-purple-400 to-pink-400 flex items-center justify-center mr-3">
                  <User className="h-6 w-6 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold">Welcome Back!</h3>
                  <p className="text-sm text-gray-600">Member since 2023</p>
                </div>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={handleLogout}
                  className="flex items-center gap-1"
                >
                  <LogOut className="h-4 w-4" />
                  Logout
                </Button>
              </div>
            )}
          </div>
          
          {/* Navigation items */}
          <div className="bg-white rounded-xl p-2 shadow-sm mb-4">
            <h3 className="font-semibold px-3 py-2">Main Navigation</h3>
            <nav className="flex flex-col">
              {navigationItems.map((item, index) => {
                const IconComponent = item.icon
                return (
                  <Link
                    key={index}
                    href={item.path}
                    className="flex items-center px-3 py-3 rounded-lg transition-colors hover:bg-purple-50 group"
                    onClick={() => setOpen(false)}
                  >
                    {IconComponent && (
                      <IconComponent className="h-5 w-5 mr-3 text-purple-600 group-hover:text-pink-600" />
                    )}
                    <span className="flex-1 font-medium">{item.title}</span>
                    {item.badge && (
                      <Badge variant="outline" className="bg-pink-100 text-pink-700 border-pink-200 text-xs">
                        {item.badge}
                      </Badge>
                    )}
                  </Link>
                )
              })}
            </nav>
          </div>
          
          {/* Support items */}
          <div className="bg-white rounded-xl p-2 shadow-sm mb-4">
            <h3 className="font-semibold px-3 py-2">Support</h3>
            <nav className="flex flex-col">
              {supportItems.map((item, index) => {
                const IconComponent = item.icon
                return (
                  <Link
                    key={index}
                    href={item.path}
                    className="flex items-center px-3 py-3 rounded-lg transition-colors hover:bg-purple-50 group"
                    onClick={() => setOpen(false)}
                  >
                    {IconComponent && (
                      <IconComponent className="h-5 w-5 mr-3 text-purple-600 group-hover:text-pink-600" />
                    )}
                    <span className="flex-1 font-medium">{item.title}</span>
                  </Link>
                )
              })}
            </nav>
          </div>
          
          {/* App download promo */}
          <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl p-4 text-white mb-4">
            <h3 className="font-bold mb-2">Get the App!</h3>
            <p className="text-sm mb-3">Enjoy exclusive app-only deals</p>
            <div className="flex gap-2">
              <Button variant="secondary" size="sm" className="flex-1 bg-white text-purple-700 hover:bg-gray-100">
                Google Play
              </Button>
              <Button variant="secondary" size="sm" className="flex-1 bg-white text-purple-700 hover:bg-gray-100">
                App Store
              </Button>
            </div>
          </div>
          
          {/* Footer */}
          <div className="mt-auto pt-4 text-center text-xs text-gray-500">
            <p>© 2023 {process.env.NEXT_PUBLIC_APP_NAME || 'ShopApp'}. All rights reserved.</p>
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  )
}