import React from 'react'
import { Chart } from 'react-google-charts'
import { DataPoint } from '../types'

interface ChartDisplayProps {
  data: DataPoint[]
}

const ChartDisplay: React.FC<ChartDisplayProps> = ({ data }) => {
  const chartData = [
    ['Quarter', 'Price per Square Meter'],
    ...data.map((item) => [item.quarter, item.pricePerSquareMeter]),
  ]

  const options = {
    title: 'Average Price per Square Meter',
    curveType: 'function',
    legend: { position: 'bottom' },
  }

  return (
    <div>
      {data.length > 0 ? (
        <Chart
          chartType="LineChart"
          width="100%"
          height="400px"
          data={chartData}
          options={options}
        />
      ) : (
        <p>No data available for the selected parameters.</p>
      )}
    </div>
  )
}

export default ChartDisplay
