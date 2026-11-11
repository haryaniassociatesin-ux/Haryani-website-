/**
 * Haryani & Associates - Business Contact Information
 * Configurable source of truth for all contact channels, locations, and persons.
 */

export interface ContactPerson {
  readonly id: 'person1' | 'person2';
  readonly label: string;
  readonly phone: string;
  readonly displayPhone: string;
  readonly email: string;
  readonly telLink: string;
  readonly whatsappLink: string;
  readonly mailtoLink: string;
}

export const BUSINESS_INFO = {
  name: 'Haryani & Associates',
  tagline: 'Your Trusted Financial Partner',
  category: 'Accounting, Taxation & Compliance',
  location: 'Mira Road, Maharashtra, India',
  addressDescription: 'Mira Road, Maharashtra, India (Detailed office appointment upon consultation)',
  workingHours: 'Monday – Saturday: 10:00 AM – 7:30 PM (IST)',
  contactPerson1: {
    id: 'person1',
    label: 'Contact Person 1',
    phone: '+919137275470',
    displayPhone: '+91 9137275470',
    email: 'haryani.associates.in@gmail.com',
    telLink: 'tel:+919137275470',
    whatsappLink: 'https://wa.me/919137275470',
    mailtoLink: 'mailto:haryani.associates.in@gmail.com',
  } as ContactPerson,
  contactPerson2: {
    id: 'person2',
    label: 'Contact Person 2',
    phone: '+919082314687',
    displayPhone: '+91 9082314687',
    email: 'hasanharyani@gmail.com',
    telLink: 'tel:+919082314687',
    whatsappLink: 'https://wa.me/919082314687',
    mailtoLink: 'mailto:hasanharyani@gmail.com',
  } as ContactPerson,
};
