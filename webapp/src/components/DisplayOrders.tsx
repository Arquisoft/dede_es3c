import React, {useContext } from 'react';
import { Order } from '../shared/shareddtypes';
import { LangContext } from '../lang';
import { TableCell, TableRow } from '@mui/material';

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
                {order.products.map((prod) => {return <img src={prod.product.urlPhoto} width= "100" height= "100"/>})}
                    </TableCell>
                    <TableCell align="center" colSpan={2}>
                         {order.id}
                    </TableCell>
                    <TableCell align="center" colSpan={3}>
                         {order.products.map((prod) => {return prod.product.name + "(x" + prod.quantity+ ")\t" + "\n "})}
                    </TableCell>
                    <TableCell align="center" colSpan={4}>
                         {order.price + "$"}
                    </TableCell>
                    <TableCell align="center" colSpan={4}>
                         {(order.price * 1.21) + "$"}
                    </TableCell>
            </TableRow>
            );
        })}
        </>
    );
}
export default DisplayOrders;