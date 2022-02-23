import { Button, Grid, IconButton, Typography } from '@mui/material';
import React, { useState } from 'react'

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Add, Delete, Remove } from '@mui/icons-material';
import agent from '../api/agent';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addBasketItemAsync, removeBasketItemAsync, setBasket } from '../store/slices/basketSlice';

const BasketPage = () => {

    const {basket} = useSelector(state=>state.basket);
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);

    const handleAddItem =(productId)=>{
        setLoading(true);
        dispatch(addBasketItemAsync({productId}))
    }

    const handleRemoveItem =(productId, quantity=1)=>{
        setLoading(true);
        dispatch(removeBasketItemAsync({productId, quantity}))
        
    }

    let delivary =0;

    const subtotal = basket?.items.reduce((sum, item) => sum + (item.quantity * item.price), 0) ?? 0;

    const total = delivary + subtotal;

    if(!basket) return <Typography variant='h3'>Basket Empty</Typography>
    return (
            <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }}>
            <TableHead>
                <TableRow>
                <TableCell>Product</TableCell>
                <TableCell align="right">Price</TableCell>
                <TableCell align="right">Qty</TableCell>
                <TableCell align="right">Sub Total</TableCell>
                <TableCell align="right"></TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {basket.items.map((item) => (
                <TableRow
                    key={item.productId}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                    <TableCell component="th" scope="row">
                    {item.name}
                    </TableCell>
                    <TableCell align="right">{item.price}</TableCell>

                    <TableCell align="right">
                        <IconButton
                            onClick={()=> handleRemoveItem(item.productId)}
                        >
                            <Remove/>
                        </IconButton>
                        {item.quantity}
                        <IconButton
                        onClick={()=> handleAddItem(item.productId)}>
                            <Add/>
                        </IconButton>
                    </TableCell>
                    <TableCell align="right">$ {item.price * item.quantity}</TableCell>
                    <TableCell align="right">
                        <IconButton color='error'
                            onClick={()=> handleRemoveItem(item.productId, item.quantity)}
                        >
                            <Delete />
                        </IconButton>
                    </TableCell>
                </TableRow>
                ))}
                <TableRow>
                    <TableCell>subtotal</TableCell>
                    <TableCell>{subtotal}</TableCell>
                </TableRow>
                <TableRow>
                    <TableCell>Delivary Fee</TableCell>
                    <TableCell>{delivary}</TableCell>
                </TableRow>
                <TableRow>
                    <TableCell>Total</TableCell>
                    <TableCell>{total}</TableCell>
                </TableRow>
            </TableBody>
            </Table>
            <Grid container>
                <Grid item xs={6} />
                <Grid item xs={6} >
                    <Button
                        component={Link}
                        to="/checkout"
                        variant='contained'
                        size="large"
                        fullWidth
                    >
                        Checkout
                    </Button>
                </Grid>
            </Grid>
        </TableContainer>
    )
}

export default BasketPage