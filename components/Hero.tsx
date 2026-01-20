import Link from "next/link";
import Image from "next/image";
import { contactInfo } from "@/data/contact";

export default function Hero() {
  return (
    <section className="relative min-h-[600px] flex items-center justify-center bg-gray-900">
      {/* Background image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/blueline/rs_h_1000_cg_true_m_aHR0cHM6.jpg"
          alt="Hero background"
          fill
          className="object-cover opacity-60"
          priority
        />
      </div>
      
      {/* Content */}
      <div className="relative z-10 text-center text-white px-4 max-w-4xl mx-auto">
        <h2 className="text-2xl md:text-3xl mb-4 font-eurostile font-medium">Welcome</h2>
        <h1 className="text-4xl md:text-6xl font-bold mb-6 font-eurostile">
          Restore Your Vehicle
        </h1>
        <p className="text-lg md:text-xl mb-8 max-w-2xl mx-auto font-eurostile">
          Restore your vehicle to its original, pristine condition after an accident with Blue Line Collision Center.
        </p>
        <Link
          href={`tel:${contactInfo.phone.replace(/-/g, '')}`}
          className="inline-block bg-primary hover:bg-[#3a6a9a] text-white font-semibold px-8 py-3 rounded transition-colors text-lg font-eurostile font-bold"
        >
          Call Now
        </Link>
      </div>
    </section>
  );
}
