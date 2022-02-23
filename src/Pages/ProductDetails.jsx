import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Divider, Grid, Typography } from '@mui/material';
import agent from '../api/agent';
import Loading from '../components/Loading';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProductAsync, productSelectors } from '../store/slices/catalogSlice';

const ProductDetails = () => {

  const [loading, setLoading] = useState(false);
  const {id} = useParams();
  const dispatch  = useDispatch();
  const product  = useSelector(state => productSelectors.selectById(state, id));
  const { status } = useSelector(state => state.catalog)

  useEffect(()=>{
    if(!product) dispatch(fetchProductAsync(parseInt(id)))
  },[id])

  

  if(status.includes('pending'))
  {
    return(
      <Loading />
    )
  }
  if(!product) return <h1>No product..</h1>
  else
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
