'use client'

import { usePathname } from 'next/navigation'
import Link from 'next/link'

interface BreadcrumbItem {
  label: string
  href: string
}

interface BreadcrumbProps {
  homeLabel?: string
  customItems?: BreadcrumbItem[]
  showHome?: boolean
  maxItems?: number
}

export default function Breadcrumb({ 
  homeLabel = 'Home', 
  customItems = [],
  showHome = true,
  maxItems = 5
}: BreadcrumbProps) {
  const pathname = usePathname()
  const paths = pathname.split('/').filter(Boolean)
  
  // Generate breadcrumb items from URL path
  const generatePathItems = (): BreadcrumbItem[] => {
    const items: BreadcrumbItem[] = []
    let accumulatedPath = ''
    
    paths.slice(0, maxItems).forEach((path, index) => {
      accumulatedPath += `/${path}`
      const label = formatLabel(path)
      items.push({ label, href: accumulatedPath })
    })
    
    return items
  }

  // Format path segment into readable label
  const formatLabel = (path: string): string => {
    return path
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ')
  }

  // Merge custom items with generated path items
  const getBreadcrumbItems = (): BreadcrumbItem[] => {
    if (customItems.length > 0) {
      return customItems
    }
    
    const pathItems = generatePathItems()
    if (showHome) {
      return [{ label: homeLabel, href: '/' }, ...pathItems]
    }
    
    return pathItems
  }

  const breadcrumbItems = getBreadcrumbItems()
  const isActive = (href: string, index: number) => {
    return index === breadcrumbItems.length - 1 || href === pathname
  }

  return (
    <nav className="flex items-center gap-2 text-sm mb-2" aria-label="Breadcrumb">
      <ol className="flex items-center gap-2 flex-wrap">
        {breadcrumbItems.map((item, index) => (
          <li key={index} className="flex items-center gap-2">
            {index > 0 && (
              <span className="text-gray-400 text-xs" aria-hidden="true">
                ›
              </span>
            )}
            
            {isActive(item.href, index) ? (
              <span 
                className="text-gray-800 font-medium truncate max-w-[120px] md:max-w-[160px] px-2 py-1 bg-gray-100 rounded-md"
                aria-current="page"
              >
                {item.label}
              </span>
            ) : (
              <Link
                href={item.href}
                className="text-blue-600 hover:text-blue-800 transition-colors truncate max-w-[120px] md:max-w-[160px] px-2 py-1 hover:bg-blue-50 rounded-md"
                prefetch={false}
              >
                {item.label}
              </Link>
            )}
          </li>
        ))}
      </ol>
      
      {/* Optional: Show ellipsis if there are too many items */}
      {paths.length > maxItems && (
        <span className="text-gray-400 text-sm">...</span>
      )}
    </nav>
  )
}

// Advanced version with icons and dropdown for long breadcrumbs
export function AdvancedBreadcrumb({ 
  homeLabel = 'Home', 
  customItems = [],
  showHome = true,
  maxItems = 4
}: BreadcrumbProps) {
  const pathname = usePathname()
  const paths = pathname.split('/').filter(Boolean)
  
  const generatePathItems = (): BreadcrumbItem[] => {
    const items: BreadcrumbItem[] = []
    let accumulatedPath = ''
    
    paths.forEach((path, index) => {
      accumulatedPath += `/${path}`
      const label = formatLabel(path)
      items.push({ label, href: accumulatedPath })
    })
    
    return items
  }

  const formatLabel = (path: string): string => {
    return path
      .split(/[-_]/)
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ')
  }

  const getBreadcrumbItems = (): BreadcrumbItem[] => {
    if (customItems.length > 0) {
      return customItems
    }
    
    const pathItems = generatePathItems()
    if (showHome) {
      return [{ label: homeLabel, href: '/' }, ...pathItems]
    }
    
    return pathItems
  }

  const breadcrumbItems = getBreadcrumbItems()
  const isActive = (href: string, index: number) => {
    return index === breadcrumbItems.length - 1 || href === pathname
  }

  // Split items into visible and dropdown items
  const visibleItems = breadcrumbItems.slice(-maxItems)
  const dropdownItems = breadcrumbItems.slice(0, -maxItems)

  return (
    <nav className="flex items-center gap-2 text-sm mb-6" aria-label="Breadcrumb">
      <ol className="flex items-center gap-2 flex-wrap">
        {/* Dropdown for overflow items */}
        {dropdownItems.length > 0 && (
          <li className="flex items-center gap-2">
            <div className="relative group">
              <button className="text-gray-500 hover:text-gray-700 p-1 rounded hover:bg-gray-100">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
              <div className="absolute left-0 top-full mt-1 w-48 bg-white shadow-lg rounded-md border border-gray-200 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-10">
                {dropdownItems.map((item, index) => (
                  <Link
                    key={index}
                    href={item.href}
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 border-b border-gray-100 last:border-b-0"
                    prefetch={false}
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            </div>
            <span className="text-gray-400 text-xs">›</span>
          </li>
        )}

        {/* Visible breadcrumb items */}
        {visibleItems.map((item, index) => {
          const globalIndex = breadcrumbItems.length - visibleItems.length + index
          return (
            <li key={globalIndex} className="flex items-center gap-2">
              {index > 0 || dropdownItems.length > 0 ? (
                <span className="text-gray-400 text-xs">›</span>
              ) : null}
              
              {isActive(item.href, globalIndex) ? (
                <span 
                  className="text-gray-800 font-medium truncate max-w-[120px] md:max-w-[160px] px-3 py-1 bg-gray-100 rounded-lg border border-gray-200"
                  aria-current="page"
                >
                  {item.label}
                </span>
              ) : (
                <Link
                  href={item.href}
                  className="text-blue-600 hover:text-blue-800 transition-colors truncate max-w-[120px] md:max-w-[160px] px-3 py-1 hover:bg-blue-50 rounded-lg border border-transparent hover:border-blue-100"
                  prefetch={false}
                >
                  {item.label}
                </Link>
              )}
            </li>
          )
        })}
      </ol>
    </nav>
  )
}

// Example usage
