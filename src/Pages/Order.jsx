import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import agent from '../api/agent';
import { Button } from '@mui/material';


export default function Order (){


    const [loading, setLoading] = React.useState(true);
    const [orders, setOrders] = React.useState();


    React.useEffect(()=>{
        setLoading(true);
        agent.Order.list()
            .then(order => setOrders(order))
            .catch(error => console.log(error))
            .finally(() => setLoading(false))
    },[])

    return(
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
                <TableRow>
                <TableCell>Order number</TableCell>
                <TableCell align="right">Total</TableCell>
                <TableCell align="right">Order Date</TableCell>
                <TableCell align="right">Order Status</TableCell>
                <TableCell align="right"></TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {orders?.map((order) => (
                <TableRow
                    key={order.id}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                    <TableCell component="th" scope="row">
                    {order.id}
                    </TableCell>
                    <TableCell align="right">{order.total}</TableCell>
                    <TableCell align="right">{order.orderDate}</TableCell>
                    <TableCell align="right">{order.orderStatus}</TableCell>
                    <TableCell align="right">
                        <Button>View</Button>
                    </TableCell>
                </TableRow>
                ))}
            </TableBody>
            </Table>
        </TableContainer>
    )
}