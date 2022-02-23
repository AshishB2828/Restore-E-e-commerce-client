import React from 'react';
import { Avatar, Button, Card, CardActions, CardContent, CardHeader, CardMedia, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import agent from '../api/agent';
import { useDispatch } from 'react-redux';
import { addBasketItemAsync, setBasket } from '../store/slices/basketSlice';

const ProductCard = ({ product }) => {

    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();

    return (

    <Card sx={{ maxWidth: 345 }}>
        <CardHeader
            avatar={
                <Avatar>
                    {product.name.charAt(0)}
                </Avatar>
            }
            title={product.name}
        />
        <CardMedia
        component="img"
        height="140"
        image={product.pictureUrl}
        title={product.name}
        />
        <CardContent>
        <Typography gutterBottom color='secondary' variant="h5" component="div">
            {product.price}
        </Typography>
        <Typography variant="body2" color="text.secondary">
            {product.brand} / {product.type}
        </Typography>
        </CardContent>
        <CardActions>
            <Button 
                size="small"
                onClick={()=> dispatch(addBasketItemAsync({productId: product.id}))}
                >Add To Cart</Button>
            <Button component={Link} to={`/catalog/${product.id}`} size="small">View</Button>
        </CardActions>
    </Card>

        )
    
};

export default ProductCard;
