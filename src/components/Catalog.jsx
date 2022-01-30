import React, { useEffect, useState } from 'react';
import ProductList from './ProductList';

const Catalog = ({  }) => {


    const [products, setProducts] = useState([]);
    async function fetchData(){
        await fetch('https://localhost:44321/api/Product')
            .then(res=>res.json()).then(data => setProducts(data))
            .catch(err=>console.log(err))
    }

    useEffect(()=>{
        fetchData()
    }, [])

    return(
        <>
            { products &&  <ProductList products={products}/>}
        </>
    )
};

export default Catalog;
