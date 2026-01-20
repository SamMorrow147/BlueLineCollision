/**
 * Scraper script for BlueLine Collision Center website
 * 
 * This script uses Playwright to scrape the homepage and gallery page,
 * download all images and assets, and save HTML snapshots.
 * 
 * Prerequisites:
 * - Install Playwright browsers: npx playwright install chromium
 * 
 * Usage:
 * - npm run scrape
 */

import { chromium } from 'playwright';
import * as fs from 'fs';
import * as path from 'path';
import { URL } from 'url';

const BASE_URL = 'https://bluelinecollisioncenter.com';
const PAGES = [
  { url: `${BASE_URL}/`, name: 'home' },
  { url: `${BASE_URL}/gallery`, name: 'gallery' }
];

const SNAPSHOTS_DIR = path.join(process.cwd(), 'snapshots');
const ASSETS_DIR = path.join(process.cwd(), 'public', 'blueline');

interface AssetManifest {
  images: Record<string, string>;
}

// Ensure directories exist
if (!fs.existsSync(SNAPSHOTS_DIR)) {
  fs.mkdirSync(SNAPSHOTS_DIR, { recursive: true });
}
if (!fs.existsSync(ASSETS_DIR)) {
  fs.mkdirSync(ASSETS_DIR, { recursive: true });
}

/**
 * Resolve a URL to an absolute URL
 */
function resolveUrl(url: string, baseUrl: string): string {
  try {
    // Handle protocol-relative URLs
    if (url.startsWith('//')) {
      return `https:${url}`;
    }
    // Handle relative URLs
    if (url.startsWith('/')) {
      const base = new URL(baseUrl);
      return `${base.protocol}//${base.host}${url}`;
    }
    // Handle absolute URLs
    if (url.startsWith('http://') || url.startsWith('https://')) {
      return url;
    }
    // Relative to current page
    return new URL(url, baseUrl).href;
  } catch (error) {
    console.warn(`Failed to resolve URL: ${url}`, error);
    return url;
  }
}

/**
 * Generate a safe filename from a URL
 */
function getFilenameFromUrl(url: string): string {
  try {
    const urlObj = new URL(url);
    let pathname = urlObj.pathname;
    let resizeInfo = '';
    
    // Extract resize parameters from the URL path (rs=w:1300,h:800, etc.)
    if (pathname.includes('/:/')) {
      const parts = pathname.split('/:/');
      pathname = parts[0];
      if (parts[1]) {
        // Extract resize info like rs=w:1300,h:800
        const resizeMatch = parts[1].match(/rs=([^/]+)/);
        if (resizeMatch) {
          resizeInfo = '_' + resizeMatch[1].replace(/[^a-zA-Z0-9]/g, '_').substring(0, 30);
        } else if (parts[1].includes('w:70') || parts[1].includes('h:70')) {
          // Mark thumbnails
          resizeInfo = '_thumb';
        }
      }
    } else if (pathname.endsWith('/:')) {
      pathname = pathname.slice(0, -2);
    }
    
    let filename = pathname.split('/').pop() || 'image';
    
    // Remove query parameters from filename
    filename = filename.split('?')[0];
    
    // Decode URL encoding
    try {
      filename = decodeURIComponent(filename);
    } catch (e) {
      // If decoding fails, use as-is
    }
    
    // If no extension, try to get one from content-type or default to .jpg
    if (!filename.includes('.')) {
      filename += '.jpg';
    }
    
    // Sanitize filename but preserve the original name better
    const ext = path.extname(filename);
    const name = path.basename(filename, ext)
      .replace(/[^a-zA-Z0-9._-]/g, '_')
      .replace(/_+/g, '_')
      .substring(0, 120); // Limit length to leave room for resize info
    
    // Add resize info to differentiate full-size from thumbnails
    // Ensure unique filename by adding hash of full URL
    const urlHash = Buffer.from(url).toString('base64').substring(0, 8).replace(/[^a-zA-Z0-9]/g, '');
    return `${name}${resizeInfo}_${urlHash}${ext}`;
  } catch (error) {
    // Fallback filename
    const hash = Buffer.from(url).toString('base64').substring(0, 16).replace(/[^a-zA-Z0-9]/g, '');
    return `image_${hash}.jpg`;
  }
}

/**
 * Download an image from a URL
 */
async function downloadImage(imageUrl: string, localPath: string): Promise<boolean> {
  try {
    const response = await fetch(imageUrl);
    if (!response.ok) {
      console.warn(`Failed to download ${imageUrl}: ${response.statusText}`);
      return false;
    }
    
    const buffer = await response.arrayBuffer();
    fs.writeFileSync(localPath, Buffer.from(buffer));
    return true;
  } catch (error) {
    console.warn(`Error downloading ${imageUrl}:`, error);
    return false;
  }
}

