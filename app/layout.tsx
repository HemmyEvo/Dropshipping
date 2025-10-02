import type { Metadata } from "next";
import "./globals.css"
import localFont from 'next/font/local'
import { APP_DESCRIPTION, APP_NAME, APP_SLOGAN } from '@/lib/constants'
import { Toaster } from "@/components/ui/sonner";
const integralCF = localFont({
  src:[
    {path:"../assets/fonts/Fontspring-DEMO-integralcf-medium.otf",
    weight:"100",
    style:"normal"
    }

  ],
  variable:'--font-integralCF'
})
const floryanna = localFont({
  src:[
    {path:"../assets/fonts/playfair-display.italic.ttf",
    weight:"100",
    style:"normal"
    }

  ],
  variable:'--font-floryanna'
})

export const metadata: Metadata = {
  title: {
    template: `%s | ${APP_NAME}`,
    default: `${APP_NAME}. ${APP_SLOGAN}`,
  },
  description: APP_DESCRIPTION,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
    
      <body
        className={`${integralCF.variable} ${floryanna.variable} bg-[white] antialiased`}
      >
        <Toaster position="top-right" richColors />
        {children}
      </body>
    </html>
  );
}
