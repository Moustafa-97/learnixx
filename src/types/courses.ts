// types/course.ts

// API response types
export interface Category {
  id: number;
  name: string;
}

export interface Country {
  id: number;
  name: string;
  iso: string;
}

export interface City {
  id: number;
  name: string;
}

// Updated Course interface based on API response
export interface Course {
  id: number; // Changed from string to number
  title: string;
  description: string;
  startDate: string;
  price: number;
  categories: Category[];
  country: Country;
  city: City;
  
  // Optional fields that might be added later or computed
  image?: string;
  tags?: string[];
  instructor?: string;
  duration?: string;
  level?: string;
  rating?: number;
  students?: number;
}

// Legacy Course interface (keep for backward compatibility if needed)
export interface LegacyCourse {
  id: string
  image: string
  title: string
  titleAr: string
  description: string
  descriptionAr: string
  category: string
  categoryAr: string
  startDate: string
  startDateAr: string
  tags: string[]
  flag: string
  location: string
  locationAr: string
  price: number
  instructor: string
  instructorAr: string
  duration: string
  durationAr: string
  level: string
  levelAr: string
  rating: number
  students: number
}

// API Response interfaces
export interface Meta {
  page: number;
  perPage: number;
  total: number;
  totalPages: number;
  hasNext: boolean;
  hasPrev: boolean;
}

export interface CoursesApiResponse {
  data: Course[];
  meta: Meta;
  lang: string;
}