/**
 * Extract all image URLs from a page
 */
async function extractImages(page: any, pageUrl: string): Promise<string[]> {
  const images: string[] = [];
  
  // Get all img tags
  const imgElements = await page.locator('img').all();
  for (const img of imgElements) {
    try {
      const src = await img.getAttribute('src');
      if (src) {
        const resolvedUrl = resolveUrl(src, pageUrl);
        images.push(resolvedUrl);
      }
      
      // Also check srcset
      const srcset = await img.getAttribute('srcset');
      if (srcset) {
        const srcsetUrls = srcset.split(',').map((s: string) => s.trim().split(' ')[0]);
        for (const url of srcsetUrls) {
          if (url) {
            const resolvedUrl = resolveUrl(url, pageUrl);
            images.push(resolvedUrl);
          }
        }
      }
    } catch (error) {
      console.warn('Error extracting image:', error);
    }
  }
  
  // Try to extract background images from computed styles
  try {
    const backgroundImages = await page.evaluate(() => {
      const elements = document.querySelectorAll('*');
      const bgImages: string[] = [];
      for (const el of elements) {
        const style = window.getComputedStyle(el);
        const bgImage = style.backgroundImage;
        if (bgImage && bgImage !== 'none') {
          const match = bgImage.match(/url\(['"]?([^'"]+)['"]?\)/);
          if (match && match[1]) {
            bgImages.push(match[1]);
          }
        }
      }
      return bgImages;
    });
    
    for (const bgUrl of backgroundImages) {
      const resolvedUrl = resolveUrl(bgUrl, pageUrl);
      images.push(resolvedUrl);
    }
  } catch (error) {
    console.warn('Error extracting background images:', error);
  }
  
  return [...new Set(images)]; // Remove duplicates
}

async function main() {
  console.log('Starting scraper...');
  console.log('Launching Chromium browser...');
  
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
  });
  
  const manifest: AssetManifest = { images: {} };
  const downloadedUrls = new Set<string>();
  
  try {
    for (const pageInfo of PAGES) {
      console.log(`\nVisiting ${pageInfo.url}...`);
      const page = await context.newPage();
      
      try {
        // Try networkidle first, fallback to load if it times out
        try {
          await page.goto(pageInfo.url, { 
            waitUntil: 'networkidle',
            timeout: 30000 
          });
        } catch (error) {
          console.log('networkidle timed out, trying load...');
          await page.goto(pageInfo.url, { 
            waitUntil: 'load',
            timeout: 30000 
          });
        }
        
        console.log(`Page loaded: ${pageInfo.name}`);
        
        // Wait a bit for any lazy-loaded content and images
        await page.waitForTimeout(5000);
        
        // Get HTML content
        const html = await page.content();
        const htmlPath = path.join(SNAPSHOTS_DIR, `${pageInfo.name}.html`);
        fs.writeFileSync(htmlPath, html, 'utf-8');
        console.log(`Saved HTML to ${htmlPath}`);
        
        // Extract images
        console.log('Extracting images...');
        const imageUrls = await extractImages(page, pageInfo.url);
        console.log(`Found ${imageUrls.length} unique image URLs`);
        
        // Download images
        for (const imageUrl of imageUrls) {
          if (downloadedUrls.has(imageUrl)) {
            continue; // Skip if already downloaded
          }
          
          try {
            const filename = getFilenameFromUrl(imageUrl);
            const localPath = path.join(ASSETS_DIR, filename);
            const relativePath = `blueline/${filename}`;
            
            console.log(`Downloading: ${imageUrl}`);
            const success = await downloadImage(imageUrl, localPath);
            
            if (success) {
              downloadedUrls.add(imageUrl);
              manifest.images[imageUrl] = relativePath;
              console.log(`  ✓ Saved to ${relativePath}`);
            } else {
              console.log(`  ✗ Failed to download`);
            }
          } catch (error) {
            console.warn(`Error processing image ${imageUrl}:`, error);
          }
        }
        
      } catch (error) {
        console.error(`Error processing page ${pageInfo.url}:`, error);
      } finally {
        await page.close();
      }
    }
    
    // Save manifest
    const manifestPath = path.join(SNAPSHOTS_DIR, 'assets.json');
    fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 2), 'utf-8');
    console.log(`\nSaved asset manifest to ${manifestPath}`);
    console.log(`Total images downloaded: ${Object.keys(manifest.images).length}`);
    
  } finally {
    await browser.close();
    console.log('\nScraping complete!');
  }
}

main().catch(error => {
  console.error('Fatal error:', error);
  process.exit(1);
});
