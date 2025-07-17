
import React, { useCallback, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import bannerLongevityWellness from '@/assets/banner-longevity-wellness.jpg';
import bannerAiWorkplace from '@/assets/banner-ai-workplace.jpg';
import bannerMenopauseGuide from '@/assets/banner-menopause-guide.jpg';

const slides = [
  {
    id: 1,
    image: bannerLongevityWellness,
    alt: 'The Longevity Code: Daily Habits for a Healthier, Longer Life',
  },
  {
    id: 2,
    image: bannerAiWorkplace,
    alt: 'Work Smarter with AI: 30 Tools for the Modern Professional',
  },
  {
    id: 3,
    image: bannerMenopauseGuide,
    alt: 'Strong, Calm & Confident: A Modern Guide to Menopause',
  },
];

const HeroCarousel = () => {
  const [emblaRef, emblaApi] = useEmblaCarousel(
    { 
      loop: true,
      align: 'center',
      skipSnaps: false,
      dragFree: false,
    },
    [
      Autoplay({
        delay: 5000,
        stopOnInteraction: false,
        stopOnMouseEnter: true,
      }),
    ]
  );

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  const [selectedIndex, setSelectedIndex] = React.useState(0);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    
    onSelect();
    emblaApi.on('select', onSelect);
    
    return () => {
      emblaApi.off('select', onSelect);
    };
  }, [emblaApi, onSelect]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'ArrowLeft') {
        scrollPrev();
      } else if (event.key === 'ArrowRight') {
        scrollNext();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [scrollPrev, scrollNext]);

  return (
    <section 
      className="relative w-full overflow-hidden bg-yutime-neutral"
      role="region"
      aria-label="Hero carousel showcasing featured courses"
    >
      <div className="embla" ref={emblaRef}>
        <div className="embla__container flex">
          {slides.map((slide, index) => (
            <div
              key={slide.id}
              className="embla__slide flex-shrink-0 w-full relative"
              role="group"
              aria-roledescription="slide"
              aria-label={`Slide ${index + 1} of ${slides.length}`}
            >
              <div className="relative w-full h-[300px] md:h-[450px] lg:h-[580px] overflow-hidden">
                <img
                  src={slide.image}
                  alt={slide.alt}
                  className="w-full h-full object-cover object-center"
                  loading={index === 0 ? 'eager' : 'lazy'}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Navigation buttons */}
      <button
        className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 z-10 bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white p-2 md:p-3 rounded-full transition-all duration-300 transform hover:scale-110"
        onClick={scrollPrev}
        aria-label="Previous slide"
        type="button"
      >
        <ChevronLeft size={20} className="md:w-6 md:h-6" />
      </button>
      
      <button
        className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-10 bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white p-2 md:p-3 rounded-full transition-all duration-300 transform hover:scale-110"
        onClick={scrollNext}
        aria-label="Next slide"
        type="button"
      >
        <ChevronRight size={20} className="md:w-6 md:h-6" />
      </button>

      {/* Dot indicators */}
      <div 
        className="absolute bottom-4 md:bottom-8 left-1/2 -translate-x-1/2 flex space-x-2 z-10"
        role="tablist"
        aria-label="Carousel slide indicators"
      >
        {slides.map((_, index) => (
          <button
            key={index}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === selectedIndex 
                ? 'bg-white scale-125' 
                : 'bg-white/50 hover:bg-white/75'
            }`}
            onClick={() => emblaApi?.scrollTo(index)}
            aria-label={`Go to slide ${index + 1}`}
            role="tab"
            aria-selected={index === selectedIndex}
            type="button"
          />
        ))}
      </div>

      {/* Slide counter */}
      <div className="absolute top-4 md:top-8 right-4 md:right-8 z-10">
        <div className="bg-black/20 backdrop-blur-sm text-white px-3 py-1 rounded-full text-sm font-medium">
          {String(selectedIndex + 1).padStart(2, '0')} / {String(slides.length).padStart(2, '0')}
        </div>
      </div>
    </section>
  );
};

export default HeroCarousel;
