import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { fetchFiltersAsync, fetchProductsAsync, productSelectors } from "../store/slices/catalogSlice"

const useProducts = () => {

    const products = useSelector(productSelectors.selectAll);
    const { productsLoaded, filtersLoaded, brands, types, metaData } = useSelector(state => state.catalog);
    const dispatch = useDispatch();

    useEffect(() => {
        if (!productsLoaded) dispatch(fetchProductsAsync());
    }, [productsLoaded, dispatch])

    useEffect(() => {
        if (!filtersLoaded) dispatch(fetchFiltersAsync());
    }, [filtersLoaded, dispatch]);

    return {
        products,
        productsLoaded,
        filtersLoaded,
        brands,
        types,
        metaData
    }
}

export default useProducts