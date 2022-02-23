import { Backdrop, Box, CircularProgress } from '@mui/material';
import React from 'react';

const Loading = () => {
    return (
        <Backdrop open={true} invisible={true}>
            <Box display='flex' justifyContent='center' alignItems='center' height='100vh'>
                <CircularProgress size={100} color='secondary' />
            </Box>
        </Backdrop>
    )
};

export default Loading;
