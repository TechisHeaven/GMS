import { ChevronLeft, ChevronRight } from "lucide-react";
import React, { useState, useEffect, useRef, ReactNode } from "react";

interface BannerSliderProps {
  children: ReactNode[];
  itemsPerSlide?: number;
  autoplayInterval?: number;
  showDots?: boolean;
  showArrows?: boolean;
}
const BannerSlider = ({
  children,
  itemsPerSlide = 1,
  autoplayInterval = 5000,
  showDots = true,
  showArrows = true,
}: BannerSliderProps) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const slideRef = useRef(null);
  const totalSlides = Math.ceil(React.Children.count(children) / itemsPerSlide);

  useEffect(() => {
    let intervalId: any;

    if (autoplayInterval > 0 && !isPaused) {
      intervalId = setInterval(() => {
        goToNextSlide();
      }, autoplayInterval);
    }

    return () => {
      clearInterval(intervalId);
    };
  }, [currentSlide, isPaused, autoplayInterval]);

  const goToSlide = (slideIndex: number) => {
    let targetSlide = slideIndex;

    if (slideIndex < 0) {
      targetSlide = totalSlides - 1;
    } else if (slideIndex >= totalSlides) {
      targetSlide = 0;
    }

    setCurrentSlide(targetSlide);
  };

  const goToNextSlide = () => {
    goToSlide(currentSlide + 1);
  };

  const goToPrevSlide = () => {
    goToSlide(currentSlide - 1);
  };

  const renderSlides = () => {
    const items = React.Children.toArray(children);
    const slides = [];

    for (let i = 0; i < totalSlides; i++) {
      const startIndex = i * itemsPerSlide;
      const slideItems = items.slice(startIndex, startIndex + itemsPerSlide);

      slides.push(
        <div
          key={i}
          className="w-full flex-shrink-0 transition-transform duration-300 ease-in-out"
          style={{
            transform: `translateX(-${currentSlide * 100}%)`,
            display: "flex",
            justifyContent: "center",
          }}
        >
          {slideItems}
        </div>
      );
    }

    return slides;
  };

  const renderDots = () => {
    if (!showDots) return null;

    return (
      <div className="flex justify-center mt-4">
        {Array.from({ length: totalSlides }).map((_, index) => (
          <button
            key={index}
            className={`mx-1 h-2 w-4 transition-all rounded-full ${
              currentSlide === index ? "bg-blue-600 w-8" : "bg-gray-300"
            }`}
            onClick={() => goToSlide(index)}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    );
  };

  return (
    <div
      className="relative w-full overflow-hidden"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div ref={slideRef} className="flex transition-transform">
        {renderSlides()}
      </div>

      {showArrows && (
        <>
          <button
            className="absolute left-2 top-1/2 -translate-y-1/2 bg-white bg-opacity-50 p-2 rounded-full shadow hover:bg-opacity-75 focus:outline-none"
            onClick={goToPrevSlide}
            aria-label="Previous slide"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>

          <button
            className="absolute right-2 top-1/2 -translate-y-1/2 bg-white bg-opacity-50 p-2 rounded-full shadow hover:bg-opacity-75 focus:outline-none"
            onClick={goToNextSlide}
            aria-label="Next slide"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </>
      )}

      {renderDots()}
    </div>
  );
};

export default BannerSlider;
