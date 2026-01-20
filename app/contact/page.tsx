'use client';

import { useEffect } from 'react';
import Script from 'next/script';

export default function ContactPage() {
  useEffect(() => {
    // Load JotForm embed handler script
    if (typeof window !== 'undefined' && (window as any).jotformEmbedHandler) {
      (window as any).jotformEmbedHandler(
        "iframe[id='JotFormIFrame-260195841500149']",
        "https://form.jotform.com/"
      );
    }
  }, []);

  return (
    <>
      <div className="container mx-auto py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold text-center text-gray-900 mb-8 font-eurostile">
            Contact Us
          </h1>
          <p className="text-center text-gray-700 mb-12 font-eurostile">
            Fill out the form below and we&apos;ll get back to you as soon as possible.
          </p>
          
          <div className="bg-white rounded-lg p-4 md:p-8">
            <iframe
              id="JotFormIFrame-260195841500149"
              title="Blue Sky Contact Form"
              onLoad={() => {
                if (typeof window !== 'undefined' && window.parent) {
                  window.parent.scrollTo(0, 0);
                }
              }}
              allowTransparency={true}
              allow="geolocation; microphone; camera; fullscreen; payment"
              src="https://form.jotform.com/260195841500149"
              frameBorder="0"
              style={{
                minWidth: '100%',
                maxWidth: '100%',
                height: '539px',
                border: 'none',
              }}
              scrolling="no"
            />
          </div>

        </div>

        {/* Map Section - Full Width */}
        <div className="mt-12 -mx-4 md:-mx-8 lg:-mx-16 xl:-mx-32">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-8 font-eurostile px-4">
            Find Us
          </h2>
          <div className="bg-white overflow-hidden">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d5620.552752391391!2d-93.43736849999999!3d45.2219767!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x52b33f912adcddcd%3A0x5b5345ae32334875!2s6710%20US-10%2C%20Ramsey%2C%20MN%2055303!5e0!3m2!1sen!2sus!4v1768943774490!5m2!1sen!2sus"
              width="100%"
              height="450"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="w-full"
            />
          </div>
        </div>

        <Script
          src="https://cdn.jotfor.ms/s/umd/latest/for-form-embed-handler.js"
          strategy="afterInteractive"
          onLoad={() => {
            if (typeof window !== 'undefined' && (window as any).jotformEmbedHandler) {
              (window as any).jotformEmbedHandler(
                "iframe[id='JotFormIFrame-260195841500149']",
                "https://form.jotform.com/"
              );
            }
          }}
        />
      </div>
    </>
  );
}
