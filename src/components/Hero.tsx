import React, { useState, useEffect, useRef, useCallback } from 'react';
import { ChevronLeft, ChevronRight, Compass, PhoneCall, ShieldCheck, MapPin, Sparkles, Send } from 'lucide-react';
import { BRAND_INFO } from '../data/content';
import { KaabaGraphic, MadinahGraphic, IslamicStarIcon } from './IslamicMotifs';
import kaabaHeroImg from '../assets/images/hero_umrah_kaaba_1791523686904.jpg';
import hajjHeroImg from '../assets/images/hero_hajj_pilgrims_1791523697667.jpg';
import madinahHeroImg from '../assets/images/hero_madinah_mosque_1791523708147.jpg';

export interface HeroProps {
  onExplorePackages: () => void;
  onExploreHajj?: () => void;
  onEnquireNow?: () => void;
  onTalkToTeam: () => void;
}

interface SlideData {
  id: number;
  kicker: string;
  headlinePrefix: string;
  headlineHighlight: string;
  headlineSuffix?: string;
  description: string;
  primaryButtonText: string;
  secondaryButtonText: string;
  primaryAction: 'packages' | 'hajj';
  secondaryAction: 'enquiry' | 'contact';
  imageSrc: string;
  imageAlt: string;
  fallbackType: 'kaaba' | 'madinah';
  locationBadge: string;
  badgeDetail: string;
  animationType: 'fade-up' | 'fade-slide' | 'fade-in';
}

