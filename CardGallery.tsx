import React from 'react';

interface CardGalleryProps {
  images?: string[];
  onCardClick?: (index: number) => void;
  onCardSelect?: (index: number) => void;
}

const CardGallery: React.FC<CardGalleryProps> = ({
  images: customImages,
  onCardClick,
  onCardSelect
}) => {
  // Default sample images - you can replace these with your own image URLs
  const defaultImages: string[] = [
    'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=300&h=600&fit=crop',
    'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=300&h=600&fit=crop',
    'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=300&h=600&fit=crop',
    'https://images.unsplash.com/photo-1418065460487-3028905053cd?w=300&h=600&fit=crop',
    'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=300&h=600&fit=crop&sat=-100',
    'https://images.unsplash.com/photo-1472214103451-9374bd1c798e?w=300&h=600&fit=crop',
    'https://images.unsplash.com/photo-1426604966848-d7adac402bff?w=300&h=600&fit=crop',
    'https://images.unsplash.com/photo-1439066615861-d1af74d74000?w=300&h=600&fit=crop',
    'https://images.unsplash.com/photo-1501436513145-30f24e19fcc4?w=300&h=600&fit=crop',
    'https://images.unsplash.com/photo-1488227181946-6428a0291777?w=300&h=600&fit=crop',
    'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=300&h=600&fit=crop',
    'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=300&h=600&fit=crop',
    'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=300&h=600&fit=crop'
  ];

  const images = customImages || defaultImages;

  const handleClick = (index: number): void => {
    if (onCardClick) {
      onCardClick(index);
    } else {
      console.log(`Clicked card ${index + 1}`);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>, index: number): void => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      if (onCardSelect) {
        onCardSelect(index);
      } else {
        console.log(`Selected card ${index + 1}`);
      }
    }
  };

  const styles = `
    :root {
      --index: calc(1vw + 1vh);
      --transition: cubic-bezier(0.1, 0.7, 0, 1);
    }
    
    .gallery-container {
      display: flex;
      gap: 0.4rem;
      perspective: calc(var(--index) * 35);
    }
    
    .gallery-item {
      width: calc(var(--index) * 3);
      height: calc(var(--index) * 12);
      background-color: #222;
      background-size: cover;
      background-position: center;
      cursor: pointer;
      filter: grayscale(1) brightness(0.5);
      transition: transform 1.25s var(--transition), 
                 filter 3s var(--transition), 
                 width 1.25s var(--transition);
      will-change: transform, filter, width;
      position: relative;
      outline: none;
    }
    
    .gallery-item::before,
    .gallery-item::after {
      content: '';
      position: absolute;
      height: 100%;
      width: 20px;
      right: calc(var(--index) * -1);
    }
    
    .gallery-item::after {
      left: calc(var(--index) * -1);
    }
    
    .gallery-item:hover {
      filter: none;
      transform: translateZ(calc(var(--index) * 10));
    }
    
    .gallery-item:focus {
      width: 28vw;
      filter: none;
      z-index: 100;
      transform: translateZ(calc(var(--index) * 10));
      margin: 0 0.45vw;
    }
    
    .gallery-item:hover + .gallery-item {
      filter: none;
      transform: translateZ(calc(var(--index) * 8.5)) rotateY(35deg);
      z-index: -1;
    }
    
    .gallery-item:hover + .gallery-item + .gallery-item {
      filter: none;
      transform: translateZ(calc(var(--index) * 5.6)) rotateY(40deg);
      z-index: -2;
    }
    
    .gallery-item:hover + .gallery-item + .gallery-item + .gallery-item {
      filter: none;
      transform: translateZ(calc(var(--index) * 2.5)) rotateY(30deg);
      z-index: -3;
    }
    
    .gallery-item:hover + .gallery-item + .gallery-item + .gallery-item + .gallery-item {
      filter: none;
      transform: translateZ(calc(var(--index) * 0.6)) rotateY(15deg);
      z-index: -4;
    }
    
    .gallery-item:has(+ .gallery-item:hover) {
      filter: none;
      transform: translateZ(calc(var(--index) * 8.5)) rotateY(-35deg);
    }
    
    .gallery-item:has(+ .gallery-item + .gallery-item:hover) {
      filter: none;
      transform: translateZ(calc(var(--index) * 5.6)) rotateY(-40deg);
    }
    
    .gallery-item:has(+ .gallery-item + .gallery-item + .gallery-item:hover) {
      filter: none;
      transform: translateZ(calc(var(--index) * 2.5)) rotateY(-30deg);
    }
    
    .gallery-item:has(+ .gallery-item + .gallery-item + .gallery-item + .gallery-item:hover) {
      filter: none;
      transform: translateZ(calc(var(--index) * 0.6)) rotateY(-15deg);
    }
  `;

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4">
      <style dangerouslySetInnerHTML={{ __html: styles }} />
      
      <div className="gallery-container">
        {images.map((image, index) => (
          <div
            key={index}
            className="gallery-item"
            tabIndex={0}
            style={{ backgroundImage: `url(${image})` }}
            onClick={() => handleClick(index)}
            onKeyDown={(e) => handleKeyDown(e, index)}
            role="button"
            aria-label={`Gallery item ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default CardGallery;