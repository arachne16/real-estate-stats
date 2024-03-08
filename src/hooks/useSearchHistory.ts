import { useState, useCallback } from 'react'
import { SearchParams } from '../types'

// Import handlers of local storage interactions
import {
  saveSearchToHistory,
  getSearchHistory,
  clearSearchHistory,
} from '../utils/handleSearchToHistory'

const useSearchHistory = () => {
  const [searchParams, setSearchParams] = useState<SearchParams | null>(null)
  const [history, setHistory] = useState<SearchParams[]>(getSearchHistory())

  // Update the search params
  const updateSearchParams = useCallback((params: SearchParams | null) => {
    setSearchParams(params)
    if (params !== null) {
      saveSearchToHistory(params)
      setHistory(getSearchHistory())
    }
  }, [])

  // Clear the search history
  const clearHistory = useCallback(() => {
    clearSearchHistory()
    setHistory([])
  }, [])

  return {
    history,
    searchParams,
    clearHistory,
    setSearchParams,
    updateSearchParams,
  }
}

export default useSearchHistory
