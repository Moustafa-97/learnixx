// interface WhyAttend {
//   id: number
//   title: {
//     en: string
//     ar: string
//   }
//   description: {
//     en: string
//     ar: string
//   }
// }

// interface Trainer {
//   id: number
//   name: {
//     en: string
//     ar: string
//   }
//   title: {
//     en: string
//     ar: string
//   }
//   image?: string
//   description?: {
//     en: string
//     ar: string
//   }
//   socialLinks?: {
//     linkedin?: string
//     twitter?: string
//     github?: string
//   }
// }

// interface CourseContent {
//   id: number
//   unit: number
//   title: {
//     en: string
//     ar: string
//   }
//   description: {
//     en: string
//     ar: string
//   }
// }

// export interface CareerItem {
//   id: number
//   title: {
//     en: string
//     ar: string
//   }
//   description: {
//     en: string
//     ar: string
//   }
//   icon?: React.ReactNode | string
//   tags?: {
//     en: string[]
//     ar: string[]
//   }
//   brouchureLink?: string
//   whyAttend: WhyAttend[]
//   trainers: Trainer[]
//   courseContent: CourseContent[]
// }

// export interface Career {
//   id: number
//   label: {
//     en: string
//     ar: string
//   }
//   icon: React.ReactNode | string
//   content: CareerItem[]
// }
/////////////////////////////
interface Category {
  id: number
  name: string
}

interface Country {
  id: number
  name: string
  iso: string
}

interface City {
  id: number
  name: string
}

export interface CareerItem {
  id: number
  title: string
  description: string
  startDate: string // ISO date string format (YYYY-MM-DD)
  price: number
  categories: Category[]
  country: Country
  city: City
}

interface Meta {
  page: number
  perPage: number
  total: number
  totalPages: number
  hasNext: boolean
  hasPrev: boolean
}

export interface Career {
  data: CareerItem[]
  meta: Meta
  lang: string
}
