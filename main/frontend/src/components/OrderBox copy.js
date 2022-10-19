import React, { useEffect, useState } from "react";
import {ApplyFilterOrder} from './ApplyFilter';
import OrderRow from "./OrderRow"

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

export default function OrderBox(props) {
    const [list, setList] = useState(props.orderList);
    useEffect(() => {
        setList(props.orderList);
    }, [props])


    const refresh = () => {
        props.refresh()
    }

    return(
        <Table size="small">
            <TableHead>
                <TableRow>
                    <TableCell align="center" colSpan={1}>
                        Apellido
                    </TableCell>
                    <TableCell align="center" colSpan={2}>
                        Nombre
                    </TableCell>
                    <TableCell align="center" colSpan={4}>
                        Porciones
                    </TableCell>
                    <TableCell align="center" colSpan={5}>
                        Entregado
                    </TableCell>
                    <TableCell align="center" colSpan={5}>
                        Pagado
                    </TableCell>
                    <TableCell>
                        Editar
                    </TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {list.map((order) => (
                    <OrderRow order={order} key={order.id} refresh={refresh} />
                ))}
            </TableBody>
        </Table>
    )
}