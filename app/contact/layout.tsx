import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact Us',
  description: 'Contact Blue Line Collision Center in Ramsey, Minnesota. Get a free estimate for your auto body repair needs. Call us at 763-421-2867 or fill out our contact form.',
  openGraph: {
    title: 'Contact Us | Blue Line Collision Center',
    description: 'Contact Blue Line Collision Center in Ramsey, Minnesota. Get a free estimate for your auto body repair needs.',
    url: 'https://bluelinecollisioncenter.com/contact',
    siteName: 'Blue Line Collision Center',
    images: [
      {
        url: '/blueline/Blueline_Outside_aHR0cHM6.jpg',
        width: 1200,
        height: 630,
        alt: 'Blue Line Collision Center',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  alternates: {
    canonical: 'https://bluelinecollisioncenter.com/contact',
  },
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
