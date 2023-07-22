'use client'

import 'react-date-range/dist/styles.css'; 
import 'react-date-range/dist/theme/default.css'; 

import { Range, DateRange, DateRangePicker } from 'react-date-range';
import { useState } from 'react';


interface Props {
  value : Range
  disabledDates? : Date[]
  onChange : (value : Range) => void
}

const Calendary = ({value, disabledDates, onChange} : Props) => {

  const handleChange = (value:any) => {
    onChange(value.selection)
  }
  return (
    <DateRange
        ranges={[value]}
        onChange={handleChange}
        minDate={new Date()}
        showDateDisplay={false}
        direction="vertical"
        disabledDates={disabledDates}
      
      />
  )
}

export default Calendary