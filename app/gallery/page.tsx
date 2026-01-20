import GalleryGrid from "@/components/GalleryGrid";
import Link from "next/link";
import { contactInfo } from "@/data/contact";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Gallery",
  description: "View our photo gallery showcasing our expert auto collision repair work at Blue Line Collision Center in Ramsey, Minnesota. See before and after photos of vehicle restorations.",
  openGraph: {
    title: "Photo Gallery | Blue Line Collision Center",
    description: "View our photo gallery showcasing our expert auto collision repair work at Blue Line Collision Center in Ramsey, Minnesota.",
    url: "https://bluelinecollisioncenter.com/gallery",
    siteName: "Blue Line Collision Center",
    images: [
      {
        url: "/blueline/IMG_2640_aHR0cHM6.jpg",
        width: 1200,
        height: 630,
        alt: "Blue Line Collision Center Gallery",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  alternates: {
    canonical: "https://bluelinecollisioncenter.com/gallery",
  },
};

export default function Gallery() {
  return (
    <>
      {/* Welcome Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 text-center max-w-3xl">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 font-playfair text-gray-900">
            Welcome
          </h1>
          <p className="text-lg text-gray-700 mb-6 leading-relaxed">
            There&apos;s much to see here. So, take your time, look around, and learn all there is to know about us. We hope you enjoy our site and take a moment to drop us a line.
          </p>
          <Link
            href={`tel:${contactInfo.phone.replace(/[() -]/g, '')}`}
            className="text-primary hover:underline font-semibold"
          >
            Find out more
          </Link>
        </div>
      </section>
      
      {/* Gallery Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center font-playfair text-gray-900">
            Photo Gallery
          </h2>
          <GalleryGrid />
        </div>
      </section>
    </>
  );
}
