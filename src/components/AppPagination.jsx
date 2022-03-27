import { Box, Pagination, Typography } from '@mui/material';
import React, { useState } from 'react'

const AppPagination = ({ metaData, onPageChange }) => {

    const { currentPage, totalCount, totalPages, pageSize } = metaData;

    const [pageNumber, setPageNumber] = useState(currentPage);

    function handlePageChange(page){
        setPageNumber(page);
        onPageChange(page)
    }

    if(!metaData.currentPage) return <h1>Loading..</h1>
        return (
                <Box display='flex' justifyContent='space-between' alignItems='center'>
                    <Typography>Displaying {(currentPage-1)*pageSize+1}-
                    {currentPage*pageSize > totalCount ? totalCount : currentPage*pageSize }
                    of {totalCount} </Typography>
                    <Pagination 
                        color='secondary'
                        size='large'
                        count={totalPages}
                        page={pageNumber}
                        onChange = {(e,page) =>handlePageChange(page)}
                    />
                </Box>
                )
}

export default AppPagination