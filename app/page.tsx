import Hero from "@/components/Hero";
import Services from "@/components/Services";
import Contact from "@/components/Contact";
import Link from "next/link";
import Image from "next/image";
import { contactInfo } from "@/data/contact";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Home",
  description: "Expert auto collision repair in Ramsey, Minnesota. Restore your vehicle to its original, pristine condition after an accident. Free estimates, lifetime guarantee, and hassle-free insurance claim handling.",
  openGraph: {
    title: "Blue Line Collision Center | Expert Auto Body Repair in Ramsey, MN",
    description: "Expert auto collision repair in Ramsey, Minnesota. Restore your vehicle to its original, pristine condition after an accident.",
    url: "https://bluelinecollisioncenter.com",
    siteName: "Blue Line Collision Center",
    images: [
      {
        url: "/blueline/Blueline_Outside_aHR0cHM6.jpg",
        width: 1200,
        height: 630,
        alt: "Blue Line Collision Center",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  alternates: {
    canonical: "https://bluelinecollisioncenter.com",
  },
};

export default function Home() {
  return (
    <>
      <Hero />
      
      <Services />
      
      {/* Welcome Section */}
      <section className="py-16 bg-primary">
        <div className="container mx-auto px-4 text-center max-w-3xl">
          <h3 className="text-2xl md:text-3xl font-semibold mb-4 text-white font-eurostile">
            Welcome to Blue Line Collision Center Auto Repair
          </h3>
          <p className="text-white leading-relaxed font-eurostile">
            At Blue Line Collision Center, we offer top-quality auto body repair services in the Ramsey, Minnesota area. Whether you a scratch repaired or major body repairs, we&apos;ve got you covered.
          </p>
        </div>
      </section>
      
      {/* Social Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 font-eurostile text-gray-900">
            Connect With Us
          </h2>
          <Link
            href={contactInfo.facebook}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 bg-primary hover:bg-[#3a6a9a] text-white px-6 py-3 rounded-lg transition-colors font-eurostile font-semibold"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-6 h-6"
            >
              <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
            </svg>
            <span>Follow us on Facebook</span>
          </Link>
        </div>
      </section>
      
      <Contact />
    </>
  );
}
