import React, { useState } from 'react';
import { Check, Clock, Hotel, Bus, Utensils, FileText, ChevronRight, Sparkles, Info } from 'lucide-react';
import { UMRAH_PACKAGES } from '../data/packages';
import { PackageItem } from '../types';

interface PackagesSectionProps {
  onSelectPackage: (pkg: PackageItem) => void;
}

export const PackagesSection: React.FC<PackagesSectionProps> = ({ onSelectPackage }) => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [expandedPackageId, setExpandedPackageId] = useState<string | null>(null);

  const filteredPackages = activeCategory === 'all'
    ? UMRAH_PACKAGES
    : UMRAH_PACKAGES.filter((p) => p.category === activeCategory);

  const toggleExpand = (id: string) => {
    setExpandedPackageId(expandedPackageId === id ? null : id);
  };

  return (
    <section id="packages" className="py-14 sm:py-20 bg-[#F8F5EE]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-10 sm:mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#EAF3EF] text-[#0B5D4B] text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5 text-[#C9A24D]" />
            <span>Spiritual Journeys Tailored to Your Needs</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-[#17332D] tracking-tight">
            Choose Your Umrah Package
          </h2>

          <p className="text-[#66736F] text-base sm:text-lg leading-relaxed">
            Carefully designed packages for a comfortable and memorable pilgrimage.
          </p>

          {/* Interactive Filter Tabs (Functional Button Controls) */}
          <div className="flex flex-wrap items-center justify-center gap-1.5 sm:gap-2 pt-4">
            {[
              { id: 'all', label: 'All Packages' },
              { id: 'economy', label: 'Economy' },
              { id: 'standard', label: 'Standard' },
              { id: 'premium', label: 'Premium' },
              { id: 'vip', label: 'Exclusive VIP' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveCategory(tab.id)}
                className={`px-4 py-2 text-xs sm:text-sm font-semibold rounded-full transition-all duration-200 cursor-pointer min-h-[40px] ${
                  activeCategory === tab.id
                    ? 'bg-[#0B5D4B] text-white shadow-sm'
                    : 'bg-white text-[#17332D] hover:bg-[#EAF3EF] border border-[#0B5D4B]/15'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Packages Cards Grid (Swipeable on mobile, Multi-column on desktop) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch">
          {filteredPackages.map((pkg) => {
            const isExpanded = expandedPackageId === pkg.id;

            return (
              <div
                key={pkg.id}
                className={`flex flex-col justify-between rounded-2xl bg-white border transition-all duration-300 relative ${
                  pkg.featured
                    ? 'border-[#C9A24D] shadow-xl ring-2 ring-[#C9A24D]/30'
                    : 'border-[#0B5D4B]/15 shadow-sm hover:shadow-md hover:border-[#0B5D4B]/30'
                }`}
              >
                {/* Gold Highlight Badge */}
                {pkg.badge && (
                  <div className="absolute -top-3 left-6 z-10">
                    <span
                      className={`text-[11px] font-bold px-3 py-1 rounded-full uppercase tracking-wider ${
                        pkg.featured
                          ? 'bg-[#C9A24D] text-[#073E32] shadow-sm'
                          : 'bg-[#0B5D4B] text-[#F8F5EE]'
                      }`}
                    >
                      {pkg.badge}
                    </span>
                  </div>
                )}

                {/* Card Top Details */}
                <div className="p-6 space-y-4">
                  {/* Name & Tagline */}
                  <div className="pt-2">
                    <h3 className="font-serif text-2xl font-bold text-[#17332D]">
                      {pkg.name}
                    </h3>
                    <p className="text-xs text-[#66736F] mt-1 line-clamp-2">
                      {pkg.tagline}
                    </p>
                  </div>

                  {/* Duration Pill-less Row */}
                  <div className="flex items-center gap-2 text-xs font-semibold text-[#0B5D4B] bg-[#EAF3EF] px-3 py-1.5 rounded-lg">
                    <Clock className="w-4 h-4 text-[#C9A24D] shrink-0" />
                    <span>{pkg.duration}</span>
                  </div>

                  {/* Core Features Specs */}
                  <div className="space-y-3 pt-2 text-xs border-t border-[#0B5D4B]/10">
                    {/* Makkah Accommodation */}
                    <div className="flex items-start gap-2.5">
                      <Hotel className="w-4 h-4 text-[#0B5D4B] shrink-0 mt-0.5" />
                      <div>
                        <span className="font-semibold text-[#17332D] block">Makkah Stay:</span>
                        <span className="text-[#66736F] block leading-snug">{pkg.makkahHotel}</span>
                        <span className="text-[11px] text-[#0B5D4B] font-medium block mt-0.5">{pkg.makkahDistance}</span>
                      </div>
                    </div>

                    {/* Madinah Accommodation */}
                    <div className="flex items-start gap-2.5">
                      <Hotel className="w-4 h-4 text-[#0B5D4B] shrink-0 mt-0.5" />
                      <div>
                        <span className="font-semibold text-[#17332D] block">Madinah Stay:</span>
                        <span className="text-[#66736F] block leading-snug">{pkg.madinahHotel}</span>
                        <span className="text-[11px] text-[#0B5D4B] font-medium block mt-0.5">{pkg.madinahDistance}</span>
                      </div>
                    </div>

                    {/* Transport */}
                    <div className="flex items-start gap-2.5">
                      <Bus className="w-4 h-4 text-[#0B5D4B] shrink-0 mt-0.5" />
                      <div>
                        <span className="font-semibold text-[#17332D] block">Transport:</span>
                        <span className="text-[#66736F] leading-snug">{pkg.transport}</span>
                      </div>
                    </div>

                    {/* Food */}
                    <div className="flex items-start gap-2.5">
                      <Utensils className="w-4 h-4 text-[#0B5D4B] shrink-0 mt-0.5" />
                      <div>
                        <span className="font-semibold text-[#17332D] block">Cuisine:</span>
                        <span className="text-[#66736F] leading-snug">{pkg.food}</span>
                      </div>
                    </div>

                    {/* Visa */}
                    <div className="flex items-start gap-2.5">
                      <FileText className="w-4 h-4 text-[#0B5D4B] shrink-0 mt-0.5" />
                      <div>
                        <span className="font-semibold text-[#17332D] block">Visa & Insurance:</span>
                        <span className="text-[#66736F] leading-snug">{pkg.visa}</span>
                      </div>
                    </div>
                  </div>

                  {/* Inclusions Accordion */}
                  <div className="pt-2">
                    <button
                      onClick={() => toggleExpand(pkg.id)}
                      className="w-full flex items-center justify-between text-xs font-semibold text-[#0B5D4B] hover:text-[#084538] py-1 cursor-pointer"
                    >
                      <span>{isExpanded ? 'Hide Key Inclusions' : `View All Inclusions (${pkg.inclusions.length})`}</span>
                      <ChevronRight className={`w-3.5 h-3.5 transition-transform ${isExpanded ? 'rotate-90' : ''}`} />
                    </button>

                    {isExpanded && (
                      <ul className="mt-2 space-y-1.5 text-xs text-[#17332D] bg-[#F8F5EE] p-3 rounded-xl border border-[#0B5D4B]/10 animate-fade-in">
                        {pkg.inclusions.map((item, idx) => (
                          <li key={idx} className="flex items-start gap-2">
                            <Check className="w-3.5 h-3.5 text-[#C9A24D] shrink-0 mt-0.5" />
                            <span className="leading-tight">{item}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </div>

                {/* Card Bottom: Price & CTA */}
                <div className="p-6 pt-0 mt-auto border-t border-[#0B5D4B]/10 space-y-4 bg-gradient-to-b from-transparent to-[#F8F5EE]/40 rounded-b-2xl">
                  <div className="pt-4">
                    <div className="flex items-baseline justify-between">
                      <span className="text-xs font-medium text-[#66736F]">Starting From</span>
                      <div className="text-right">
                        <span className="font-serif text-2xl font-bold text-[#0B5D4B] tabular-nums">
                          {pkg.startingPrice}
                        </span>
                        <span className="text-xs text-[#66736F] font-normal block">
                          *per person
                        </span>
                      </div>
                    </div>
                    <p className="text-[10px] text-[#66736F] mt-1 leading-normal italic flex items-center gap-1">
                      <Info className="w-3 h-3 text-[#C9A24D] shrink-0" />
                      <span>{pkg.priceNote}</span>
                    </p>
                  </div>

                  {/* Enquire Button */}
                  <button
                    onClick={() => onSelectPackage(pkg)}
                    className={`w-full py-3 px-4 rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition-all duration-200 active:scale-[0.98] min-h-[44px] cursor-pointer ${
                      pkg.featured
                        ? 'bg-[#0B5D4B] hover:bg-[#084538] text-white shadow-md shadow-[#0B5D4B]/20'
                        : 'bg-[#17332D] hover:bg-[#0B5D4B] text-white'
                    }`}
                  >
                    <span>Enquire Now</span>
                    <ChevronRight className="w-4 h-4 text-[#C9A24D]" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
