import React, { useState, useEffect } from 'react';
import { X, Send, CheckCircle2, Phone, MessageCircle, Calendar, Users, Hotel } from 'lucide-react';
import { UMRAH_PACKAGES } from '../data/packages';
import { BRAND_INFO } from '../data/content';

interface EnquiryModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultPackageId?: string;
}

export const EnquiryModal: React.FC<EnquiryModalProps> = ({
  isOpen,
  onClose,
  defaultPackageId = 'premium',
}) => {
  const [formData, setFormData] = useState({
    fullName: '',
    mobile: '',
    travellersCount: '2',
    preferredMonth: 'Immediate / Next Group',
    packagePreference: defaultPackageId,
    message: '',
  });

  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (defaultPackageId) {
      setFormData((prev) => ({ ...prev, packagePreference: defaultPackageId }));
    }
  }, [defaultPackageId]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.fullName.trim() || !formData.mobile.trim()) return;

    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      setSubmitted(true);
    }, 500);
  };

  const selectedPkg = UMRAH_PACKAGES.find((p) => p.id === formData.packagePreference);

  const whatsappInquiryUrl = `https://wa.me/919566369654?text=${encodeURIComponent(
    `Assalamu Alaikum As-Safar, My name is ${formData.fullName || 'Pilgrim'}. I would like to enquire about ${
      selectedPkg ? selectedPkg.name : formData.packagePreference
    } for ${formData.travellersCount} travellers in ${formData.preferredMonth}. ${formData.message}`
  )}`;

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/60 backdrop-blur-sm p-0 sm:p-4 animate-fade-in">
      {/* Container: Bottom Sheet on Mobile, Centered Modal on Tablet/Desktop */}
      <div className="bg-[#FFFFFF] w-full sm:max-w-xl rounded-t-3xl sm:rounded-3xl shadow-2xl border-t sm:border border-[#0B5D4B]/20 max-h-[92vh] flex flex-col overflow-hidden animate-slide-up">
        {/* Mobile Drag Handle Bar */}
        <div className="sm:hidden w-12 h-1.5 bg-[#66736F]/30 rounded-full mx-auto my-2.5 shrink-0" />

        {/* Modal Header */}
        <div className="px-6 py-4 border-b border-[#0B5D4B]/10 flex items-center justify-between shrink-0 bg-[#F8F5EE]">
          <div>
            <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#17332D]">
              Umrah Pilgrimage Enquiry
            </h3>
            <p className="text-xs text-[#0B5D4B] font-semibold mt-0.5">
              As-Safar · Cantonment, Trichy
            </p>
          </div>

          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-white border border-[#0B5D4B]/15 text-[#17332D] hover:bg-[#EAF3EF] flex items-center justify-center transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-6 overflow-y-auto space-y-4">
          {submitted ? (
            <div className="text-center py-8 space-y-4">
              <div className="w-16 h-16 rounded-full bg-[#EAF3EF] text-[#0B5D4B] flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-10 h-10 text-[#0B5D4B]" />
              </div>
              <h4 className="font-serif text-2xl font-bold text-[#17332D]">
                Alhamdulillah! Enquiry Sent
              </h4>
              <p className="text-sm text-[#66736F] leading-relaxed">
                Thank you, <span className="font-bold text-[#17332D]">{formData.fullName}</span>. Our pilgrimage coordinator will call you at{' '}
                <span className="font-bold text-[#17332D]">{formData.mobile}</span> shortly with complete dates, flight slots, and hotel confirmations.
              </p>

              <div className="pt-2 space-y-2">
                <a
                  href={whatsappInquiryUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full bg-[#25D366] text-white font-bold text-sm py-3 px-4 rounded-xl flex items-center justify-center gap-2 shadow-sm"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Instant WhatsApp Follow-up</span>
                </a>

                <button
                  onClick={onClose}
                  className="w-full py-2.5 text-xs text-[#0B5D4B] font-bold hover:underline"
                >
                  Close Window
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Package Snapshot Card if chosen */}
              {selectedPkg && (
                <div className="p-3.5 rounded-2xl bg-[#EAF3EF] border border-[#0B5D4B]/20 flex items-center justify-between">
                  <div className="space-y-0.5">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#0B5D4B] block">
                      Selected Package:
                    </span>
                    <span className="font-serif text-base font-bold text-[#17332D] block">
                      {selectedPkg.name}
                    </span>
                    <span className="text-xs text-[#66736F] block">
                      {selectedPkg.duration} · {selectedPkg.startingPrice}
                    </span>
                  </div>
                  <Hotel className="w-6 h-6 text-[#0B5D4B]" />
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label className="text-xs font-bold text-[#17332D] uppercase tracking-wide block mb-1">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    placeholder="e.g. Mohamed Farook"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#0B5D4B]/20 text-sm text-[#17332D] focus:ring-2 focus:ring-[#0B5D4B]/20 outline-none"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-[#17332D] uppercase tracking-wide block mb-1">
                    Mobile / WhatsApp *
                  </label>
                  <input
                    type="tel"
                    required
                    value={formData.mobile}
                    onChange={(e) => setFormData({ ...formData, mobile: e.target.value })}
                    placeholder="e.g. 95663 69654"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#0B5D4B]/20 text-sm text-[#17332D] focus:ring-2 focus:ring-[#0B5D4B]/20 outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label className="text-xs font-bold text-[#17332D] uppercase tracking-wide block mb-1">
                    Travellers Count
                  </label>
                  <select
                    value={formData.travellersCount}
                    onChange={(e) => setFormData({ ...formData, travellersCount: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#0B5D4B]/20 text-sm text-[#17332D] focus:ring-2 focus:ring-[#0B5D4B]/20 outline-none"
                  >
                    <option value="1">1 Person (Single)</option>
                    <option value="2">2 Persons (Couple)</option>
                    <option value="3">3 Persons</option>
                    <option value="4">4 Persons (Family)</option>
                    <option value="5+">5+ Persons</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs font-bold text-[#17332D] uppercase tracking-wide block mb-1">
                    Target Travel Month
                  </label>
                  <select
                    value={formData.preferredMonth}
                    onChange={(e) => setFormData({ ...formData, preferredMonth: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#0B5D4B]/20 text-sm text-[#17332D] focus:ring-2 focus:ring-[#0B5D4B]/20 outline-none"
                  >
                    <option value="Immediate / Next Group">Immediate / Next Group</option>
                    <option value="Ramadan 2026">Ramadan 2026</option>
                    <option value="Shawwal / Post Eid">Shawwal / Post Eid</option>
                    <option value="Summer 2026">Summer Vacation</option>
                    <option value="Later this year">Later this year</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-[#17332D] uppercase tracking-wide block mb-1">
                  Package Tier
                </label>
                <select
                  value={formData.packagePreference}
                  onChange={(e) => setFormData({ ...formData, packagePreference: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#0B5D4B]/20 text-sm text-[#17332D] focus:ring-2 focus:ring-[#0B5D4B]/20 outline-none"
                >
                  {UMRAH_PACKAGES.map((pkg) => (
                    <option key={pkg.id} value={pkg.id}>
                      {pkg.name} — {pkg.duration} ({pkg.startingPrice})
                    </option>
                  ))}
                  <option value="custom">Customized VIP Family Plan</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-bold text-[#17332D] uppercase tracking-wide block mb-1">
                  Special Notes (Optional)
                </label>
                <textarea
                  rows={2}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Need wheelchair, ground-floor room, child cot, etc."
                  className="w-full px-3.5 py-2 rounded-xl border border-[#0B5D4B]/20 text-sm text-[#17332D] focus:ring-2 focus:ring-[#0B5D4B]/20 outline-none"
                />
              </div>

              {/* Action Buttons */}
              <div className="pt-2 flex items-center gap-3">
                <button
                  type="submit"
                  disabled={submitting}
                  className="flex-1 bg-[#0B5D4B] hover:bg-[#084538] text-white font-bold text-sm py-3 px-4 rounded-xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-95 min-h-[44px]"
                >
                  <Send className="w-4 h-4 text-[#C9A24D]" />
                  <span>{submitting ? 'Submitting...' : 'Send Enquiry'}</span>
                </button>

                <a
                  href={`tel:${BRAND_INFO.phoneTel}`}
                  className="p-3 rounded-xl border border-[#0B5D4B]/20 text-[#0B5D4B] hover:bg-[#EAF3EF] transition-colors"
                  title="Direct Call"
                >
                  <Phone className="w-5 h-5 text-[#C9A24D]" />
                </a>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
