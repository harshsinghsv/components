import { useRef, useState } from 'react';

interface CardProps {
  imageUrl: string;
}

const Card: React.FC<CardProps> = ({ imageUrl }) => {
  const cardWrapRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const cardBgRef = useRef<HTMLDivElement>(null);
  const [mouseLeaveTimeout, setMouseLeaveTimeout] = useState<NodeJS.Timeout | null>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const cardWrap = cardWrapRef.current;
    const card = cardRef.current;
    const cardBg = cardBgRef.current;

    if (!cardWrap || !card || !cardBg) return;

    const rect = cardWrap.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    
    // Get mouse position relative to the card (0 to 1 range)
    const mouseX = (e.clientX - rect.left) / width;
    const mouseY = (e.clientY - rect.top) / height;

    // Center the values (-0.5 to 0.5 range)
    const centerX = mouseX - 0.5;
    const centerY = mouseY - 0.5;

    // Calculate tilt angles (max 15 degrees)
    const rotateX = centerY * -30; // Negative for natural tilt
    const rotateY = centerX * 30;

    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;

    // Parallax effect on background
    const tX = centerX * -40;
    const tY = centerY * -40;
    cardBg.style.transform = `translateX(${tX}px) translateY(${tY}px)`;
  };

  const handleMouseEnter = () => {
    if (mouseLeaveTimeout) {
      clearTimeout(mouseLeaveTimeout);
      setMouseLeaveTimeout(null);
    }
  };

  const handleMouseLeave = () => {
    const card = cardRef.current;
    const cardBg = cardBgRef.current;

    const timeout = setTimeout(() => {
      if (card && cardBg) {
        card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg)';
        cardBg.style.transform = 'translateX(0px) translateY(0px)';
      }
    }, 1000);

    setMouseLeaveTimeout(timeout);
  };

  return (
    <div
      ref={cardWrapRef}
      className="card-wrap"
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div ref={cardRef} className="card">
        <div
          ref={cardBgRef}
          className="card-bg"
          style={{ backgroundImage: `url(${imageUrl})` }}
        />
      </div>
    </div>
  );
};

const ParallaxCard = () => {
  const images: string[] = [
    'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=600&fit=crop',
    'https://images.unsplash.com/photo-1511593358241-7eea1f3c84e5?w=400&h=600&fit=crop',
    'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=400&h=600&fit=crop',
    'https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?w=400&h=600&fit=crop'
  ];

  return (
    <>
      <style>{`
        body {
          margin: 40px 0;
          font-family: "Raleway", sans-serif;
          font-size: 14px;
          font-weight: 500;
          background-color: #ffffff;
          -webkit-font-smoothing: antialiased;
        }

        .container {
          min-height: 100vh;
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          align-items: center;
          padding: 20px;
        }

        .card-wrap {
          margin: 10px;
          transform: perspective(800px);
          transform-style: preserve-3d;
          cursor: pointer;
        }

        .card-wrap:hover .card-bg {
          transition: 0.6s cubic-bezier(0.23, 1, 0.32, 1);
        }

        .card-wrap:hover .card {
          box-shadow: 0 30px 60px 0 rgba(0, 0, 0, 1);
        }

        .card {
          position: relative;
          flex: 0 0 240px;
          width: 240px;
          height: 320px;
          background-color: #d0d0d0;
          overflow: hidden;
          border-radius: 10px;
          box-shadow: 0 20px 40px 0 rgba(0, 0, 0, 0.8);
          transition: 1s cubic-bezier(0.445, 0.05, 0.55, 0.95);
        }

        .card-bg {
          opacity: 1;
          position: absolute;
          top: -20px;
          left: -20px;
          right: -20px;
          bottom: -20px;
          background-repeat: no-repeat;
          background-position: center;
          background-size: cover;
          transition: 1s cubic-bezier(0.445, 0.05, 0.55, 0.95);
          pointer-events: none;
        }
      `}</style>

      <div className="container">
        {images.map((img, idx) => (
          <Card key={idx} imageUrl={img} />
        ))}
      </div>
    </>
  );
};

export default ParallaxCard;