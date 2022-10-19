import React, {useState, useEffect} from "react";
import {PayOrder, DeliverOrder} from './OrderCRUD'
import Button from '@mui/material/Button';
import { MuiThemeProvider, createTheme } from '@mui/material/styles';
import { red } from "@mui/material/colors";

function OrderButton (props) {
    const {type = "", ...restProps } = props;
    const handleClick = () => {
        props.handleClick()
    }
    return <Button color={props.color} variant={props.variant} onClick={handleClick} >{props.type}</Button>
}

export function PayButton (props) {
    const [color, setColor] = useState('primary');
    const [btnProps, setBtnProps] = useState({color:'primary', type:'Pagar', variant:'outlined'});

    const handleClick = () => {
        PayOrder(props.order);
        const newOrder = props.order;
        newOrder.payed = !props.order.payed;
        props.newOrder(newOrder);
        props.refresh();
    }

    useEffect(() => {
        if (props.order.payed == true) {
            setBtnProps({color:'success', type:'Pagado', variant:'contained'})
        }
    }, [])

    useEffect(() => {
        if (props.order.payed == true) {
            setBtnProps({color:'success', type:'Pagado', variant:'contained'})
        } else {
            setBtnProps({color:'primary', type:'Pagar', variant:'outlined'})
        }
    }, [props])

    return (
        <OrderButton type={btnProps.type} color={btnProps.color} variant={btnProps.variant} handleClick={handleClick} />
    )
    
}

export function DeliverButton (props) {
    const [btnProps, setBtnProps] = useState({color:'primary', type:'Entregar', variant:'outlined'});

    const handleClick = () => {
        DeliverOrder(props.order);
        const newOrder = props.order;
        newOrder.delivered = !props.order.delivered;
        props.newOrder(newOrder);
        props.refresh();
    }

    useEffect(() => {
        if (props.order.delivered == true) {
            setBtnProps({color:'success', type:'Entregado', variant:'contained'})
        } 
    }, [])

    useEffect(() => {
        if (props.order.delivered == true) {
            setBtnProps({color:'success', type:'Entregado', variant:'contained'})
        } else {
            setBtnProps({color:'primary', type:'Entregar', variant:'outlined'})
        }
    }, [props])

    return (
        <OrderButton type={btnProps.type} color={btnProps.color} variant={btnProps.variant} handleClick={handleClick} />
    )
    
}