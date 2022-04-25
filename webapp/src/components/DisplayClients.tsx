import React from 'react';
import { User } from '../shared/shareddtypes';
import { TableCell, TableRow } from '@mui/material';

type ClientsProps = {
    users: User[]
}

const DisplayClients = (props: ClientsProps) => {
    return ( 
        <>
            {props.users.map((user, i) => {
                return (
                    <TableRow key={i}>
                        <TableCell align="center" colSpan={1}>
                            {user.username}
                        </TableCell>
                        <TableCell align="center" colSpan={2}>
                            {user.email}
                        </TableCell>
                        <TableCell align="center" colSpan={3}>
                            {user.rol}
                        </TableCell>
                    </TableRow>
                );
            })}
        </>
    );
}
export default DisplayClients;