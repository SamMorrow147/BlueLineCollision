import Link from "next/link";
import Image from "next/image";
import { navLinks } from "@/data/navigation";
import { contactInfo } from "@/data/contact";

export default function Header() {
  return (
    <header className="bg-white">
      {/* Top banner */}
      <div className="bg-primary text-white text-center py-2 px-4 text-sm font-eurostile">
        <p>
          {contactInfo.addressShort} Call Today{' '}
          <Link
            href={`tel:${contactInfo.phone.replace(/[() -]/g, '')}`}
            className="hover:underline font-semibold"
          >
            {contactInfo.phone}
          </Link>
        </p>
      </div>
      
      {/* Navigation */}
      <nav className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center">
          <Image
            src="/blueline/qt_q_95_aHR0cHM6.jpg"
            alt="Blue Line Collision Center Logo"
            width={201}
            height={128}
            className="h-auto"
            priority
          />
        </Link>
        
        <ul className="flex gap-6">
          {navLinks.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="text-gray-800 hover:text-primary font-medium transition-colors text-lg font-eurostile"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
