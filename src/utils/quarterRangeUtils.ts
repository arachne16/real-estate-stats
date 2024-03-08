export const quarterToSliderValue = (quarter: string): number => {
  const year = parseInt(quarter.substring(0, 4), 10)
  const q = parseInt(quarter.substring(5), 10)
  return (year - 2009) * 4 + q - 1
}

export const sliderValueToQuarter = (value: number): string => {
  const year = Math.floor(value / 4) + 2009
  const quarter = (value % 4) + 1
  return `${year}K${quarter}`
}
