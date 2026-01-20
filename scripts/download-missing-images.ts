import fs from 'fs';
import path from 'path';

// Images that need full-size versions (currently only have 12KB thumbnails)
const missingImages = [
  'IMG_2558',
  'IMG_2537_2',
  'IMG_2578',
  'IMG_2528',
  'IMG_2521',
  'IMG_2535',
  'IMG_2554',
  'IMG_2561',
  'IMG_2580',
  'IMG_2511',
];

const baseUrl = 'https://img1.wsimg.com/isteam/ip/d55579cb-efec-4d9f-9032-fece6605674c';
const publicDir = path.join(process.cwd(), 'public', 'blueline');

async function downloadFullSizeImage(imageName: string): Promise<void> {
  // Construct the full-size URL (ending with /:/)
  const url = `${baseUrl}/${encodeURIComponent(imageName)}.jpg/:/`;
  const filename = `${imageName.replace(/\s/g, '_')}_aHR0cHM6.jpg`;
  const filePath = path.join(publicDir, filename);

  try {
    console.log(`Downloading: ${url}`);
    const response = await fetch(url);
    
    if (!response.ok) {
      console.warn(`Failed to download ${url}: ${response.statusText}`);
      return;
    }

    const buffer = await response.arrayBuffer();
    const fileSize = buffer.byteLength;
    
    // Check if this is actually a full-size image (should be > 50KB)
    if (fileSize < 50000) {
      console.warn(`Warning: ${filename} is only ${fileSize} bytes, might still be a thumbnail`);
    }

    fs.writeFileSync(filePath, Buffer.from(buffer));
    console.log(`✓ Saved to ${filename} (${(fileSize / 1024).toFixed(1)}KB)`);
  } catch (error) {
    console.error(`Error downloading ${imageName}:`, error);
  }
}

async function main() {
  console.log('Downloading missing full-size images...\n');
  
  for (const imageName of missingImages) {
    await downloadFullSizeImage(imageName);
    // Small delay to avoid rate limiting
    await new Promise(resolve => setTimeout(resolve, 500));
  }
  
  console.log('\nDone!');
}

main().catch(console.error);
