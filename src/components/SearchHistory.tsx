import React from 'react'

import {
  Button,
  Divider,
  List,
  Box,
  ListItem,
  ListItemText,
  Typography,
} from '@mui/material'

import { SearchParams } from '../types'

interface SearchHistoryProps {
  history: SearchParams[]
  clearHistory: () => void
}

const SearchHistory: React.FC<SearchHistoryProps> = ({
  history,
  clearHistory,
}) => {
  return (
    <>
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <Typography variant="h6" sx={{ marginRight: 'auto' }}>
          Search History
        </Typography>
        <Button variant="outlined" color="secondary" onClick={clearHistory}>
          Clear History
        </Button>
      </Box>

      <Divider sx={{ margin: 1 }} />

      {history.length > 0 ? (
        <List style={{ maxHeight: '200px', overflowY: 'auto' }}>
          {history.map((searchParams, index) => (
            <ListItem key={index}>
              <ListItemText
                primary={`Quarters: ${searchParams.quartersRange}, House Type: ${searchParams.houseType}`}
              />
            </ListItem>
          ))}
        </List>
      ) : (
        <Typography>No search history found.</Typography>
      )}
    </>
  )
}

export default SearchHistory
