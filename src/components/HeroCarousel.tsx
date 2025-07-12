
import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Play, ArrowRight } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { useNavigate } from 'react-router-dom';

interface CarouselSlide {
  id: number;
  title: string;
  tagline: string;
  instructor: {
    name: string;
    avatar: string;
  };
  backgroundImage: string;
  ctaText: string;
  ctaAction: () => void;
}

const HeroCarousel = () => {
  const navigate = useNavigate();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const slides: CarouselSlide[] = [
    {
      id: 1,
      title: "數位生活輕鬆學",
      tagline: "從基礎開始，讓科技成為生活好幫手",
      instructor: {
        name: "李老師",
        avatar: "https://images.unsplash.com/photo-1494790108755-2616b332033c?w=150&h=150&fit=crop&crop=face"
      },
      backgroundImage: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=1920&h=800&fit=crop",
      ctaText: "開始學習",
      ctaAction: () => scrollToSection('courses')
    },
    {
      id: 2,
      title: "健康養生新觀念",
      tagline: "科學證實的健康方法，陪你活出精彩人生",
      instructor: {
        name: "王醫師",
        avatar: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=150&h=150&fit=crop&crop=face"
      },
      backgroundImage: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=1920&h=800&fit=crop",
      ctaText: "探索課程",
      ctaAction: () => scrollToSection('courses')
    },
    {
      id: 3,
      title: "理財規劃智慧課",
      tagline: "退休理財不煩惱，專業指導讓財富增值",
      instructor: {
        name: "陳顧問",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face"
      },
      backgroundImage: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=1920&h=800&fit=crop",
      ctaText: "立即報名",
      ctaAction: () => scrollToSection('courses')
    }
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  // Auto-play functionality
  useEffect(() => {
    if (!isAutoPlaying) return;
    
    const interval = setInterval(nextSlide, 5000);
    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  // Pause auto-play on hover
  const handleMouseEnter = () => setIsAutoPlaying(false);
  const handleMouseLeave = () => setIsAutoPlaying(true);

  // Keyboard navigation
  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'ArrowLeft') {
      prevSlide();
    } else if (event.key === 'ArrowRight') {
      nextSlide();
    }
  };

  const currentSlideData = slides[currentSlide];

  return (
    <section 
      className="relative w-full h-[70vh] md:h-[80vh] lg:h-[90vh] overflow-hidden"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onKeyDown={handleKeyDown}
      tabIndex={0}
      role="region"
      aria-label="Hero Carousel"
      aria-live="polite"
    >
      {/* Background Image with Overlay */}
      <div className="absolute inset-0">
        <img 
          src={currentSlideData.backgroundImage}
          alt={`Background for ${currentSlideData.title}`}
          className="w-full h-full object-cover transition-all duration-700 ease-in-out"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/40 to-transparent"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 h-full flex items-center">
        <div className="container max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              {/* Instructor Info */}
              <div className="flex items-center space-x-4 animate-fade-in">
                <img 
                  src={currentSlideData.instructor.avatar}
                  alt={currentSlideData.instructor.name}
                  className="w-16 h-16 rounded-full border-4 border-white/20 object-cover"
                />
                <div>
                  <p className="text-white/90 text-lg font-medium">講師</p>
                  <p className="text-white text-xl font-semibold">{currentSlideData.instructor.name}</p>
                </div>
              </div>

              {/* Main Content */}
              <div className="space-y-6">
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif text-white leading-tight animate-slide-up">
                  {currentSlideData.title}
                </h1>
                <p className="text-xl md:text-2xl text-white/90 leading-relaxed font-light max-w-2xl animate-fade-in">
                  {currentSlideData.tagline}
                </p>
              </div>

              {/* CTA Button */}
              <div className="flex flex-wrap gap-4 animate-fade-in">
                <Button
                  onClick={currentSlideData.ctaAction}
                  className="bg-yutime-coral hover:bg-yutime-coral/90 text-white px-8 py-4 text-lg rounded-xl font-medium transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
                >
                  <Play className="mr-2" size={20} />
                  {currentSlideData.ctaText}
                </Button>
                <Button
                  variant="outline"
                  onClick={() => scrollToSection('courses')}
                  className="border-2 border-white/80 text-white bg-white/10 backdrop-blur-sm hover:bg-white hover:text-yutime-primary px-8 py-4 text-lg rounded-xl font-medium transition-all duration-300"
                >
                  瀏覽所有課程
                  <ArrowRight className="ml-2" size={20} />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 z-20 w-12 h-12 bg-white/20 backdrop-blur-sm hover:bg-white/30 rounded-full flex items-center justify-center transition-all duration-300 group"
        aria-label="Previous slide"
      >
        <ChevronLeft className="text-white group-hover:scale-110 transition-transform" size={24} />
      </button>
      
      <button
        onClick={nextSlide}
        className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-20 w-12 h-12 bg-white/20 backdrop-blur-sm hover:bg-white/30 rounded-full flex items-center justify-center transition-all duration-300 group"
        aria-label="Next slide"
      >
        <ChevronRight className="text-white group-hover:scale-110 transition-transform" size={24} />
      </button>

      {/* Slide Indicators */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex space-x-3">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentSlide 
                ? 'bg-white scale-125 shadow-lg' 
                : 'bg-white/50 hover:bg-white/70'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Auto-play pause/play indicator */}
      <div className="absolute top-4 right-4 z-20">
        <button
          onClick={() => setIsAutoPlaying(!isAutoPlaying)}
          className="w-10 h-10 bg-white/20 backdrop-blur-sm hover:bg-white/30 rounded-full flex items-center justify-center transition-all duration-300"
          aria-label={isAutoPlaying ? "Pause auto-play" : "Resume auto-play"}
        >
          {isAutoPlaying ? (
            <div className="w-2 h-4 bg-white rounded-sm"></div>
          ) : (
            <Play className="text-white ml-0.5" size={16} />
          )}
        </button>
      </div>
    </section>
  );
};

export default HeroCarousel;
