'use client'

import { XIcon } from "lucide-react"
import { useEffect, useState } from "react"

export default function Notifications() {
  const [isVisible, setIsVisible] = useState(false)
  const [notification, setNotification] = useState({
    message: "Sign up and get 20% off your first order.",
    cta: "Sign Up Now",
    link: "#"
  })

  useEffect(() => {
    // Check if user has dismissed notification
    const notificationDismissed = localStorage.getItem('notificationDismissed')
    const lastDismissed = localStorage.getItem('lastDismissed')
    
    // Show notification if:
    // 1. It hasn't been dismissed, OR
    // 2. It was dismissed more than 2 hours ago
    if (!notificationDismissed || 
        (lastDismissed && (Date.now() - parseInt(lastDismissed)) > 2 * 60 * 60 * 1000)) {
      setIsVisible(true)
    }
  }, [])

  const handleClose = () => {
    setIsVisible(false)
    localStorage.setItem('notificationDismissed', 'true')
    localStorage.setItem('lastDismissed', Date.now().toString())
  }

  if (!isVisible) return null

  return (
    <div className="w-full bg-gradient-to-r from-purple-800 to-pink-700 text-white py-2 px-4 flex items-center justify-center relative">
      <div className="text-sm flex items-center gap-1 flex-wrap justify-center">
        <span className="animate-pulse">🔥</span>
        <p>{notification.message}</p>
        <a 
          href={notification.link} 
          className="font-semibold underline flex items-center"
        >
          {notification.cta}
        </a>
      </div>
      <button 
        onClick={handleClose}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 p-1 rounded-full hover:bg-white/10 transition-colors"
      >
        <XIcon className="h-4 w-4" />
      </button>
    </div>
  )
}