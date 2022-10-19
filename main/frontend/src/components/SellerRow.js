import React, { useEffect, useState } from "react";
import OrderList from "./OrderList";
import {AddOrderModal} from './Modal';

import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';

export default function SellerRow(props) {
    const [seller, setSeller] = useState(props.seller);
    const [open, setOpen] = useState(false);

    useEffect(() => {
        setSeller(props.seller);
    }, [props])
    function handleClick (e) {
        setOpen(!open);
    }

    const refresh = () => {
        props.refresh();
    }

    return (
        <React.Fragment>
            <TableRow hover role="checkbox" tabIndex={-1} key={seller.id} onClick={() => handleClick()}>
                <TableCell align="center" colSpan={1}>
                    {seller.last_name}
                </TableCell>
                <TableCell align="center" colSpan={2}>
                    {seller.name}
                </TableCell>
                <TableCell align="center" colSpan={3}>
                    {seller.group}
                </TableCell>
                <TableCell>
                    <AddOrderModal seller={seller} refresh={refresh} />
                </TableCell>
            </TableRow>
            <TableRow>
                <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <Box sx={{ margin: 1 }}>
                            <OrderList orderList={seller.order_set} key={seller.id} refresh={refresh} />
                        </Box>
                    </Collapse>
                </TableCell>
            </TableRow>     
        </React.Fragment>  
    )
}