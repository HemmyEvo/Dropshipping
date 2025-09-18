import type { Metadata } from "next";
import "./globals.css"
import localFont from 'next/font/local'
import { APP_DESCRIPTION, APP_NAME, APP_SLOGAN } from '@/lib/constants'
const integralCF = localFont({
  src:[
    {path:"../assets/fonts/Fontspring-DEMO-integralcf-regularoblique.otf",
    weight:"100",
    style:"normal"
    }

  ],
  variable:'--font-integralCF'
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
        className={`${integralCF.variable} bg-[white] antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
