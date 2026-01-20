import type { Metadata } from "next";
import { Playfair_Display, Open_Sans } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import StructuredData from "@/components/StructuredData";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

const openSans = Open_Sans({
  subsets: ["latin"],
  variable: "--font-opensans",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL('https://bluelinecollisioncenter.com'),
  title: {
    default: "Blue Line Collision Center | Expert Auto Body Repair in Ramsey, MN",
    template: "%s | Blue Line Collision Center"
  },
  description: "Expert auto collision repair in Ramsey, Minnesota. Restore your vehicle to its original, pristine condition after an accident. Free estimates, lifetime guarantee, and hassle-free insurance claim handling.",
  keywords: [
    "auto body repair",
    "collision repair",
    "car repair",
    "auto body shop",
    "Ramsey Minnesota",
    "vehicle restoration",
    "car body work",
    "collision center",
    "auto repair shop",
    "body shop Ramsey MN"
  ],
  authors: [{ name: "Blue Line Collision Center" }],
  creator: "Blue Line Collision Center",
  publisher: "Blue Line Collision Center",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://bluelinecollisioncenter.com",
    siteName: "Blue Line Collision Center",
    title: "Blue Line Collision Center | Expert Auto Body Repair in Ramsey, MN",
    description: "Expert auto collision repair in Ramsey, Minnesota. Restore your vehicle to its original, pristine condition after an accident.",
    images: [
      {
        url: "/blueline/Blueline_Outside_aHR0cHM6.jpg",
        width: 1200,
        height: 630,
        alt: "Blue Line Collision Center",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Blue Line Collision Center | Expert Auto Body Repair in Ramsey, MN",
    description: "Expert auto collision repair in Ramsey, Minnesota. Restore your vehicle to its original, pristine condition after an accident.",
    images: ["/blueline/Blueline_Outside_aHR0cHM6.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    // Add verification codes here when available
  },
  alternates: {
    canonical: "https://bluelinecollisioncenter.com",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${playfair.variable} ${openSans.variable}`}>
      <body className="font-sans antialiased">
        {/* Google Analytics */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-7S058BG1J5"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-7S058BG1J5');
          `}
        </Script>
        
        <StructuredData />
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
