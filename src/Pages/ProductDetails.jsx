import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Divider, Grid, Typography } from '@mui/material';

const ProductDetails = () => {

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(false);
  const {id} = useParams();

  const fetchProduct = async()=>{
      setLoading(true);
      try {
        const {data} = await axios.get(`https://localhost:44321/api/Product/${id}`);
        setProduct(data);
        setLoading(false);

      } catch (error) {
        setLoading(false);
        console.log(error)
      }
  }

  useEffect(()=>{
    if(id)
    fetchProduct();
  },[id])

  if(!product) return <h1>No product..</h1>

  if(loading)
  {
    return(
      <h1>Loading....</h1>
    )
  }
  return (
      <Grid container spacing={6}>
        <Grid item xs={6}>
          <img src={product.pictureUrl}  alt="" style={{width: '100%'}}  />
        </Grid>
        <Grid item xs={6}>
            <Typography variant='h3' >{product.name}</Typography>
            <Divider sx={{mb:2}} />
            <Typography variant='h3'>$ {product.price}</Typography>
            <Typography variant='h4'>Qty : {product.quantityInStock}</Typography>
        </Grid>
      </Grid>
  )
};

export default ProductDetails;
