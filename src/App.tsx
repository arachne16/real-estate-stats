import React, { useCallback } from 'react'
import './App.css'

import {
  AppBar,
  Container,
  Grid,
  Toolbar,
  Typography,
  Backdrop,
  CircularProgress,
  Alert,
} from '@mui/material'

import SearchForm from './components/SearchForm'
import ChartDisplay from './components/ChartDisplay'
import SearchHistory from './components/SearchHistory'

import useFetchData from './hooks/useFetchData'
import useSearchHistory from './hooks/useSearchHistory'

const App: React.FC = () => {
  const {
    searchParams,
    updateSearchParams,
    history,
    clearHistory,
    setSearchParams,
  } = useSearchHistory()
  const { data, loading, error } = useFetchData(searchParams)

  // Memoized callback to refresh the history
  const handleHistoryChange = useCallback(() => {
    updateSearchParams(searchParams)
  }, [searchParams, updateSearchParams])

  return (
    <>
      <AppBar position="static" color="transparent">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Norway Real Estate Stats
          </Typography>
        </Toolbar>
      </AppBar>

      <Container maxWidth="xl" className="app-container">
        <Grid container spacing={2} direction="column">
          {/* Section for SearchForm and URL History */}
          <Grid item container spacing={2}>
            <Grid item xs={12} md={6}>
              <SearchForm
                setSearchParams={setSearchParams}
                handleHistoryChange={handleHistoryChange}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <SearchHistory history={history} clearHistory={clearHistory} />
            </Grid>
          </Grid>

          {/* Section for Chart */}
          <Grid item xs={12}>
            {loading ? (
              <Backdrop open={true}>
                <CircularProgress color="inherit" />
              </Backdrop>
            ) : error ? (
              <Alert severity="error">{error}</Alert>
            ) : (
              data && <ChartDisplay data={data} />
            )}
          </Grid>
        </Grid>
      </Container>
    </>
  )
}

export default App