export const Hero: React.FC<HeroProps> = ({
  onExplorePackages,
  onExploreHajj,
  onEnquireNow,
  onTalkToTeam,
}) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [imageErrors, setImageErrors] = useState<Record<number, boolean>>({});
  
  // Touch swipe handling
  const touchStartXRef = useRef<number | null>(null);
  const touchEndXRef = useRef<number | null>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const slides: SlideData[] = [
    {
      id: 0,
      kicker: 'Discover the Blessings of Umrah',
      headlinePrefix: 'Your ',
      headlineHighlight: 'Sacred Journey',
      headlineSuffix: ' Begins Here',
      description:
        'Experience a meaningful Umrah journey with thoughtfully arranged packages, comfortable stays, and dedicated travel assistance.',
      primaryButtonText: 'Explore Umrah Packages',
      secondaryButtonText: 'Enquire Now',
      primaryAction: 'packages',
      secondaryAction: 'enquiry',
      imageSrc: kaabaHeroImg,
      imageAlt: 'The Holy Kaaba in Masjid al-Haram, Makkah with pilgrims performing Tawaf',
      fallbackType: 'kaaba',
      locationBadge: 'Masjid al-Haram, Makkah',
      badgeDetail: 'Tawaf & Umrah Guidance',
      animationType: 'fade-up',
    },
    {
      id: 1,
      kicker: 'Your Journey to Hajj',
      headlinePrefix: 'Answer the ',
      headlineHighlight: 'Call of Hajj',
      headlineSuffix: '',
      description:
        'Prepare for your sacred pilgrimage with trusted guidance, organised travel arrangements, and support throughout your journey.',
      primaryButtonText: 'Explore Hajj Packages',
      secondaryButtonText: 'Speak to Our Team',
      primaryAction: 'hajj',
      secondaryAction: 'contact',
      imageSrc: hajjHeroImg,
      imageAlt: 'Hajj pilgrims in white Ihram gathered in heartfelt prayer at the sacred sites',
      fallbackType: 'kaaba',
      locationBadge: 'Jabal ar-Rahmah, Makkah',
      badgeDetail: 'Hajj 2026 Advisory',
      animationType: 'fade-slide',
    },
    {
      id: 2,
      kicker: 'A Journey of Faith and Discovery',
      headlinePrefix: 'Experience the ',
      headlineHighlight: 'Beauty of Your Sacred Journey',
      headlineSuffix: '',
      description:
        'Travel with peace of mind and discover the spiritual beauty of Makkah and Madinah with As-Safar.',
      primaryButtonText: 'Discover Our Packages',
      secondaryButtonText: 'Contact Us',
      primaryAction: 'packages',
      secondaryAction: 'contact',
      imageSrc: madinahHeroImg,
      imageAlt: 'Al-Masjid an-Nabawi in Madinah with illuminated green dome and serene courtyard',
      fallbackType: 'madinah',
      locationBadge: 'Al-Masjid an-Nabawi, Madinah',
      badgeDetail: 'Serene Sanctuary Stays',
      animationType: 'fade-up',
    },
  ];

  const totalSlides = slides.length;

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % totalSlides);
  }, [totalSlides]);

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
  }, [totalSlides]);

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  // Auto-advance slider every 6 seconds with timer reset on manual interaction
  useEffect(() => {
    if (isPaused) {
      if (timerRef.current) clearInterval(timerRef.current);
      return;
    }

    timerRef.current = setInterval(() => {
      nextSlide();
    }, 6000);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [currentSlide, isPaused, nextSlide]);

  // Touch gesture handlers for mobile
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartXRef.current = e.targetTouches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndXRef.current = e.targetTouches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (!touchStartXRef.current || !touchEndXRef.current) return;
    const distance = touchStartXRef.current - touchEndXRef.current;
    const isSwipe = Math.abs(distance) > 50;

    if (isSwipe) {
      if (distance > 0) {
        // Swiped left -> next slide
        nextSlide();
      } else {
        // Swiped right -> prev slide
        prevSlide();
      }
    }

    touchStartXRef.current = null;
    touchEndXRef.current = null;
  };

  // Keyboard navigation for accessibility
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowRight') {
      nextSlide();
    } else if (e.key === 'ArrowLeft') {
      prevSlide();
    }
  };

  const handlePrimaryClick = (action: 'packages' | 'hajj') => {
    if (action === 'hajj') {
      if (onExploreHajj) {
        onExploreHajj();
      } else {
        onExplorePackages();
      }
    } else {
      onExplorePackages();
    }
  };

  const handleSecondaryClick = (action: 'enquiry' | 'contact') => {
    if (action === 'enquiry') {
      if (onEnquireNow) {
        onEnquireNow();
      } else {
        onTalkToTeam();
      }
    } else {
      onTalkToTeam();
    }
  };

  return (
    <section
      id="home"
      aria-label="Hero Highlights"
      className="relative w-full h-[620px] sm:h-[660px] lg:h-[700px] overflow-hidden bg-[#05261F] text-white select-none focus:outline-none"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      onKeyDown={handleKeyDown}
      tabIndex={0}
    >
      {/* Background Slides Layer */}
      {slides.map((slide, index) => {
        const isActive = index === currentSlide;
        const hasError = imageErrors[slide.id];

        return (
          <div
            key={slide.id}
            aria-hidden={!isActive}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              isActive ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'
            }`}
          >
            {/* Cinematic Background Image with Ken Burns zoom when active */}
            {!hasError ? (
              <img
                src={slide.imageSrc}
                alt={slide.imageAlt}
                loading={index === 0 ? 'eager' : 'lazy'}
                referrerPolicy="no-referrer"
                onError={() =>
                  setImageErrors((prev) => ({ ...prev, [slide.id]: true }))
                }
                className={`w-full h-full object-cover object-center ${
                  isActive ? 'animate-hero-zoom' : 'scale-100'
                }`}
              />
            ) : (
              // Styled Resilient SVG Fallback
              <div className="w-full h-full object-cover">
                {slide.fallbackType === 'kaaba' ? (
                  <KaabaGraphic className="w-full h-full object-cover" />
                ) : (
                  <MadinahGraphic className="w-full h-full object-cover" />
                )}
              </div>
            )}

            {/* Subtle Islamic Sacred Geometry Texture Overlay */}
            <div
              className="absolute inset-0 opacity-[0.06] pointer-events-none mix-blend-overlay"
              style={{
                backgroundImage:
                  'radial-gradient(#C9A24D 1.5px, transparent 1.5px), radial-gradient(#F8F5EE 1.5px, #073E32 1.5px)',
                backgroundSize: '40px 40px',
                backgroundPosition: '0 0, 20px 20px',
              }}
            />

            {/* Premium Deep Emerald & Charcoal Gradient Scrim to ensure WCAG AA legibility */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#04201A]/95 via-[#06332A]/80 to-[#073E32]/35" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#04201A] via-transparent to-black/30" />
          </div>
        );
      })}

      {/* Foreground Content Container */}
      <div className="relative z-20 h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col justify-between py-8 sm:py-12 lg:py-16">
        {/* Top Spacer / Subtle Trust Tag */}
        <div className="pt-2">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-[#C9A24D]/40 text-xs sm:text-sm font-medium text-[#F8F5EE]">
            <IslamicStarIcon className="w-3.5 h-3.5 text-[#C9A24D]" />
            <span>{BRAND_INFO.trustBadge}</span>
            <span className="text-[#C9A24D] hidden sm:inline">·</span>
            <span className="text-[#EAF3EF]/90 hidden sm:inline">Cantonment Office, Trichy</span>
          </div>
        </div>

        {/* Dynamic Center/Left Slide Text & Action Buttons */}
        <div className="my-auto max-w-3xl text-left">
          {slides.map((slide, index) => {
            const isActive = index === currentSlide;
            if (!isActive) return null;

            return (
              <div
                key={slide.id}
                className="space-y-5 sm:space-y-6"
              >
                {/* Slide Kicker / Category Indicator */}
                <div
                  className="flex items-center gap-2 text-xs sm:text-sm font-semibold uppercase tracking-wider text-[#C9A24D] animate-hero-fade-up"
                  style={{ animationDelay: '50ms' }}
                >
                  <Sparkles className="w-4 h-4 text-[#C9A24D] shrink-0" />
                  <span>{slide.kicker}</span>
                </div>

                {/* Main Headline with Staggered Entrance */}
                <h1
                  className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-[#FFFFFF] leading-[1.14] text-balance animate-hero-fade-up"
                  style={{ animationDelay: '150ms' }}
                >
                  {slide.headlinePrefix}
                  <span className="text-[#C9A24D] relative inline-block">
                    {slide.headlineHighlight}
                    <span className="absolute bottom-1 left-0 w-full h-[2px] bg-gradient-to-r from-[#C9A24D]/80 to-transparent rounded-full" />
                  </span>
                  {slide.headlineSuffix}
                </h1>

                {/* Subtitle / Description */}
                <p
                  className="text-[#EAF3EF]/95 text-base sm:text-lg md:text-xl font-normal max-w-2xl leading-relaxed text-pretty animate-hero-fade-up"
                  style={{ animationDelay: '250ms' }}
                >
                  {slide.description}
                </p>

                {/* Trust Markers Bar */}
                <div
                  className="flex flex-wrap items-center gap-x-5 gap-y-2 pt-1 text-xs sm:text-sm text-[#F8F5EE]/85 animate-hero-fade-up"
                  style={{ animationDelay: '320ms' }}
                >
                  <div className="flex items-center gap-1.5">
                    <ShieldCheck className="w-4 h-4 text-[#C9A24D]" />
                    <span>100% Verified Hotels</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <MapPin className="w-4 h-4 text-[#C9A24D]" />
                    <span>Trichy & Chennai Departures</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#C9A24D]" />
                    <span>Tamil-Speaking Aalims</span>
                  </div>
                </div>

                {/* Functional Action Buttons */}
                <div
                  className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 pt-3 animate-hero-fade-up"
                  style={{ animationDelay: '400ms' }}
                >
                  <button
                    onClick={() => handlePrimaryClick(slide.primaryAction)}
                    className="bg-[#C9A24D] hover:bg-[#B38D3B] active:bg-[#A37D2B] text-[#05261F] font-bold text-sm sm:text-base px-7 sm:px-8 py-3.5 rounded-xl shadow-lg shadow-[#041a15]/60 hover:shadow-xl hover:shadow-[#041a15]/80 transition-all duration-200 flex items-center justify-center gap-2.5 active:scale-[0.98] min-h-[48px] cursor-pointer"
                  >
                    <Compass className="w-5 h-5 text-[#05261F]" />
                    <span>{slide.primaryButtonText}</span>
                  </button>

                  <button
                    onClick={() => handleSecondaryClick(slide.secondaryAction)}
                    className="bg-white/10 hover:bg-white/20 active:bg-white/25 text-white border border-white/25 hover:border-white/40 font-semibold text-sm sm:text-base px-6 sm:px-7 py-3.5 rounded-xl backdrop-blur-md transition-all duration-200 flex items-center justify-center gap-2 active:scale-[0.98] min-h-[48px] cursor-pointer"
                  >
                    {slide.secondaryAction === 'enquiry' ? (
                      <Send className="w-4 h-4 text-[#C9A24D]" />
                    ) : (
                      <PhoneCall className="w-4 h-4 text-[#C9A24D]" />
                    )}
                    <span>{slide.secondaryButtonText}</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Bar: Location pill on left, Pagination Dots center, Slide Counter right */}
        <div className="relative flex items-center justify-between pt-4 border-t border-white/10">
          {/* Active Landmark Info (Left) */}
          <div className="hidden sm:flex items-center gap-2 text-xs text-[#EAF3EF]/80">
            <span className="inline-block w-2 h-2 rounded-full bg-[#C9A24D]" />
            <span className="font-semibold text-white">
              {slides[currentSlide].locationBadge}
            </span>
            <span className="text-[#C9A24D]">·</span>
            <span>{slides[currentSlide].badgeDetail}</span>
          </div>

          {/* Centered Pagination Dots */}
          <div className="flex items-center gap-2.5 mx-auto sm:mx-0">
            {slides.map((slide, index) => {
              const isActive = index === currentSlide;
              return (
                <button
                  key={slide.id}
                  onClick={() => goToSlide(index)}
                  className={`group relative h-2.5 transition-all duration-300 rounded-full cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#C9A24D] focus:ring-offset-2 focus:ring-offset-[#073E32] ${
                    isActive
                      ? 'w-8 bg-[#C9A24D] shadow-md shadow-[#C9A24D]/50'
                      : 'w-2.5 bg-white/35 hover:bg-white/60'
                  }`}
                  aria-label={`Go to slide ${index + 1}: ${slide.kicker}`}
                  aria-current={isActive ? 'true' : 'false'}
                >
                  <span className="sr-only">{slide.kicker}</span>
                </button>
              );
            })}
          </div>

          {/* Slide Numeric Indicator & Autoplay Status (Right) */}
          <div className="hidden sm:flex items-center gap-3 text-xs text-white/70 font-mono tabular-nums">
            <span className="font-semibold text-[#C9A24D]">0{currentSlide + 1}</span>
            <span className="text-white/40">/</span>
            <span>0{totalSlides}</span>
          </div>
        </div>
      </div>

      {/* Desktop Previous & Next Navigation Arrows */}
      <button
        onClick={prevSlide}
        aria-label="Previous slide"
        className="hidden md:flex absolute left-4 lg:left-6 top-1/2 -translate-y-1/2 z-30 w-11 h-11 items-center justify-center rounded-full bg-black/30 hover:bg-[#073E32]/80 text-white/80 hover:text-white border border-white/15 backdrop-blur-md transition-all duration-200 active:scale-95 hover:border-[#C9A24D]/60 cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#C9A24D]"
      >
        <ChevronLeft className="w-5 h-5" />
      </button>

      <button
        onClick={nextSlide}
        aria-label="Next slide"
        className="hidden md:flex absolute right-4 lg:right-6 top-1/2 -translate-y-1/2 z-30 w-11 h-11 items-center justify-center rounded-full bg-black/30 hover:bg-[#073E32]/80 text-white/80 hover:text-white border border-white/15 backdrop-blur-md transition-all duration-200 active:scale-95 hover:border-[#C9A24D]/60 cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#C9A24D]"
      >
        <ChevronRight className="w-5 h-5" />
      </button>

      {/* Subtle Progress Bar along the bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-white/10 z-30">
        <div
          key={currentSlide}
          className={`h-full bg-gradient-to-r from-[#C9A24D] to-[#F3DC9B] transition-all ${
            isPaused ? 'w-full opacity-60' : 'w-full transition-all duration-[6000ms] ease-linear'
          }`}
          style={{
            animation: !isPaused ? 'progressWidth 6s linear forwards' : 'none',
          }}
        />
      </div>
    </section>
  );
};

