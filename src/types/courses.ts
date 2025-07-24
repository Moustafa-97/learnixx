// types/course.ts

export interface Course {
  id: string
  image: string
  title: string
  titleAr: string
  description: string
  descriptionAr: string
  category: string
  categoryAr: string
  startDate:string
  startDateAr:string
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
