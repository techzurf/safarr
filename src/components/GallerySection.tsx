import React, { useState } from 'react';
import { Camera, Eye, X, MapPin } from 'lucide-react';
import { GALLERY_ITEMS } from '../data/content';
import { KaabaGraphic, MadinahGraphic } from './IslamicMotifs';

export const GallerySection: React.FC = () => {
  const [selectedItem, setSelectedItem] = useState<typeof GALLERY_ITEMS[0] | null>(null);
  const [filter, setFilter] = useState<'all' | 'makkah' | 'madinah' | 'journey'>('all');

  const filteredItems = filter === 'all'
    ? GALLERY_ITEMS
    : GALLERY_ITEMS.filter((item) => item.category === filter || (filter === 'journey' && item.category === 'hotels'));

  return (
    <section className="py-14 sm:py-20 bg-[#FFFFFF]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto space-y-3 mb-10">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#0B5D4B]">
            <Camera className="w-3.5 h-3.5 text-[#C9A24D]" />
            <span>Sacred Landmarks</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-[#17332D] tracking-tight">
            Pilgrimage Moments
          </h2>
          <p className="text-[#66736F] text-base leading-relaxed">
            Witness the majesty of Makkah al-Mukarramah, Madinah al-Munawwarah, and the unforgettable spiritual landmarks of the journey.
          </p>

          {/* Interactive filter buttons */}
          <div className="flex flex-wrap items-center justify-center gap-2 pt-2">
            {[
              { id: 'all', label: 'All Sights' },
              { id: 'makkah', label: 'Makkah' },
              { id: 'madinah', label: 'Madinah' },
              { id: 'journey', label: 'Ziyarat & Stays' },
            ].map((t) => (
              <button
                key={t.id}
                onClick={() => setFilter(t.id as any)}
                className={`px-3.5 py-1.5 text-xs font-semibold rounded-full transition-colors cursor-pointer ${
                  filter === t.id
                    ? 'bg-[#0B5D4B] text-white'
                    : 'bg-[#F8F5EE] text-[#17332D] hover:bg-[#EAF3EF]'
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item, idx) => {
            const isKaaba = item.category === 'makkah' || idx % 2 === 0;

            return (
              <div
                key={item.id}
                onClick={() => setSelectedItem(item)}
                className="group relative rounded-2xl overflow-hidden bg-[#063228] border border-[#0B5D4B]/15 shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer aspect-[4/3]"
              >
                {/* SVG Graphics Frame */}
                {isKaaba ? (
                  <KaabaGraphic className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                ) : (
                  <MadinahGraphic className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                )}

                {/* Scrim Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />

                {/* Quick inspect eye button */}
                <div className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/20 backdrop-blur-md text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <Eye className="w-4 h-4" />
                </div>

                {/* Content Overlay */}
                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <span className="text-[10px] font-bold text-[#C9A24D] uppercase tracking-wider block">
                    {item.accentText}
                  </span>
                  <h3 className="font-serif text-lg font-bold leading-tight mt-0.5">
                    {item.title}
                  </h3>
                  <p className="text-xs text-[#EAF3EF]/80 flex items-center gap-1 mt-1">
                    <MapPin className="w-3 h-3 text-[#C9A24D]" />
                    <span>{item.caption}</span>
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Lightbox Modal */}
        {selectedItem && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
            <div className="bg-[#FFFFFF] rounded-2xl max-w-lg w-full overflow-hidden shadow-2xl border border-white/20 relative">
              <button
                onClick={() => setSelectedItem(null)}
                className="absolute top-3 right-3 z-10 w-9 h-9 rounded-full bg-black/50 hover:bg-black/80 text-white flex items-center justify-center transition-colors cursor-pointer"
                aria-label="Close image lightbox"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="relative aspect-[4/3] bg-[#063228]">
                {selectedItem.category === 'makkah' ? (
                  <KaabaGraphic className="w-full h-full object-cover" />
                ) : (
                  <MadinahGraphic className="w-full h-full object-cover" />
                )}
              </div>

              <div className="p-6 space-y-2 bg-[#F8F5EE]">
                <span className="text-xs font-bold text-[#C9A24D] uppercase tracking-wider block">
                  {selectedItem.accentText}
                </span>
                <h3 className="font-serif text-2xl font-bold text-[#17332D]">
                  {selectedItem.title}
                </h3>
                <p className="text-sm text-[#66736F]">
                  {selectedItem.caption} — All our packages feature organized scholar-accompanied visits and detailed historical talks at these sacred sites.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
