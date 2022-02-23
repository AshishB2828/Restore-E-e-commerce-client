import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProductsAsync, productSelectors } from '../store/slices/catalogSlice';
import ProductList from './ProductList';

const Catalog = ({  }) => {


    const products = useSelector(productSelectors.selectAll);
    const { productLoaded } = useSelector(state => state.catalog)
    const dispatch = useDispatch();
    


    useEffect(()=>{
        if(!productLoaded) dispatch(fetchProductsAsync());
    }, [productLoaded, dispatch])

    return(
        <>
            { products &&  <ProductList products={products}/>}
        </>
    )
};

export default Catalog;
