import { useState, useEffect } from 'react'
import axios from 'axios'

import { SearchParams, DataPoint, FetchDataResponse } from '../types'

import {
  createQuarterValues,
  parseJsonStat,
} from '../utils/createQuarterValues'

const FETCH_URL = 'https://data.ssb.no/api/v0/no/table/07241'

const useFetchData = (searchParams: SearchParams | null): FetchDataResponse => {
  const [loading, setLoading] = useState<boolean>(false)
  const [data, setData] = useState<DataPoint[] | null>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!searchParams) return

    const fetchData = async () => {
      setLoading(true)
      setError(null)

      const values = createQuarterValues(searchParams.quartersRange)

      try {
        const response = await axios.post(FETCH_URL, {
          query: [
            {
              code: 'Boligtype',
              selection: {
                filter: 'item',
                values: [searchParams.houseType],
              },
            },
            {
              code: 'ContentsCode',
              selection: {
                filter: 'item',
                values: ['KvPris'],
              },
            },
            {
              code: 'Tid',
              selection: {
                filter: 'item',
                values,
              },
            },
          ],
          response: {
            format: 'json-stat2',
          },
        })

        const parsedData = parseJsonStat(response.data)
        setData(parsedData)
      } catch (error) {
        if (axios.isAxiosError(error)) {
          setError(error.message)
        } else {
          setError('An unexpected error occurred')
        }
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [searchParams]) // Depends on `searchParams`

  return { loading, data, error }
}

export default useFetchData
