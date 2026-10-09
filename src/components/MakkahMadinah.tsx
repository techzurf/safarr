import React from 'react';
import { MapPin, Sparkles, Heart } from 'lucide-react';
import { KaabaGraphic, MadinahGraphic } from './IslamicMotifs';

export const MakkahMadinah: React.FC = () => {
  return (
    <section className="py-14 sm:py-20 bg-[#F8F5EE]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto space-y-3 mb-12">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#0B5D4B]">
            <Sparkles className="w-3.5 h-3.5 text-[#C9A24D]" />
            <span>The Two Holy Sanctuaries</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-[#17332D] tracking-tight">
            Makkah Al-Mukarramah & Madinah Al-Munawwarah
          </h2>
          <p className="text-[#66736F] text-base leading-relaxed">
            Two sacred sanctuaries where millions gather in devotion, repentance, and peace.
          </p>
        </div>

        {/* 2 Feature Cards Side-by-Side */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Makkah Card */}
          <div className="bg-white rounded-3xl overflow-hidden border border-[#0B5D4B]/15 shadow-md flex flex-col justify-between group hover:shadow-xl transition-all duration-300">
            <div className="relative aspect-[16/10] bg-[#063228] overflow-hidden">
              <KaabaGraphic className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
              
              <div className="absolute top-4 left-4">
                <span className="bg-[#0B5D4B] text-white text-xs font-bold px-3 py-1.5 rounded-full flex items-center gap-1.5 shadow-md">
                  <MapPin className="w-3.5 h-3.5 text-[#C9A24D]" />
                  Makkah Al-Mukarramah
                </span>
              </div>

              <div className="absolute bottom-4 left-4 right-4 text-white">
                <h3 className="font-serif text-2xl sm:text-3xl font-bold">
                  Experience the spiritual heart of Islam.
                </h3>
              </div>
            </div>

            <div className="p-6 sm:p-8 space-y-4">
              <p className="text-sm text-[#66736F] leading-relaxed">
                Makkah is where the revelations began and where Muslims turn five times each day. Stand in awe before the Holy Kaaba, drink refreshing Zamzam water, and circumambulate under the guidance of As-Safar scholars.
              </p>

              <div className="pt-2 border-t border-[#0B5D4B]/10">
                <p className="text-xs font-bold text-[#17332D] uppercase tracking-wider mb-2">
                  Featured Ziyarat & Landmarks
                </p>
                <div className="flex flex-wrap gap-2 text-xs">
                  {['Masjid al-Haram & Kaaba', 'Mataf & Safa-Marwah', 'Jabal al-Noor (Cave of Hira)', 'Ghar Thawr', 'Mina & Muzdalifah', 'Jabal ar-Rahmah (Arafat)'].map((site, i) => (
                    <span key={i} className="px-2.5 py-1 rounded-lg bg-[#EAF3EF] text-[#0B5D4B] font-medium">
                      {site}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Madinah Card */}
          <div className="bg-white rounded-3xl overflow-hidden border border-[#0B5D4B]/15 shadow-md flex flex-col justify-between group hover:shadow-xl transition-all duration-300">
            <div className="relative aspect-[16/10] bg-[#063228] overflow-hidden">
              <MadinahGraphic className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
              
              <div className="absolute top-4 left-4">
                <span className="bg-[#C9A24D] text-[#073E32] text-xs font-bold px-3 py-1.5 rounded-full flex items-center gap-1.5 shadow-md">
                  <Heart className="w-3.5 h-3.5 fill-[#073E32]" />
                  Madinah Al-Munawwarah
                </span>
              </div>

              <div className="absolute bottom-4 left-4 right-4 text-white">
                <h3 className="font-serif text-2xl sm:text-3xl font-bold">
                  Visit the beloved city of Prophet Muhammad ﷺ.
                </h3>
              </div>
            </div>

            <div className="p-6 sm:p-8 space-y-4">
              <p className="text-sm text-[#66736F] leading-relaxed">
                Experience unparalleled tranquility in the radiant city of the Prophet ﷺ. Offer greetings at the Rawdah ash-Sharifah, pray under the iconic open shading umbrellas of Masjid an-Nabawi, and walk the serene paths of early Islam.
              </p>

              <div className="pt-2 border-t border-[#0B5D4B]/10">
                <p className="text-xs font-bold text-[#17332D] uppercase tracking-wider mb-2">
                  Featured Ziyarat & Landmarks
                </p>
                <div className="flex flex-wrap gap-2 text-xs">
                  {['Masjid an-Nabawi', 'Rawdah ash-Sharifah', 'Mount Uhud & Martyrs Cemetery', 'Masjid Quba (First Mosque)', 'Masjid al-Qiblatain', 'Madinah Dates Market'].map((site, i) => (
                    <span key={i} className="px-2.5 py-1 rounded-lg bg-[#EAF3EF] text-[#0B5D4B] font-medium">
                      {site}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
