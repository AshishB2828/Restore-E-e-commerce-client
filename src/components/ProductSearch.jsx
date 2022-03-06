import { debounce, TextField } from '@mui/material'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setProductParams } from '../store/slices/catalogSlice';

const ProductSearch = () => {

    const { productParams } = useSelector(state => state.catalog);
    const dispatch = useDispatch();
    const [searchTerm, setSearchTerm] = useState(productParams.searchTerm)

    const debouncedSearch = debounce((e)=>{
        dispatch(setProductParams({searchTerm: e.target.value}));
    }, 1000)

    return (
        <div>
            <TextField
                label="search.."
                variant='outlined'
                fullWidth
                value={searchTerm || ""}
                onChange={e => {setSearchTerm(e.target.value); debouncedSearch(e)}}
            />
        </div>
    )
}

export default ProductSearch