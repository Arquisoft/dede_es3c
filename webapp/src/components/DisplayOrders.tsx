import React from 'react';
import { Order } from '../shared/shareddtypes';
import { TableCell, TableRow } from '@mui/material';

type OrdersProps = {
    orders: Order[]
}

const DisplayOrders = (props: OrdersProps) => {
    return ( 
        <>
            {props.orders.map((order, i) => {
                return (
                    <TableRow key={i}>
                        <TableCell align="center" colSpan={1} >
                            {order.products.map((prod, j) => { return <img src={prod.product.urlPhoto} width="100" height="100" id={prod.product.name} key={j} alt={prod.product.name}/> })}
                        </TableCell>
                        <TableCell align="center" colSpan={2}>
                            {order.id}
                        </TableCell>
                        <TableCell align="center" colSpan={3}>
                            {order.products.map((prod) => { return prod.product.name + "(x" + prod.quantity + ")\t\n " })}
                        </TableCell>
                        <TableCell align="center" colSpan={4}>
                            {order.price.toFixed(2) + "$"}
                        </TableCell>
                        <TableCell align="center" colSpan={4}>
                            {(order.price * 1.21).toFixed(2) + "$"}
                        </TableCell>
                    </TableRow>
                );
            })}
        </>
    );
}
export default DisplayOrders;