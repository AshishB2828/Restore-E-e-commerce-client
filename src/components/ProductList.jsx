import { Grid } from '@mui/material';
import React from 'react';
import ProductCard from './ProductCard';

const ProductList = ({products}) => {
    return (
        <Grid container spacing={4}>
                {
                    products?.map((product)=>{
                        return (
                            <Grid key={product.id} xs={3}  item >
                                <ProductCard product={product} />
                            </Grid>
                        )
                    })
                }
        </Grid>
    )
};

export default ProductList;
