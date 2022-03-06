import { Checkbox, FormControl, FormControlLabel, 
        FormGroup, Grid, Pagination, Paper, Radio, 
        RadioGroup, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProductsAsync, productSelectors , fetchFiltersAsync, setPageNumber} from '../store/slices/catalogSlice';
import ProductList from './ProductList';
import ProductSearch from './ProductSearch';
import RadioButtonGroup from './RadioButtonGroup';
import { setProductParams } from '../store/slices/catalogSlice';
import CheckBox from './checkBox';
import AppPagination from './AppPagination';


const Catalog = ({  }) => {


    const products = useSelector(productSelectors.selectAll);
    const { 
            productLoaded ,
            filtersLoaded, 
            brands, 
            types, 
            productParams,
            metaData
            } = useSelector(state => state.catalog)
    const dispatch = useDispatch();
    
    const sortOptions =[
        {value: "name", label: 'Alphabetical'},
        {value: "priceDesc", label: 'Price - High to Low'},
        {value: "price", label: 'Price - Low to High'},
    ]


    useEffect(()=>{
        if(!productLoaded) dispatch(fetchProductsAsync());
    }, [productLoaded, dispatch])
    useEffect(()=>{
        if(!filtersLoaded) dispatch(fetchFiltersAsync());
    }, [filtersLoaded, dispatch])
    if(!metaData ) return <div>Loading.......</div>
    return(
        <Grid container spacing={4}>
            <Grid item xs={3}>
                <Paper xs={{mb: 2}}>
                    <ProductSearch />
                </Paper>
                <br/>
                <Paper xs={{mb: 2, p: 4}}>
                    <RadioButtonGroup 
                        options={sortOptions}
                        onChange={e => dispatch(setProductParams({orderBy: e.target.value}))}
                        selectedValue={productParams.orderBy}    
                    />
                </Paper>
                <br/>
                <Paper xs={{mb: 2, mt:2, p: 4}}>
                    <CheckBox
                        items={brands}
                        Checked={productParams.brands}
                        onChange={(items) => dispatch(setProductParams({brands: items}))}
                    />
                </Paper>
                <br/>
                <Paper xs={{mb: 2, mt:2, p: 4}}>
                <CheckBox
                        items={types}
                        checked={productParams.types}
                        onChange={(items) => dispatch(setProductParams({types: items}))}
                    />
                </Paper>

            </Grid>
            <Grid item xs={9}>
            { products &&  <ProductList products={products}/>}
            </Grid>
            <br/>
            <Grid item xs={3}/>

            <Grid item xs={9}>
                <AppPagination
                    metaData={metaData}
                    onPageChange={(page) => dispatch(setPageNumber({pageNumber: page}))}
                />
            </Grid>
        </Grid>
    )
};

export default Catalog;
