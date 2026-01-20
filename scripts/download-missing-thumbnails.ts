import fs from 'fs';
import path from 'path';

// Images that need thumbnail versions (70x70)
const missingThumbnails = [
  { name: 'IMG_2584%202', filename: 'IMG_2584_2_w_70_h_70_cg_true_m_aHR0cHM6.jpg' },
  { name: 'blob-16e6836', filename: 'blob-16e6836_w_70_h_70_cg_true_m_aHR0cHM6.png', ext: 'png' },
  { name: 'Nissan%20front%20end%20damage', filename: 'Nissan_front_end_damage_w_70_h_70_cg_true_m_aHR0cHM6.jpg' },
  { name: 'Blueline%20Outside', filename: 'Blueline_Outside_w_70_h_70_cg_true_m_aHR0cHM6.jpg' },
  { name: 'DSC00059_2153755_std_480x360', filename: 'DSC00059_2153755_std_480x360_w_70_h_70_cg_true_m_aHR0cHM6.jpg' },
  { name: 'IMG_2640', filename: 'IMG_2640_w_70_h_70_cg_true_m_aHR0cHM6.jpg' },
];

const baseUrl = 'https://img1.wsimg.com/isteam/ip/d55579cb-efec-4d9f-9032-fece6605674c';
const publicDir = path.join(process.cwd(), 'public', 'blueline');

async function downloadThumbnail(image: { name: string; filename: string; ext?: string }): Promise<void> {
  const ext = image.ext || 'jpg';
  // Construct the thumbnail URL (70x70 version)
  const url = `${baseUrl}/${image.name}.${ext}/:/rs=w:70,h:70,cg:true,m/cr=w:70,h:70,a:cc`;
  const filePath = path.join(publicDir, image.filename);

  try {
    console.log(`Downloading: ${url}`);
    const response = await fetch(url);
    
    if (!response.ok) {
      console.warn(`Failed to download ${url}: ${response.statusText}`);
      return;
    }

    const buffer = await response.arrayBuffer();
    const fileSize = buffer.byteLength;
    
    fs.writeFileSync(filePath, Buffer.from(buffer));
    console.log(`✓ Saved to ${image.filename} (${(fileSize / 1024).toFixed(1)}KB)`);
  } catch (error) {
    console.error(`Error downloading ${image.name}:`, error);
  }
}

async function main() {
  console.log('Downloading missing thumbnail images...\n');
  
  for (const image of missingThumbnails) {
    await downloadThumbnail(image);
    // Small delay to avoid rate limiting
    await new Promise(resolve => setTimeout(resolve, 500));
  }
  
  console.log('\nDone!');
}

main().catch(console.error);
