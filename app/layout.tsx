import React from "react"
import type { Metadata, Viewport } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const _geist = Geist({ subsets: ["latin"] });
const _geistMono = Geist_Mono({ subsets: ["latin"] });

// ... existing imports ...

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: '#030305', // Deep Space Background
}

export const metadata: Metadata = {
  metadataBase: new URL('https://slimshotai.vercel.app'), // Replace with actual domain
  title: {
    default: 'SlimShot - AI-Powered Image Compression',
    template: '%s | SlimShot',
  },
  description: 'Engineering-grade image optimization running 100% in your browser. Privacy-focused, zero latency, and uncompromising quality. Support for AVIF, WebP, JPEG, and PNG.',
  keywords: [
    'SlimShotAi','Slimshot AI','Slimshotai','Slimshot.ai',
    'image compression', 'ai image optimizer', 'browser-based compression', 
    'avif converter', 'webp converter', 'privacy-focused', 'client-side', 
    'slimshot', 'image optimization', 'web performance', 'photo compressor', 
    'converter', 'Ai image generator', 'slimshotai',
    'reduce image size', 'compress png', 'compress jpeg', 'online image compressor', 
    'free image optimizer', 'shrink image size'
  ],
  authors: [{ name: 'SlimShot Team' }],
  creator: 'SlimShot',
  publisher: 'SlimShot',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'QzdSqshcJPpZewAYa_yn03eGIvp7jAxMcHVDedvEE4w',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://slimshotai.vercel.app',
    title: 'SlimShot - Precision Image Compression',
    description: 'Optimize your images with quantum precision. 100% client-side, secure, and fast.',
    siteName: 'SlimShot',
    images: [
      {
        url: '/icon.png', // We should strictly use a 1200x630 OG image, but using icon as placeholder
        width: 1200,
        height: 630,
        alt: 'SlimShot AI Compression',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'SlimShot - Precision Image Compression',
    description: 'Engineering-grade image optimization running entirely in your browser.',
    images: ['/icon.png'],
    creator: '@slimshot',
  },
  icons: {
    icon: [
      {
        url: '/icon.png',
        type: 'image/png',
      },
    ],
    apple: '/icon.png',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`font-sans antialiased`}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
