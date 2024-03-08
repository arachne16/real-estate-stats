import { JsonStat, DataPoint } from '../types'

// Utility function to create quarter values
export const createQuarterValues = (quartersRange: string) => {
  const quarters = quartersRange.split('-')
  const startYear = quarters[0].slice(0, 4)
  const endYear = quarters[1].slice(0, 4)
  const values = []

  // Divide the range of values into individuals for the query
  for (let year = parseInt(startYear); year <= parseInt(endYear); year++) {
    for (let quarter = 1; quarter <= 4; quarter++) {
      if (
        year.toString() + 'K' + quarter >= quarters[0] &&
        year.toString() + 'K' + quarter <= quarters[1]
      ) {
        values.push(year.toString() + 'K' + quarter)
      }
    }
  }

  return values
}

// Utility function to parse the response data for the Chart
export const parseJsonStat = (jsonStat: JsonStat): DataPoint[] => {
  const { dimension, value } = jsonStat
  const categories = dimension.Tid.category.label
  const dataPoints: DataPoint[] = []

  Object.keys(categories).forEach((key, index) => {
    const priceIndex = index

    dataPoints.push({
      quarter: key,
      pricePerSquareMeter: value[priceIndex],
    })
  })

  return dataPoints
}
