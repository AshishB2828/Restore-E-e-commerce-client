import { FormControl, FormControlLabel, Radio, RadioGroup } from '@mui/material'
import React from 'react'

const RadioButtonGroup = ({options, onChange, selectedValue}) => {
    return (
        <FormControl>
        <RadioGroup
            onChange={onChange}
            value ={selectedValue}
        >   
        {
            options.map(({value, label}) => (
                <FormControlLabel 
                    value={value} 
                    key ={value}
                    control={<Radio />} label={label} />

            ))
        }
        </RadioGroup>
    </FormControl>
    )
}

export default RadioButtonGroup