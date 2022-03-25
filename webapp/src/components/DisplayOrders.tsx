import React, { FC, useContext } from 'react';
import { Order, Product } from '../shared/shareddtypes';
import { LangContext } from '../lang';
import { Table, TableCell, TableRow } from '@mui/material';

type OrdersProps = {
    orders: Order[]
}

const DisplayOrders = (props: OrdersProps) => {


    const { dispatch: { translate } } = useContext(LangContext);
    return (
        props.orders.map((order) => {
            return (
            <TableRow>
                    <TableCell>
                         rofkropfk
                    </TableCell>
            </TableRow>
            );
        }
        )
    )
}

export default DisplayOrders;