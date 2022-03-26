import React, { FC, useContext } from 'react';
import { Order, Product } from '../shared/shareddtypes';
import { LangContext } from '../lang';
import { Table, TableCell, TableRow } from '@mui/material';
import { height } from '@mui/system';

type OrdersProps = {
    orders: Order[]
}

const DisplayOrders = (props: OrdersProps) => {
    const { dispatch: { translate } } = useContext(LangContext);
    return (
    <>
        {props.orders.map((order) => {
            return (        
            <TableRow>
                <TableCell align="center" colSpan={1}>
                {order.products.map((prod) => {return <img src={prod.product.urlPhoto} width= "50" height= "50"/>})}
                    </TableCell>
                    <TableCell align="center" colSpan={2}>
                         {order.id}
                    </TableCell>
                    <TableCell align="center" colSpan={3}>
                         {order.products.map((prod) => {return prod.product.name + "\n "})}
                    </TableCell>
                    <TableCell align="center" colSpan={4}>
                         {order.price}
                    </TableCell>
            </TableRow>
            );
        })}
        </>
    );
}
export default DisplayOrders;