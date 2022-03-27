import { Typography } from '@mui/material';
import React, { useState } from 'react'
import useProducts from '../../hooks/useProducts';
import { Button, TableContainer, Paper, Table, TableHead, TableRow, TableCell, TableBody, Box } from "@mui/material";
import { Edit, Delete } from "@mui/icons-material";
import { removeProduct, setPageNumber } from "../../store/slices/catalogSlice"
import AppPagination from '../../components/AppPagination';
import { useDispatch } from 'react-redux';
import ProductForm from '../../components/ProductForm';
import agent from '../../api/agent';


const Inventory = () => {

    const {products, metaData} = useProducts();
    const dispatch = useDispatch();
    const [editMode, setEditMode] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(undefined);
    const [loading, setLoading] = useState(false);
    const [target, setTarget] = useState(0);



    function handleSelectProduct(product) {
        setSelectedProduct(product);
        setEditMode(true);
    }

    function cancelEdit(){
        if(selectedProduct) setSelectedProduct(undefined);
        setEditMode(false)
    }

    function handleDeleteProduct(id){
        setLoading(true);
        setTarget(id);
        agent.Admin.deleteProduct(id)
        .then(() => dispatch(removeProduct(id)))
        .catch(err => console.log(err))
        .finally(() => setLoading(false));
    }

    if(editMode) return <ProductForm product={selectedProduct} cancelEdit =  {cancelEdit} />


    return (
        <>
            <Box display='flex' justifyContent='space-between'>
                <Typography sx={{ p: 2 }} variant='h4'>Inventory</Typography>
                <Button onClick={() => setEditMode(true)} sx={{ m: 2 }} size='large' variant='contained'>Create</Button>
            </Box>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>#</TableCell>
                            <TableCell align="left">Product</TableCell>
                            <TableCell align="right">Price</TableCell>
                            <TableCell align="center">Type</TableCell>
                            <TableCell align="center">Brand</TableCell>
                            <TableCell align="center">Quantity</TableCell>
                            <TableCell align="right"></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {products.map((product) => (
                            <TableRow
                                key={product.id}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row">
                                    {product.id}
                                </TableCell>
                                <TableCell align="left">
                                    <Box display='flex' alignItems='center'>
                                        <img src={product.pictureUrl} alt={product.name} style={{ height: 50, marginRight: 20 }} />
                                        <span>{product.name}</span>
                                    </Box>
                                </TableCell>
                                <TableCell align="right">{product.price}</TableCell>
                                <TableCell align="center">{product.type}</TableCell>
                                <TableCell align="center">{product.brand}</TableCell>
                                <TableCell align="center">{product.quantityInStock}</TableCell>
                                <TableCell align="right">
                                    <Button onClick={() => handleSelectProduct(product)} startIcon={<Edit />} />
                                    <Button 
                                        startIcon={<Delete />} color='error' 
                                        onClick={() => handleDeleteProduct(product.id)}
                                    />
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            {metaData && 
                <Box sx={{pt: 2}}>
                    <AppPagination 
                        metaData={metaData} 
                        onPageChange={(page) => dispatch(setPageNumber({pageNumber: page}))}
                    />
                </Box>
            }
        
        </>
    )
}

export default Inventory