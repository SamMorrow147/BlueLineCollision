'use client';

import Image from 'next/image';
import { useState, useRef, useEffect } from 'react';

// Gallery images - using full-size images (not thumbnails)
// All 22+ gallery images from the scraped site
const galleryImages = [
  { src: '/blueline/IMG_2519_aHR0cHM6.jpg', alt: 'Collision repair work' },
  { src: '/blueline/IMG_2548_aHR0cHM6.jpg', alt: 'Auto body repair' },
  { src: '/blueline/IMG_2552_aHR0cHM6.jpg', alt: 'Vehicle restoration' },
  { src: '/blueline/IMG_2508_aHR0cHM6.jpg', alt: 'Collision repair' },
  { src: '/blueline/IMG_2567_aHR0cHM6.jpg', alt: 'Auto body work' },
  { src: '/blueline/IMG_2575_aHR0cHM6.jpg', alt: 'Vehicle repair' },
  { src: '/blueline/IMG_2558_aHR0cHM6.jpg', alt: 'Auto repair service' },
  { src: '/blueline/IMG_2537_2_aHR0cHM6.jpg', alt: 'Body repair work' },
  { src: '/blueline/IMG_2578_aHR0cHM6.jpg', alt: 'Collision repair service' },
  { src: '/blueline/IMG_2528_aHR0cHM6.jpg', alt: 'Vehicle body work' },
  { src: '/blueline/IMG_2521_aHR0cHM6.jpg', alt: 'Auto collision repair' },
  { src: '/blueline/IMG_2535_aHR0cHM6.jpg', alt: 'Body shop service' },
  { src: '/blueline/IMG_2554_aHR0cHM6.jpg', alt: 'Vehicle restoration work' },
  { src: '/blueline/IMG_2561_aHR0cHM6.jpg', alt: 'Collision center service' },
  { src: '/blueline/IMG_2580_aHR0cHM6.jpg', alt: 'Auto body restoration' },
  { src: '/blueline/IMG_2511_aHR0cHM6.jpg', alt: 'Professional repair work' },
  { src: '/blueline/IMG_2584_2_aHR0cHM6.jpg', alt: 'Body shop work' },
  { src: '/blueline/blob-16e6836_aHR0cHM6.png', alt: 'Collision center work' },
  { src: '/blueline/Nissan_front_end_damage_aHR0cHM6.jpg', alt: 'Nissan front end damage repair' },
  { src: '/blueline/Blueline_Outside_aHR0cHM6.jpg', alt: 'BlueLine Collision Center Outside' },
  { src: '/blueline/DSC00059_2153755_std_480x360_aHR0cHM6.jpg', alt: 'Vehicle repair work' },
  { src: '/blueline/IMG_2640_aHR0cHM6.jpg', alt: 'Collision repair work' },
];

// Thumbnail images (70x70 versions)
const thumbnailImages = galleryImages.map((img) => {
  // Generate thumbnail path by replacing the hash suffix
  const basePath = img.src.replace(/_aHR0cHM6\.(jpg|png)$/, '');
  const extension = img.src.match(/\.(jpg|png)$/)?.[1] || 'jpg';
  const thumbnailSrc = `${basePath}_w_70_h_70_cg_true_m_aHR0cHM6.${extension}`;
  
  return {
    ...img,
    thumbnailSrc,
  };
});

