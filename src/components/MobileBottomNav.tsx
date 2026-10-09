import React from 'react';
import { Home, Compass, MapPin, Sparkles, PhoneCall } from 'lucide-react';

interface MobileBottomNavProps {
  activeTab: string;
  onSelectTab: (tabId: string) => void;
}

export const MobileBottomNav: React.FC<MobileBottomNavProps> = ({ activeTab, onSelectTab }) => {
  const tabs = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'packages', label: 'Packages', icon: Compass },
    { id: 'umrah', label: 'Umrah', icon: Sparkles },
    { id: 'about', label: 'About', icon: MapPin },
    { id: 'contact', label: 'Contact', icon: PhoneCall },
  ];

  return (
    <nav
      className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#FFFFFF]/95 backdrop-blur-md border-t border-[#0B5D4B]/15 shadow-[0_-4px_20px_rgba(11,93,75,0.08)] pb-[calc(env(safe-area-inset-bottom,0px)+8px)] pt-1.5 select-none"
      aria-label="Mobile Navigation"
      role="navigation"
    >
      <div className="grid grid-cols-5 items-center w-full max-w-lg mx-auto px-1">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;

          return (
            <button
              key={tab.id}
              onClick={() => onSelectTab(tab.id)}
              className={`flex flex-col items-center justify-center py-1 transition-all duration-150 relative min-h-[48px] touch-manipulation focus:outline-none active:scale-95 cursor-pointer ${
                isActive ? 'text-[#0B5D4B]' : 'text-[#66736F] hover:text-[#17332D]'
              }`}
            >
              {/* Active gold dot pill indicator */}
              {isActive && (
                <span className="absolute -top-1 w-6 h-0.5 bg-[#C9A24D] rounded-full animate-fade-in" />
              )}
              <div
                className={`w-10 h-7 flex items-center justify-center rounded-full transition-all ${
                  isActive ? 'bg-[#EAF3EF] text-[#0B5D4B]' : ''
                }`}
              >
                <Icon className={`w-5 h-5 ${isActive ? 'text-[#0B5D4B] stroke-[2.2]' : 'stroke-[1.8]'}`} />
              </div>
              <span
                className={`text-[11px] font-medium tracking-tight mt-0.5 leading-tight ${
                  isActive ? 'font-bold text-[#0B5D4B]' : 'text-[#66736F]'
                }`}
              >
                {tab.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};
