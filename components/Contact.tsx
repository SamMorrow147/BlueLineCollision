import Link from "next/link";
import Image from "next/image";
import { contactInfo } from "@/data/contact";

export default function Contact() {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center font-eurostile text-gray-900">
          Contact Us
        </h2>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {/* Contact Info */}
          <div>
            <h3 className="text-xl font-semibold mb-4 text-gray-800 font-eurostile">Come see us in person!</h3>
            <div className="space-y-4">
              <div>
                <h4 className="font-semibold text-lg mb-2 text-gray-900 font-eurostile">Blue Line Collision Center</h4>
                <p className="text-gray-700 mb-2 font-eurostile">{contactInfo.address}</p>
                <p className="text-gray-700 font-eurostile">
                  Phone: <Link href={`tel:${contactInfo.phone.replace(/-/g, '')}`} className="hover:underline text-primary">{contactInfo.phone}</Link>
                </p>
                <p className="text-gray-700 font-eurostile">
                  E-mail: <Link href={`mailto:${contactInfo.email}`} className="hover:underline text-primary">{contactInfo.email}</Link>
                </p>
              </div>
              
              <div className="mt-6">
                <h4 className="font-semibold text-lg mb-3 text-gray-900 font-eurostile">Hours</h4>
                <table className="w-full text-sm">
                  <tbody>
                    {contactInfo.hours.map((hour, index) => (
                      <tr key={index} className="border-b border-gray-200">
                        <td className="py-2 text-gray-700 font-eurostile">{hour.day}</td>
                        <td className="py-2 text-gray-700 text-right font-eurostile">
                          {hour.close ? `${hour.open} - ${hour.close}` : hour.open}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              
              <button className="mt-6 bg-primary hover:bg-[#3a6a9a] text-white font-semibold px-6 py-3 rounded transition-colors font-eurostile font-bold">
                Request a Quote
              </button>
            </div>
          </div>
          
          {/* Map */}
          <div className="rounded-lg overflow-hidden min-h-[400px]">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d5620.552752391391!2d-93.43736849999999!3d45.2219767!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x52b33f912adcddcd%3A0x5b5345ae32334875!2s6710%20US-10%2C%20Ramsey%2C%20MN%2055303!5e0!3m2!1sen!2sus!4v1768943774490!5m2!1sen!2sus"
              width="100%"
              height="100%"
              style={{ border: 0, minHeight: '400px' }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="w-full h-full"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
