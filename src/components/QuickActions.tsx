import React from 'react';
import { Compass, Moon, Phone, MessageCircle } from 'lucide-react';
import { BRAND_INFO } from '../data/content';

interface QuickActionsProps {
  onScrollToPackages: () => void;
  onOpenHajj: () => void;
}

export const QuickActions: React.FC<QuickActionsProps> = ({ onScrollToPackages, onOpenHajj }) => {
  return (
    <section className="relative z-10 -mt-6 sm:-mt-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="bg-[#FFFFFF] rounded-2xl shadow-md border border-[#0B5D4B]/10 p-3 sm:p-4">
        {/* Mobile: Horizontally scrollable row / Desktop: 4 equal cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-4">
          {/* Action 1: Umrah Packages */}
          <button
            onClick={onScrollToPackages}
            className="flex items-center gap-3 p-3 rounded-xl bg-[#F8F5EE] hover:bg-[#EAF3EF] border border-[#0B5D4B]/10 transition-all text-left active:scale-[0.98] group cursor-pointer"
          >
            <div className="w-10 h-10 rounded-lg bg-[#0B5D4B] text-[#C9A24D] flex items-center justify-center shrink-0 shadow-sm group-hover:scale-105 transition-transform">
              <Compass className="w-5 h-5" />
            </div>
            <div className="min-w-0">
              <p className="text-xs text-[#66736F] font-medium leading-none mb-1">Explore</p>
              <p className="text-sm font-bold text-[#17332D] leading-tight truncate">Umrah Packages</p>
            </div>
          </button>

          {/* Action 2: Hajj 2026 */}
          <button
            onClick={onOpenHajj}
            className="flex items-center gap-3 p-3 rounded-xl bg-[#F8F5EE] hover:bg-[#EAF3EF] border border-[#0B5D4B]/10 transition-all text-left active:scale-[0.98] group cursor-pointer"
          >
            <div className="w-10 h-10 rounded-lg bg-[#C9A24D] text-[#073E32] flex items-center justify-center shrink-0 shadow-sm group-hover:scale-105 transition-transform">
              <Moon className="w-5 h-5" />
            </div>
            <div className="min-w-0">
              <p className="text-xs text-[#66736F] font-medium leading-none mb-1">Pre-Register</p>
              <p className="text-sm font-bold text-[#17332D] leading-tight truncate">Hajj 2026</p>
            </div>
          </button>

          {/* Action 3: Call Us */}
          <a
            href={`tel:${BRAND_INFO.phoneTel}`}
            className="flex items-center gap-3 p-3 rounded-xl bg-[#F8F5EE] hover:bg-[#EAF3EF] border border-[#0B5D4B]/10 transition-all text-left active:scale-[0.98] group"
          >
            <div className="w-10 h-10 rounded-lg bg-[#0B5D4B] text-white flex items-center justify-center shrink-0 shadow-sm group-hover:scale-105 transition-transform">
              <Phone className="w-5 h-5" />
            </div>
            <div className="min-w-0">
              <p className="text-xs text-[#66736F] font-medium leading-none mb-1">Direct Dial</p>
              <p className="text-sm font-bold text-[#17332D] leading-tight truncate">Call Us</p>
            </div>
          </a>

          {/* Action 4: WhatsApp */}
          <a
            href={`https://wa.me/919566369654?text=${encodeURIComponent(BRAND_INFO.whatsappMessage)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 p-3 rounded-xl bg-[#F8F5EE] hover:bg-[#EAF3EF] border border-[#0B5D4B]/10 transition-all text-left active:scale-[0.98] group"
          >
            <div className="w-10 h-10 rounded-lg bg-[#25D366] text-white flex items-center justify-center shrink-0 shadow-sm group-hover:scale-105 transition-transform">
              <MessageCircle className="w-5 h-5" />
            </div>
            <div className="min-w-0">
              <p className="text-xs text-[#66736F] font-medium leading-none mb-1">Instant Chat</p>
              <p className="text-sm font-bold text-[#17332D] leading-tight truncate">WhatsApp</p>
            </div>
          </a>
        </div>
      </div>
    </section>
  );
};
