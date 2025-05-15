import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "next-themes";
import Header from "@/components/header/Header";
import HomeFooter from "@/components/footer/Footer";
import Script from "next/script";
import { MAIN_NAMES } from "@/constants/main";
import FloatingButton from "@/components/floating-button/FloatingButton";

import ModalsComponent from "@/components/modals/ModalsComponent";
import StoreProvider from "@/components/Providers/StoreProvider";

import { Metadata } from "next";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata:Metadata = {
  title: 'SkullDate | Знайомства',
  description: 'SkullDate - Знайомства по новому',
  openGraph: {
    title: 'SkullDate | Знайомства',
    description: 'SkullDate - Знайомства по новому',
    url: 'https://noris-dev.site',
    siteName: 'SkullDate',
    images: [
      {
        url: 'https://noris-dev.site/my_logo.png', // Must be an absolute URL
        width: 800,
        height: 600,
      },
      {
        url: 'https://noris-dev.site/my_logo.png', // Must be an absolute URL
        width: 1800,
        height: 1600,
        alt: 'My custom alt',
      },
    ],

    locale: 'en_US',
    type: 'website',
  },
}
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        // wotdisconnected="true"
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <StoreProvider>
          <ThemeProvider attribute={"class"} enableSystem defaultTheme="system">
            <Header />
            <main className="main container m-auto p-2 relative">
              <FloatingButton />
              {children}
            </main>
            <ModalsComponent />
            <HomeFooter />
            {/* <Script src="/noris-bar.js" strategy="afterInteractive" /> */}
         
            <ModalsComponent />
          </ThemeProvider>
        </StoreProvider>
      </body>
    </html>
  );
}
