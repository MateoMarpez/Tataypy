import React, { useEffect, useState } from "react";
import {PayButton, DeliverButton} from './OrderButton'
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import EditIcon from '@mui/icons-material/Edit';
import IconButton from '@mui/material/IconButton';
import {EditOrderModal} from './Modal'

export default function OrderRow(props) {
    const [order, setOrder] = useState(props.order);


    const refresh = () => {
        props.refresh()
    }
    
    const newOrder = (newOrder) => {
        setOrder(newOrder);
        console.log('New Order is: ', newOrder)
    }

    return(
        <React.Fragment>
            <TableRow>
                <TableCell align="center" colSpan={1}>
                    {order.last_name}
                </TableCell>
                <TableCell align="center" colSpan={2}>
                    {order.name}
                </TableCell>
                <TableCell align="center" colSpan={4}>
                    {order.amount}
                </TableCell>
                <TableCell align="center" colSpan={5}>
                    <DeliverButton order={order} newOrder={newOrder} refresh={refresh}/>
                </TableCell>
                <TableCell align="center" colSpan={5}>
                    <PayButton order={order} newOrder={newOrder} refresh={refresh} />
                </TableCell>
                <TableCell>
                    <EditOrderModal order={order} newOrder={newOrder} />
                </TableCell>
            </TableRow>
        </React.Fragment>
    )
}