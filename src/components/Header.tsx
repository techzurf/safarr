import React, { useState, useEffect } from 'react';
import { Phone, MessageCircle, CalendarClock } from 'lucide-react';
import { BRAND_INFO } from '../data/content';

interface HeaderProps {
  onOpenEnquiry: (defaultPackage?: string) => void;
  onOpenHajj: () => void;
  activeSection: string;
}

export const Header: React.FC<HeaderProps> = ({ onOpenEnquiry, onOpenHajj, activeSection }) => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      const offset = 70;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = el.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <header
      className={`sticky top-0 z-40 w-full transition-all duration-300 ${
        isScrolled
          ? 'bg-[#F8F5EE]/95 backdrop-blur-md shadow-sm border-b border-[#0B5D4B]/10 py-3'
          : 'bg-[#F8F5EE] border-b border-[#0B5D4B]/10 py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Zone 1: Brand Logo */}
          <a
            href="#home"
            onClick={(e) => {
              e.preventDefault();
              scrollTo('home');
            }}
            className="flex items-center focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0B5D4B] rounded shrink-0"
          >
            <img
              src="https://res.cloudinary.com/ddeivqykl/image/upload/v1791468091/As-safar_Umrah_Services_Logo_1_m8pmg8.png"
              alt="As-Safar Umrah Services"
              className="h-10 sm:h-12 w-auto object-contain"
              width={144}
              height={48}
              loading="eager"
            />
          </a>

          {/* Zone 2: Navigation Links (Desktop 1024px+) */}
          <nav className="hidden lg:flex items-center gap-7 text-[15px] font-medium text-[#17332D]">
            <button
              onClick={() => scrollTo('home')}
              className={`hover:text-[#0B5D4B] transition-colors py-1 cursor-pointer ${
                activeSection === 'home' ? 'text-[#0B5D4B] font-semibold border-b-2 border-[#C9A24D]' : ''
              }`}
            >
              Home
            </button>
            <button
              onClick={() => scrollTo('packages')}
              className={`hover:text-[#0B5D4B] transition-colors py-1 cursor-pointer ${
                activeSection === 'packages' ? 'text-[#0B5D4B] font-semibold border-b-2 border-[#C9A24D]' : ''
              }`}
            >
              Umrah Packages
            </button>
            <button
              onClick={onOpenHajj}
              className="hover:text-[#0B5D4B] transition-colors py-1 cursor-pointer flex items-center gap-1.5"
            >
              <span>Hajj</span>
              <span className="text-[10px] bg-[#EAF3EF] text-[#0B5D4B] font-semibold px-1.5 py-0.5 rounded">2026</span>
            </button>
            <button
              onClick={() => scrollTo('about')}
              className={`hover:text-[#0B5D4B] transition-colors py-1 cursor-pointer ${
                activeSection === 'about' ? 'text-[#0B5D4B] font-semibold border-b-2 border-[#C9A24D]' : ''
              }`}
            >
              About Us
            </button>
            <button
              onClick={() => scrollTo('why-us')}
              className={`hover:text-[#0B5D4B] transition-colors py-1 cursor-pointer ${
                activeSection === 'why-us' ? 'text-[#0B5D4B] font-semibold border-b-2 border-[#C9A24D]' : ''
              }`}
            >
              Why As-Safar
            </button>
            <button
              onClick={() => scrollTo('contact')}
              className={`hover:text-[#0B5D4B] transition-colors py-1 cursor-pointer ${
                activeSection === 'contact' ? 'text-[#0B5D4B] font-semibold border-b-2 border-[#C9A24D]' : ''
              }`}
            >
              Contact
            </button>
          </nav>

          {/* Zone 3: Primary Actions */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Direct Call Quick CTA (Desktop) */}
            <a
              href={`tel:${BRAND_INFO.phoneTel}`}
              className="hidden md:inline-flex items-center gap-2 text-sm font-semibold text-[#0B5D4B] px-3.5 py-2 rounded-lg border border-[#0B5D4B]/20 hover:bg-[#EAF3EF] transition-colors whitespace-nowrap min-h-[44px]"
              title="Call As-Safar Trichy Office"
            >
              <Phone className="w-4 h-4 text-[#C9A24D]" />
              <span>{BRAND_INFO.phoneFormatted}</span>
            </a>

            {/* Mobile quick action icons (< 1024px) */}
            <a
              href={`tel:${BRAND_INFO.phoneTel}`}
              className="lg:hidden flex items-center justify-center w-10 h-10 rounded-full bg-[#EAF3EF] text-[#0B5D4B] active:bg-[#0B5D4B] active:text-white transition-colors"
              aria-label="Call As-Safar"
            >
              <Phone className="w-4 h-4" />
            </a>

            <a
              href={`https://wa.me/919566369654?text=${encodeURIComponent(BRAND_INFO.whatsappMessage)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="lg:hidden flex items-center justify-center w-10 h-10 rounded-full bg-[#0B5D4B]/10 text-[#0B5D4B] active:bg-[#0B5D4B] active:text-white transition-colors"
              aria-label="WhatsApp As-Safar"
            >
              <MessageCircle className="w-4 h-4" />
            </a>

            {/* Primary Action Button (Enquire Now) */}
            <button
              onClick={() => onOpenEnquiry()}
              className="bg-[#0B5D4B] hover:bg-[#084538] text-white text-xs sm:text-sm font-semibold px-4 sm:px-5 py-2.5 rounded-lg shadow-sm hover:shadow transition-all duration-200 flex items-center gap-1.5 whitespace-nowrap active:scale-[0.98] min-h-[40px] cursor-pointer"
            >
              <CalendarClock className="w-4 h-4 text-[#C9A24D]" />
              <span>Enquire Now</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
