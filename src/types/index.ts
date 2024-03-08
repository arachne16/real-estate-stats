export interface SearchParams {
  quartersRange: string // e.g., "2020K1-2021K4"
  houseType: '00' | '02' | '03' // Corresponding to the API values for house types
}

export interface SearchHistoryEntry {
  id: string
  searchParams: SearchParams
  timestamp: Date
}

export interface DataPoint {
  quarter: string // e.g., "2020K1"
  pricePerSquareMeter: number // Represents the average price per square meter for the quarter
}

export interface FetchDataResponse {
  loading: boolean
  data: DataPoint[] | null
  error: string | null
}

export interface JsonStat {
  class: string
  dimension: {
    [key: string]: {
      label: string
      category: {
        index: { [key: string]: number }
        label: { [key: string]: string }
      }
    }
  }
  value: number[]
}
