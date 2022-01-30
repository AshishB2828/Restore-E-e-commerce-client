import React from 'react';
import { Avatar, Button, Card, CardActions, CardContent, CardHeader, CardMedia, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

const ProductCard = ({ product }) => {
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
            <Button size="small">Add To Cart</Button>
            <Button component={Link} to={`/catalog/${product.id}`} size="small">View</Button>
        </CardActions>
    </Card>

        )
    
};

export default ProductCard;
