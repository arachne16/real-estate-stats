import { SearchParams } from '../types'

const searchHistoryKey = 'searchHistory'

const saveSearchToHistory = (searchParams: SearchParams) => {
  const history = JSON.parse(localStorage.getItem(searchHistoryKey) || '[]')
  history.push(searchParams)
  localStorage.setItem(searchHistoryKey, JSON.stringify(history))
}

const getSearchHistory = (): SearchParams[] => {
  const storedHistory = JSON.parse(
    localStorage.getItem('searchHistory') || '[]'
  )
  return storedHistory
}

const clearSearchHistory = (): void => {
  localStorage.removeItem(searchHistoryKey)
}

export {
  searchHistoryKey,
  saveSearchToHistory,
  getSearchHistory,
  clearSearchHistory,
}
