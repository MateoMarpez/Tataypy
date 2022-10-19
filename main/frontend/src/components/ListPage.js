import React, { useEffect, useState } from "react";
import SellerList from './SellerList';
import FilterBar from './FilterBar';
import OrderList from './OrderList';
import { ApplyFilter, getIds, getIdsOrder } from "./ApplyFilter";

import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import RefreshIcon from '@mui/icons-material/Refresh';


function TabPanel(props) {
    const { children, value, index, ...other } = props;
  
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box sx={{ p: 3 }}>
            <Typography>{children}</Typography>
          </Box>
        )}
      </div>
    );
  }

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
  };

function a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    };
}



export default function ListPage() {
    const [initSellerList, setInitSellerList] = useState([]);
    const [initOrderList, setInitOrderList] = useState([]);
    const [sellerList, setSellerList] = useState([]);
    const [orderList, setOrderList] = useState([]);

    const [filterValues, setFilterValues] = useState({searchTerm: '', values: []});

    const [value, setValue] = useState(0);

    //Initial fetch of Seller and Order lists
    useEffect(() => {
      fetch('api/list').then((response) => response.json()).then((data) => {
        setInitSellerList(data);
        setSellerList(data)
      });
      fetch('api/order-list').then((response) => response.json()).then((data) => {
        data.forEach((order) => {
          order.group = order.seller.group
        })
        setInitOrderList(data);
        setOrderList(data);
      });
    }, []);

    useEffect(() => {
      const sellerIds = getIds(filterValues.searchTerm);
      const sellerFilters = {ids: sellerIds, values: filterValues.values };
      const newSellerList = ApplyFilter(initSellerList, sellerFilters);
      setSellerList(newSellerList);
    }, [filterValues, initSellerList])

    useEffect(() => {
      const orderIds = getIdsOrder(filterValues.searchTerm);
      const orderFilters = {ids: orderIds, values: filterValues.values };
      const newOrderList = ApplyFilter(initOrderList, orderFilters);
      setOrderList(newOrderList);
    }, [filterValues, initOrderList])

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    

    function addFilter(newFilter) { 
        console.log(newFilter);
        setFilterValues({searchTerm: newFilter.searchTerm, values: newFilter.values});
    }

    function refresh() {
      console.log('Refreshing... nah just kidding')
      fetch('api/list').then((response) => response.json()).then((data) => {
        setInitSellerList(data)
      });
      fetch('api/order-list').then((response) => response.json()).then((data) => {
        setInitOrderList(data)
      });
    }
    
    return (

        <Box sx={{ width: '100%' }}>
            <Grid container spacing={12} >
                <Grid item xs={8}>
                    <FilterBar addFilter={addFilter} />
                </Grid>
                <Grid item xs={4} >
                    <Box sx={{ borderBottom: 1, borderColor: 'divider'}}>
                    <IconButton onClick={refresh}>
                            <RefreshIcon />
                        </IconButton>
                        <Tabs value={value} onChange={handleChange} >
                            <Tab label="Vendedores" {...a11yProps(0)} />
                            <Tab label="Compradores" {...a11yProps(1)} />                        
                        </Tabs>
                        
                    </Box>
                </Grid>
            </Grid>
            <TabPanel value={value} index={0}>
              {console.log('From List Page: ', sellerList)}
              <SellerList sellerList={sellerList} refresh={refresh} />                
            </TabPanel>
            <TabPanel value={value} index={1}>
                <OrderList orderList={orderList} refresh={refresh} />
            </TabPanel>
        </Box>
    );
    
}