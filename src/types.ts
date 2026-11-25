export type SpecialtyId = 'quiropraxia' | 'acupuntura' | 'ventosaterapia';

export type BookingSpecialtyOption =
  | 'Quiropraxia Clínica'
  | 'Acupuntura Terapêutica'
  | 'Ventosaterapia Miofascial'
  | 'Avaliação Integrada';

export interface SpecialtyItem {
  id: SpecialtyId;
  index: string;
  title: string;
  subtitle: string;
  category: string;
  summary: string;
  clinicalMechanism: string;
  indications: string[];
  sessionDuration: string;
  image: string;
  imageAlt: string;
  bookingValue: BookingSpecialtyOption;
  featured?: boolean;
}

export interface ClinicMetric {
  id: string;
  value: number;
  prefix?: string;
  suffix?: string;
  label: string;
  detail: string;
}

export interface ClinicalPillar {
  index: string;
  title: string;
  description: string;
}

export interface ReliefTestimonial {
  id: string;
  patientName: string;
  patientContext: string;
  condition: string;
  intervention: string;
  quote: string;
  outcomeMetric: string;
}

export interface ContactInfo {
  businessName: string;
  address: string;
  phone: string;
  whatsappDigits: string;
  hours: string;
}