export default function GalleryGrid() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const thumbnailContainerRef = useRef<HTMLDivElement>(null);
  const thumbnailRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const totalImages = galleryImages.length;

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev === 0 ? totalImages - 1 : prev - 1));
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev === totalImages - 1 ? 0 : prev + 1));
  };

  // Scroll thumbnail into view when current index changes
  useEffect(() => {
    const thumbnail = thumbnailRefs.current[currentIndex];
    const container = thumbnailContainerRef.current;
    
    if (thumbnail && container) {
      const containerRect = container.getBoundingClientRect();
      const thumbnailRect = thumbnail.getBoundingClientRect();
      
      if (thumbnailRect.left < containerRect.left) {
        container.scrollTo({
          left: thumbnail.offsetLeft - container.offsetLeft - 10,
          behavior: 'smooth',
        });
      } else if (thumbnailRect.right > containerRect.right) {
        container.scrollTo({
          left: thumbnail.offsetLeft - container.offsetLeft - containerRect.width + thumbnailRect.width + 10,
          behavior: 'smooth',
        });
      }
    }
  }, [currentIndex]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') {
        e.preventDefault();
        setCurrentIndex((prev) => (prev === 0 ? totalImages - 1 : prev - 1));
      } else if (e.key === 'ArrowRight') {
        e.preventDefault();
        setCurrentIndex((prev) => (prev === totalImages - 1 ? 0 : prev + 1));
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [totalImages]);

  const goToImage = (index: number) => {
    setCurrentIndex(index);
  };

  const scrollThumbnails = (direction: 'left' | 'right') => {
    const container = thumbnailContainerRef.current;
    if (!container) return;

    const scrollAmount = 200;
    const newScrollLeft =
      direction === 'left'
        ? container.scrollLeft - scrollAmount
        : container.scrollLeft + scrollAmount;

    container.scrollTo({
      left: newScrollLeft,
      behavior: 'smooth',
    });
  };

  // Get previous and next images for side display
  const getPreviousIndex = (index: number) => (index === 0 ? totalImages - 1 : index - 1);
  const getNextIndex = (index: number) => (index === totalImages - 1 ? 0 : index + 1);

  const prevIndex = getPreviousIndex(currentIndex);
  const nextIndex = getNextIndex(currentIndex);

  return (
    <div className="relative w-full">
      {/* Main Carousel */}
      <div className="relative w-full h-[600px] overflow-hidden mb-8">
        {/* Previous Image (blurred, left side) */}
        <div className="absolute left-0 top-0 w-1/3 h-full opacity-30 grayscale blur-sm pointer-events-none">
          <Image
            src={galleryImages[prevIndex].src}
            alt={galleryImages[prevIndex].alt}
            fill
            className="object-cover"
            sizes="33vw"
          />
        </div>

        {/* Next Image (blurred, right side) */}
        <div className="absolute right-0 top-0 w-1/3 h-full opacity-30 grayscale blur-sm pointer-events-none">
          <Image
            src={galleryImages[nextIndex].src}
            alt={galleryImages[nextIndex].alt}
            fill
            className="object-cover"
            sizes="33vw"
          />
        </div>

        {/* Current Image (center, full opacity) */}
        <div className="absolute left-1/2 top-0 -translate-x-1/2 w-full max-w-4xl h-full z-10 transition-opacity duration-500">
          <Image
            src={galleryImages[currentIndex].src}
            alt={galleryImages[currentIndex].alt}
            fill
            className="object-contain"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
            priority={currentIndex < 3}
          />
        </div>

        {/* Navigation Arrows */}
        <button
          onClick={goToPrevious}
          className="absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-black/15 hover:bg-black/25 text-white rounded-full w-12 h-12 flex items-center justify-center transition-all duration-300 border-3 border-white/90 font-bold text-xl"
          aria-label="Previous image"
        >
          <svg
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-6 h-6"
          >
            <path
              fillRule="evenodd"
              d="M15.836 19.774c.335.294.84.04.84-.423l.02-14.813c.001-.447-.48-.698-.81-.425l-8.693 7.204a.56.56 0 0 0-.01.836l8.653 7.621z"
            />
          </svg>
        </button>

        <button
          onClick={goToNext}
          className="absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-black/15 hover:bg-black/25 text-white rounded-full w-12 h-12 flex items-center justify-center transition-all duration-300 border-3 border-white/90 font-bold text-xl"
          aria-label="Next image"
        >
          <svg
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-6 h-6"
          >
            <path
              fillRule="evenodd"
              d="M7.861 4.125c-.335-.293-.84-.039-.84.424L7 19.362c0 .446.481.697.811.424l8.693-7.203a.56.56 0 0 0 .011-.836L7.861 4.125z"
            />
          </svg>
        </button>
      </div>

      {/* Thumbnail Navigation Strip */}
      <div className="relative w-full">
        <div className="flex items-center gap-2">
          {/* Left Scroll Button */}
          <button
            onClick={() => scrollThumbnails('left')}
            className="flex-shrink-0 bg-gray-200 hover:bg-gray-300 rounded-full w-10 h-10 flex items-center justify-center transition-colors"
            aria-label="Scroll thumbnails left"
          >
            <svg
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-6 h-6"
            >
              <path
                fillRule="evenodd"
                d="M15.836 19.774c.335.294.84.04.84-.423l.02-14.813c.001-.447-.48-.698-.81-.425l-8.693 7.204a.56.56 0 0 0-.01.836l8.653 7.621z"
              />
            </svg>
          </button>

          {/* Thumbnail Container */}
          <div
            ref={thumbnailContainerRef}
            className="flex-1 overflow-x-auto overflow-y-hidden scrollbar-hide"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            <div className="flex gap-2 px-2" style={{ whiteSpace: 'nowrap' }}>
              {thumbnailImages.map((image, index) => (
                <button
                  key={index}
                  ref={(el) => {
                    thumbnailRefs.current[index] = el;
                  }}
                  onClick={() => goToImage(index)}
                  className={`flex-shrink-0 w-[70px] h-[70px] rounded overflow-hidden border-2 transition-all duration-300 ${
                    index === currentIndex
                      ? 'border-blue-500 scale-110 shadow-lg'
                      : 'border-transparent hover:border-gray-400 opacity-70 hover:opacity-100'
                  }`}
                  aria-label={`Go to image ${index + 1}`}
                >
                  <Image
                    src={image.thumbnailSrc}
                    alt={image.alt}
                    width={70}
                    height={70}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Right Scroll Button */}
          <button
            onClick={() => scrollThumbnails('right')}
            className="flex-shrink-0 bg-gray-200 hover:bg-gray-300 rounded-full w-10 h-10 flex items-center justify-center transition-colors"
            aria-label="Scroll thumbnails right"
          >
            <svg
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-6 h-6"
            >
              <path
                fillRule="evenodd"
                d="M7.861 4.125c-.335-.293-.84-.039-.84.424L7 19.362c0 .446.481.697.811.424l8.693-7.203a.56.56 0 0 0 .011-.836L7.861 4.125z"
              />
            </svg>
          </button>
        </div>
      </div>

      <style jsx>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  );
}
