import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useEffect, useState } from 'react';

export default function MemorySlideshow({ images }) {
  const [activeIndex, setActiveIndex] = useState(0);

  const showPrevious = () => {
    setActiveIndex((index) => (index - 1 + images.length) % images.length);
  };

  const showNext = () => {
    setActiveIndex((index) => (index + 1) % images.length);
  };

  useEffect(() => {
    const timer = window.setInterval(showNext, 5000);
    return () => window.clearInterval(timer);
  }, [images.length]);

  return (
    <section className="section memories-section" aria-labelledby="memories-title">
      <div className="section__inner">
        <p className="eyebrow">Our Memories</p>
        <h2 id="memories-title">A Few Favorite Moments</h2>
        <div className="slideshow">
          <div className="slide-frame">
            {images.map((image, index) => (
              <img
                className={index === activeIndex ? 'slide slide--active' : 'slide'}
                src={image.src}
                alt={image.alt}
                key={image.src}
              />
            ))}
            <button className="slide-button slide-button--prev" onClick={showPrevious} aria-label="Previous memory">
              <ChevronLeft size={24} aria-hidden="true" />
            </button>
            <button className="slide-button slide-button--next" onClick={showNext} aria-label="Next memory">
              <ChevronRight size={24} aria-hidden="true" />
            </button>
          </div>
          <div className="slide-dots" aria-label="Choose memory">
            {images.map((image, index) => (
              <button
                className={index === activeIndex ? 'dot dot--active' : 'dot'}
                key={image.src}
                onClick={() => setActiveIndex(index)}
                aria-label={`Show memory ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
