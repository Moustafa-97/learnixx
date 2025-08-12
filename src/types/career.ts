// types/courseDetail.ts with more specific types

export interface Category {
  id: number;
  name: string;
}

export interface Trainer {
  id: number;
  name: string;
  title: string;
  linkedIn: `https://linkedin.com/in/${string}`; // More specific LinkedIn URL pattern
  trainerPicture: string; // Could be more specific: `https://${string}` for URLs
}

export interface Curriculum {
  id: number;
  name: string;
  description: string;
}

export interface Outcome {
  id: number;
  name: string;
  description: string;
}

export interface Country {
  id: number;
  name: string;
  iso: string; // Could be more specific: ISO country codes like 'EG' | 'US' | etc.
}

export interface City {
  id: number;
  name: string;
  country: Country;
}

export interface CourseDetail {
  id: number;
  title: string;
  description: string;
  startDate: `${number}-${number}-${number}`; // More specific date format
  price: number;
  categories: Category[];
  trainers: Trainer[];
  curriculums: Curriculum[];
  outcomes: Outcome[];
  city: City;
}