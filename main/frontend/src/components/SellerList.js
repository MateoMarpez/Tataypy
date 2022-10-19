import React, { useEffect, useState } from "react";
import {ApplyFilter, getIds, getIds2} from './ApplyFilter';

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
import IconButton from '@mui/material/IconButton';
import RefreshIcon from '@mui/icons-material/Refresh';

import SellerRow from './SellerRow';

let idList = [];

export default function SellerList(props) {
    //const {filterBy = {searchTerm: '', values: []}, ...restProps } = props;
    const [list, setList] = useState(props.sellerList);
    
    //const [filterValues, setFilterValues] = useState({ids: [], values: []});
    useState(() => {
        setList(props.sellerList);
    }, [props]);
    /*
    useEffect(() => {
        fetch('api/list').then((response) => response.json()).then((data) => setList(data));
        idList = getIds(props.searchTerm);
    }, []);

    useEffect(() => {
        idList = getIds(props.filterBy.searchTerm);
        setFilterValues({ids: idList, values: props.filterBy.values})
    }, [props]);

    const refresh = () => {
        console.log('Fetching new list');
        fetch('api/list').then((response) => response.json()).then((data) => setList(data)).then(console.log('New list added '))
    }
    */
    const refresh = () => {
        props.refresh()
    }

   return (
        <div>
             <Paper sx={{ width: '100%' }}>
                <TableContainer sx={{ maxHeight: 600, width: 1300 }}>
                    <Table stickyHeader aria-label="sticky table">
                        <TableHead>
                            <TableRow>
                                <TableCell align="center" colSpan={1}>
                                    Apellido
                                </TableCell>
                                <TableCell align="center" colSpan={2}>
                                    Nombre
                                </TableCell>
                                <TableCell align="center" colSpan={3}>
                                    Grupo
                                </TableCell>
                                <TableCell>
                                    <IconButton onClick={refresh}>
                                        <RefreshIcon />
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>                            
                            {props.sellerList.map((seller) => (
                                <SellerRow seller={seller} key={seller.id} refresh={refresh} />                       
                            ))}                            
                        </TableBody>
                    </Table>
                </TableContainer>
             </Paper>
        </div>
   )

}