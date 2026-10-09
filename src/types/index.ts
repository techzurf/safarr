export interface PackageItem {
  id: string;
  name: string;
  badge?: string;
  duration: string;
  tagline: string;
  makkahHotel: string;
  makkahDistance: string;
  madinahHotel: string;
  madinahDistance: string;
  transport: string;
  food: string;
  visa: string;
  startingPrice: string;
  priceNote: string;
  inclusions: string[];
  exclusions?: string[];
  category: 'economy' | 'standard' | 'premium' | 'vip';
  featured?: boolean;
  idealFor: string;
}

export interface JourneyStep {
  step: string;
  title: string;
  subtitle: string;
  description: string;
  highlights: string[];
}

export interface ServiceItem {
  id: string;
  title: string;
  description: string;
  badge: string;
  iconName: string;
}

export interface TestimonialItem {
  id: string;
  name: string;
  location: string;
  packageTaken: string;
  rating: number;
  date: string;
  quote: string;
}

export interface FaqItem {
  question: string;
  answer: string;
  category: string;
}

export interface GalleryItem {
  id: string;
  title: string;
  category: 'makkah' | 'madinah' | 'journey' | 'hotels';
  description: string;
  caption: string;
}

export interface EnquiryFormData {
  fullName: string;
  mobile: string;
  email?: string;
  travellersCount: string;
  preferredMonth: string;
  packagePreference: string;
  city: string;
  message: string;
}
