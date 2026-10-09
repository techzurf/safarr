/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { QuickActions } from './components/QuickActions';
import { PackagesSection } from './components/PackagesSection';
import { FeaturedPackage } from './components/FeaturedPackage';
import { UmrahJourney } from './components/UmrahJourney';
import { MakkahMadinah } from './components/MakkahMadinah';
import { ServicesSection } from './components/ServicesSection';
import { WhyAsSafar } from './components/WhyAsSafar';
import { AboutSection } from './components/AboutSection';
import { TestimonialsSection } from './components/TestimonialsSection';
import { GallerySection } from './components/GallerySection';
import { FaqSection } from './components/FaqSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { MobileBottomNav } from './components/MobileBottomNav';
import { FloatingWhatsApp } from './components/FloatingWhatsApp';
import { EnquiryModal } from './components/EnquiryModal';
import { HajjModal } from './components/HajjModal';
import { PackageItem } from './types';

export default function App() {
  const [activeSection, setActiveSection] = useState<string>('home');
  const [isEnquiryOpen, setIsEnquiryOpen] = useState(false);
  const [selectedPackageId, setSelectedPackageId] = useState<string>('premium');
  const [isHajjOpen, setIsHajjOpen] = useState(false);

  // Monitor scroll position to update active navigation tab
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'packages', 'umrah', 'about', 'why-us', 'contact'];
      const scrollPos = window.scrollY + 200;

      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      const offset = 70;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = el.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
      setActiveSection(id);
    }
  };

  const handleOpenEnquiry = (defaultPkgId?: string) => {
    if (defaultPkgId) {
      setSelectedPackageId(defaultPkgId);
    }
    setIsEnquiryOpen(true);
  };

  const handleSelectPackage = (pkg: PackageItem) => {
    setSelectedPackageId(pkg.id);
    setIsEnquiryOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#F8F5EE] text-[#17332D] flex flex-col font-sans selection:bg-[#0B5D4B] selection:text-[#F8F5EE]">
      {/* Sticky Header (Desktop 3-zone contract + Compact App Bar on Mobile) */}
      <Header
        onOpenEnquiry={() => handleOpenEnquiry('premium')}
        onOpenHajj={() => setIsHajjOpen(true)}
        activeSection={activeSection}
      />

      {/* Main Content Area - Full-width single column on mobile with safe bottom nav clearance */}
      <main className="flex-1 w-full max-w-full overflow-x-hidden pb-24 lg:pb-0">
        {/* Hero Section */}
        <Hero
          onExplorePackages={() => scrollToSection('packages')}
          onExploreHajj={() => setIsHajjOpen(true)}
          onEnquireNow={() => handleOpenEnquiry('premium')}
          onTalkToTeam={() => scrollToSection('contact')}
        />

        {/* Quick Actions (Mobile App Bar / Desktop 4-grid) */}
        <QuickActions
          onScrollToPackages={() => scrollToSection('packages')}
          onOpenHajj={() => setIsHajjOpen(true)}
        />

        {/* Umrah Packages (Filterable cards with inclusions accordion) */}
        <PackagesSection onSelectPackage={handleSelectPackage} />

        {/* Featured Package Spotlight (Premium Umrah Experience) */}
        <FeaturedPackage onGetDetails={() => handleOpenEnquiry('premium')} />

        {/* Umrah Journey (7-step interactive visual roadmap) */}
        <UmrahJourney />

        {/* Makkah & Madinah Holy Sanctuaries */}
        <MakkahMadinah />

        {/* Comprehensive Services Grid (10 services) */}
        <ServicesSection />

        {/* Why As-Safar (6 Pillars + Trust Indicators) */}
        <WhyAsSafar />

        {/* About As-Safar (Trichy Roots & Commitment) */}
        <AboutSection />

        {/* Testimonials (Real pilgrims from Trichy, Thanjavur, Pudukkottai) */}
        <TestimonialsSection />

        {/* Sacred Moments Gallery */}
        <GallerySection />

        {/* Frequently Asked Questions Accordion */}
        <FaqSection />

        {/* Contact & Pilgrimage Enquiry Form with Trichy Office & Directions */}
        <ContactSection />
      </main>

      {/* Footer (Desktop & Tablet) */}
      <Footer
        onOpenHajj={() => setIsHajjOpen(true)}
        onOpenEnquiry={() => handleOpenEnquiry('premium')}
      />

      {/* Floating WhatsApp Action Button (Never overlaps bottom navigation) */}
      <FloatingWhatsApp />

      {/* Mobile-Only Bottom Navigation Bar (Hidden on desktop/tablet >= 1024px) */}
      <MobileBottomNav
        activeTab={activeSection === 'why-us' ? 'about' : activeSection}
        onSelectTab={scrollToSection}
      />

      {/* Interactive Enquiry Modal / Mobile Bottom Sheet */}
      <EnquiryModal
        isOpen={isEnquiryOpen}
        onClose={() => setIsEnquiryOpen(false)}
        defaultPackageId={selectedPackageId}
      />

      {/* Hajj 2026 Advisory Modal */}
      <HajjModal
        isOpen={isHajjOpen}
        onClose={() => setIsHajjOpen(false)}
        onOpenEnquiry={() => handleOpenEnquiry('hajj')}
      />
    </div>
  );
}
