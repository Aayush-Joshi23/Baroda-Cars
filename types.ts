
export type CarCategory = 'Hatchback' | 'Sedan' | 'Compact SUV' | 'SUV' | 'Luxury' | 'MUV' | 'Electric';
export type FuelType = 'Petrol' | 'Diesel' | 'CNG' | 'Electric';
export type TransmissionType = 'Manual' | 'Automatic';

export interface Car {
  id: string;
  make: string;
  model: string;
  variant: string;
  year: number;
  price: number;
  category: CarCategory;
  fuel: FuelType;
  transmission: TransmissionType;
  km: number;
  ownership: string;
  registration: string;
  insurance: string;
  color: string;
  engine: string;
  seating: number;
  images: string[];
  badge?: 'Featured' | 'New Arrival' | 'Price Drop';
  features: string[];
  condition: string;
}

export interface Testimonial {
  id: number;
  name: string;
  text: string;
  rating: number;
}
