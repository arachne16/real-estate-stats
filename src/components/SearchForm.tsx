import React, { useState, useEffect } from 'react'
import { useForm, SubmitHandler } from 'react-hook-form'

import {
  Button,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Box,
  Slider,
  IconButton,
  InputAdornment,
  Divider,
  Tooltip,
} from '@mui/material'
import SaveIcon from '@mui/icons-material/Save'

import { SearchParams } from '../types'

import {
  quarterToSliderValue,
  sliderValueToQuarter,
} from '../utils/quarterRangeUtils'

const FETCH_URL = 'https://data.ssb.no/api/v0/no/table/07241'

const defaultQuartersRange = '2009K1-2009K4'
const defaultHouseType = '00' // Default to "Boliger i alt"

interface SearchFormProps {
  setSearchParams: (params: SearchParams) => void
  handleHistoryChange: () => void
}

const SearchForm: React.FC<SearchFormProps> = ({
  setSearchParams,
  handleHistoryChange,
}) => {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<SearchParams>({
    defaultValues: {
      quartersRange: defaultQuartersRange,
      houseType: defaultHouseType,
    },
  })
  const [sliderValue, setSliderValue] = useState([0, 3]) // Default range

  const quarterRange = watch('quartersRange')
  const houseType = watch('houseType')

  const [generatedUrl, setGeneratedUrl] = useState(FETCH_URL)

  // When component mounts, set the search parameters to default values
  useEffect(() => {
    setSearchParams({
      quartersRange: defaultQuartersRange,
      houseType: defaultHouseType,
    })
  }, [setSearchParams])

  // Constructing the URL for display:
  useEffect(() => {
    const quarters = quarterRange || defaultQuartersRange
    const house = houseType || defaultHouseType

    const params = new URLSearchParams({ quarters, house })
    const shareableUrl = `${FETCH_URL}?${params.toString()}`
    setGeneratedUrl(shareableUrl)
  }, [quarterRange, houseType])

  // Submit Handling
  const onSubmit: SubmitHandler<SearchParams> = (data) => {
    setSearchParams(data)
  }

  // For handling text field changes without causing type mismatches.
  const handleQuarterInputChange = (position: number, value: string) => {
    const newValue = [...sliderValue]
    newValue[position] = quarterToSliderValue(value)
    setSliderValue(newValue)
    setValue(
      'quartersRange',
      `${sliderValueToQuarter(newValue[0])}-${sliderValueToQuarter(
        newValue[1]
      )}`,
      { shouldValidate: true }
    )
  }

  // Slider Handling
  const handleSliderChange = (_: Event, newValue: number | number[]) => {
    setSliderValue(newValue as number[])
    const [start, end] = newValue as number[]
    setValue(
      'quartersRange',
      `${sliderValueToQuarter(start)}-${sliderValueToQuarter(end)}`
    )
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Box display="flex" flexDirection="column" gap={2} mb={4}>
        {/* Text Input for Shareable URL */}
        <TextField
          fullWidth
          label="Shareable URL"
          variant="outlined"
          value={generatedUrl}
          InputProps={{
            readOnly: true,
            endAdornment: (
              <InputAdornment position="end">
                <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
                <Tooltip
                  title="Save Search Entries to History"
                  arrow
                  placement="top-start"
                >
                  <IconButton
                    onClick={handleHistoryChange}
                    edge="end"
                    color="primary"
                    size="large"
                  >
                    <SaveIcon />
                  </IconButton>
                </Tooltip>
              </InputAdornment>
            ),
          }}
        />

        {/* Slider for Selecting Quarter */}
        <Box display="flex" gap={2} alignItems="center">
          <TextField
            label="Start Quarter"
            variant="outlined"
            value={sliderValueToQuarter(sliderValue[0])}
            onChange={(e) => handleQuarterInputChange(0, e.target.value)}
            error={!!errors.quartersRange}
            helperText={errors.quartersRange && 'Invalid quarter'}
          />
          <Slider
            value={sliderValue}
            onChange={handleSliderChange}
            valueLabelDisplay="auto"
            aria-labelledby="range-slider"
            min={0}
            max={Math.floor(
              (new Date().getFullYear() - 2009) * 4 + new Date().getMonth() / 3
            )}
            marks
            getAriaValueText={sliderValueToQuarter}
          />
          <TextField
            label="End Quarter"
            variant="outlined"
            value={sliderValueToQuarter(sliderValue[1])}
            onChange={(e) => handleQuarterInputChange(0, e.target.value)}
            error={!!errors.quartersRange}
            helperText={errors.quartersRange && 'Invalid quarter'}
          />
        </Box>

        {/* Select Input for House Type */}
        <FormControl variant="outlined" fullWidth>
          <InputLabel>House Type</InputLabel>
          <Select
            {...register('houseType', { required: true })}
            label="House Type"
            defaultValue={defaultHouseType}
          >
            <MenuItem value="00">Boliger i alt</MenuItem>
            <MenuItem value="02">Småhus</MenuItem>
            <MenuItem value="03">Blokkleiligheter</MenuItem>
          </Select>
        </FormControl>
        <Button type="submit" variant="contained" color="primary">
          Search
        </Button>
      </Box>
    </form>
  )
}

export default SearchForm
