# Blue Line Collision Center

A modern Next.js website for Blue Line Collision Center, an auto body repair shop in Ramsey, Minnesota.

## Features

- **Home Page**: Hero section, services, welcome message, and contact information
- **Gallery Page**: Interactive image slideshow with thumbnail navigation
- **Contact Page**: JotForm contact form and Google Maps integration
- **Responsive Design**: Mobile-first design with Tailwind CSS
- **SEO Optimized**: Comprehensive metadata, structured data, sitemap, and robots.txt

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Fonts**: Adobe Fonts (Eurostile) via Typekit
- **Deployment**: Vercel

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd "BlueLine Collision Center"
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run scrape` - Scrape website assets (development only)

## Deployment to Vercel

### Option 1: Deploy via Vercel Dashboard

1. Push your code to GitHub/GitLab/Bitbucket
2. Go to [vercel.com](https://vercel.com) and sign in
3. Click "New Project"
4. Import your repository
5. Vercel will auto-detect Next.js settings
6. Click "Deploy"

### Option 2: Deploy via Vercel CLI

1. Install Vercel CLI:
```bash
npm i -g vercel
```

2. Deploy:
```bash
vercel
```

3. For production:
```bash
vercel --prod
```

## Project Structure

```
├── app/                    # Next.js App Router pages
│   ├── layout.tsx         # Root layout with metadata
│   ├── page.tsx           # Home page
│   ├── gallery/           # Gallery page
│   ├── contact/           # Contact page
│   ├── sitemap.ts         # Auto-generated sitemap
│   └── robots.ts          # Robots.txt
├── components/            # React components
│   ├── Header.tsx
│   ├── Footer.tsx
│   ├── Hero.tsx
│   ├── Services.tsx
│   ├── Contact.tsx
│   ├── GalleryGrid.tsx
│   └── StructuredData.tsx # SEO structured data
├── data/                  # Configuration data
│   ├── contact.ts
│   └── navigation.ts
├── public/                # Static assets
│   └── blueline/         # Scraped images and assets
├── scripts/              # Utility scripts
│   └── scrape.ts         # Web scraper (dev only)
└── snapshots/            # Scraped HTML snapshots
```

## Environment Variables

No environment variables are required for basic deployment. All configuration is in the codebase.

## SEO Features

- ✅ Comprehensive metadata (title, description, keywords)
- ✅ Open Graph tags for social sharing
- ✅ Twitter Card tags
- ✅ Structured data (JSON-LD) for LocalBusiness
- ✅ Auto-generated sitemap.xml
- ✅ robots.txt configuration
- ✅ Canonical URLs
- ✅ Image optimization

## Notes

- The scraper script (`scripts/scrape.ts`) is for development only and requires Playwright
- All images are stored in `public/blueline/` and should be committed to the repository
- The site uses Adobe Fonts (Typekit) - ensure the project ID is correct in `globals.css`

## Support

For issues or questions, contact the development team.
