import Link from "next/link";
import Image from "next/image";
import { contactInfo } from "@/data/contact";

export default function Footer() {
  return (
    <footer className="bg-gray-100 text-gray-700 py-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-6">
          <div>
            <Link
              href={contactInfo.facebook}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block mb-4"
            >
              <Image
                src="/blueline/qt_q_95_aHR0cHM6.jpg"
                alt="Blue Line Collision Center Logo"
                width={120}
                height={76}
                className="h-auto"
              />
            </Link>
            <p className="font-semibold mb-2 font-eurostile">Blue Line Collision Center</p>
            <p className="mb-2 font-eurostile">{contactInfo.address}</p>
            <p className="font-eurostile">
              <Link href={`tel:${contactInfo.phone.replace(/-/g, '')}`} className="hover:underline">
                {contactInfo.phone}
              </Link>
            </p>
          </div>
          
          <div className="text-sm">
            <p className="mb-2 font-eurostile">Copyright © 2025 Blue Line Collision Center - All Rights Reserved.</p>
            <p className="font-eurostile">Powered by Grace Anthony Consulting</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
