import { Checkbox, FormControlLabel, FormGroup } from '@mui/material'
import React, { useState } from 'react'

const CheckBox = ({items, onChange, checked}) => {

    const [checkedItems, setCheckedItems] = useState(checked || []);

    function handleChecked(value){
        const currentIndex = checkedItems.findIndex(item => item == value);
        let newchecked = [];
        if(currentIndex===-1) newchecked = [...checkedItems, value];
        else newchecked = checkedItems.filter(item => item == value);
        setCheckedItems(newchecked);
        onChange(newchecked)
    }

    return (
        <FormGroup>
            {items.map(item => (
                <FormControlLabel 
                control={
                    <Checkbox checked = {checkedItems.indexOf(item) !== -1} 
                    onClick={()=>handleChecked(item)}  />} 
                key={item}
                label={item} />

            ))}
        </FormGroup>
    )
}

export default CheckBox