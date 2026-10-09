import React, { useState } from 'react';
import { CheckCircle2, ChevronRight, Sparkles } from 'lucide-react';
import { JOURNEY_STEPS } from '../data/content';

export const UmrahJourney: React.FC = () => {
  const [activeStepIndex, setActiveStepIndex] = useState(0);

  return (
    <section id="umrah" className="py-14 sm:py-20 bg-[#FFFFFF]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#EAF3EF] text-[#0B5D4B] text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5 text-[#C9A24D]" />
            <span>Step-by-Step Spiritual Roadmap</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-[#17332D] tracking-tight">
            The Umrah Journey with As-Safar
          </h2>

          <p className="text-[#66736F] text-base leading-relaxed">
            From the initial conversation at our Trichy office to the moment you step foot inside the Holy Kaaba and return with blessed memories.
          </p>
        </div>

        {/* Desktop Interactive Horizontal Stepper / Mobile Vertical Timeline */}
        <div className="hidden lg:block mb-8">
          <div className="grid grid-cols-7 gap-2">
            {JOURNEY_STEPS.map((step, idx) => {
              const isSelected = activeStepIndex === idx;
              return (
                <button
                  key={step.step}
                  onClick={() => setActiveStepIndex(idx)}
                  className={`p-3 rounded-xl border text-left transition-all duration-200 cursor-pointer ${
                    isSelected
                      ? 'bg-[#0B5D4B] text-white border-[#0B5D4B] shadow-md scale-[1.02]'
                      : 'bg-[#F8F5EE] text-[#17332D] border-[#0B5D4B]/10 hover:border-[#0B5D4B]/30'
                  }`}
                >
                  <span
                    className={`text-xs font-mono font-bold block ${
                      isSelected ? 'text-[#C9A24D]' : 'text-[#0B5D4B]'
                    }`}
                  >
                    {step.step}
                  </span>
                  <span className="text-xs font-bold truncate block mt-0.5">
                    {step.title}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Active Step Feature Box */}
          <div className="mt-6 bg-[#F8F5EE] rounded-2xl p-8 border border-[#0B5D4B]/15 transition-all">
            <div className="max-w-3xl space-y-3">
              <div className="flex items-center gap-3">
                <span className="font-mono text-2xl font-bold text-[#C9A24D]">
                  Step {JOURNEY_STEPS[activeStepIndex].step}
                </span>
                <span className="h-4 w-[1px] bg-[#0B5D4B]/20" />
                <h3 className="font-serif text-2xl font-bold text-[#17332D]">
                  {JOURNEY_STEPS[activeStepIndex].title} — {JOURNEY_STEPS[activeStepIndex].subtitle}
                </h3>
              </div>
              <p className="text-base text-[#66736F] leading-relaxed">
                {JOURNEY_STEPS[activeStepIndex].description}
              </p>

              <div className="pt-2 flex flex-wrap gap-2">
                {JOURNEY_STEPS[activeStepIndex].highlights.map((h, i) => (
                  <span
                    key={i}
                    className="inline-flex items-center gap-1.5 text-xs font-medium text-[#0B5D4B] bg-white px-3 py-1.5 rounded-lg border border-[#0B5D4B]/10"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#C9A24D]" />
                    {h}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Mobile / Tablet Vertical Timeline (Clean & Touch-friendly) */}
        <div className="lg:hidden space-y-4">
          {JOURNEY_STEPS.map((item, index) => {
            const isCurrent = activeStepIndex === index;
            return (
              <div
                key={item.step}
                onClick={() => setActiveStepIndex(index)}
                className={`rounded-2xl p-5 border transition-all duration-200 cursor-pointer ${
                  isCurrent
                    ? 'bg-[#EAF3EF] border-[#0B5D4B] shadow-sm'
                    : 'bg-[#F8F5EE] border-[#0B5D4B]/10 hover:border-[#0B5D4B]/30'
                }`}
              >
                <div className="flex items-start gap-4">
                  {/* Step Number Circle */}
                  <div
                    className={`w-10 h-10 rounded-xl flex items-center justify-center font-mono font-bold text-sm shrink-0 shadow-sm ${
                      isCurrent
                        ? 'bg-[#0B5D4B] text-[#C9A24D]'
                        : 'bg-white text-[#0B5D4B] border border-[#0B5D4B]/20'
                    }`}
                  >
                    {item.step}
                  </div>

                  <div className="flex-1 space-y-1">
                    <div className="flex items-center justify-between">
                      <h3 className="font-serif text-lg font-bold text-[#17332D]">
                        {item.title}
                      </h3>
                      <ChevronRight
                        className={`w-4 h-4 text-[#0B5D4B] transition-transform ${
                          isCurrent ? 'rotate-90' : ''
                        }`}
                      />
                    </div>
                    <p className="text-xs font-semibold text-[#0B5D4B]">
                      {item.subtitle}
                    </p>
                    <p className="text-xs text-[#66736F] leading-relaxed pt-1">
                      {item.description}
                    </p>

                    {/* Step Highlights */}
                    <div className="flex flex-wrap gap-1.5 pt-2">
                      {item.highlights.map((h, i) => (
                        <span
                          key={i}
                          className="text-[11px] bg-white text-[#17332D] px-2 py-0.5 rounded border border-[#0B5D4B]/10 flex items-center gap-1"
                        >
                          <span className="w-1.5 h-1.5 rounded-full bg-[#C9A24D]" />
                          {h}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
