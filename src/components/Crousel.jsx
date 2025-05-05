import React, { useEffect, useRef, useState } from 'react';

const photos = [
  'https://images.unsplash.com/photo-1494879540385-bc170b0878a7',
  'https://images.unsplash.com/photo-1501785888041-af3ef285b470',
  'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b',
  'https://images.unsplash.com/photo-1596779845727-d88eb78a1b08',
  'https://images.unsplash.com/photo-1596779845727-d88eb78a1b08',
  'https://images.unsplash.com/photo-1596779845727-d88eb78a1b08',
];

export default function OuterDiv() {
  const containerRef = useRef(null);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex(prev => (prev + 1) % photos.length);
    }, 3000); // auto-scroll every 3s

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    if (container) {
      const scrollX = container.offsetWidth * index;
      container.scrollTo({
        left: scrollX,
        behavior: 'smooth',
      });
    }
  }, [index]);

  return (
    <div className='relative w-full h-full bg-green-700 rounded-lg text-white overflow-hidden'>
      {/* Carousel */}
      <div
        ref={containerRef}
        className="flex overflow-x-auto scroll-smooth snap-x snap-mandatory w-full h-full"
        style={{ scrollSnapType: 'x mandatory' }}
      >
        {photos.map((src, i) => (
          <img
            key={i}
            src={`${src}?auto=format&fit=crop&w=1920&q=80`}
            alt={`Photo ${i + 1}`}
            className="w-full h-full object-cover snap-center shrink-0"
          />
        ))}
      </div>

      {/* Dots */}
      <div className="absolute bottom-4 w-full flex justify-center gap-2">
        {photos.map((_, i) => (
          <div
            key={i}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              i === index ? 'bg-white scale-125' : 'bg-white/50'
            }`}
          ></div>
        ))}
      </div>
    </div>
  );
}
