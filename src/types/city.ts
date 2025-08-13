export interface City {
  id: number
  name: string
  countryId: number
  cityPicture: string
}

export interface PaginationMeta {
  page: number
  perPage: number
  total: number
  totalPages: number
  hasNext: boolean
  hasPrev: boolean
}

export interface CitiesApiResponse {
  data: City[]
  meta: PaginationMeta
  lang: string
}
