import Select from 'react-select';
import {useState} from 'react'

import { Country, State, City }  from 'country-state-city';
import { CountryInf } from '@/types';

interface Props {
    value:any,
    onOk : (value : any) => void
}

const SelectComp = ({value,onOk} : Props) => {
    const countries = Country.getAllCountries()


    const formattedCountries : CountryInf[]  = countries.map((country)=>({
        value:country.flag,
        label:country.name,
        lat:country.latitude,
        long:country.longitude,
        
    }))

    return (
        <Select
            value={value}
            isClearable
            onChange={(e : CountryInf)=>onOk(e)}
            options={formattedCountries}
        />
    )
}

export default SelectComp