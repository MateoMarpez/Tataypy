import React, {useState, useEffect} from "react";
import {CreateOrder, EditOrder} from './OrderCRUD';

import TextField from '@mui/material/TextField';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import IconButton from '@mui/material/IconButton';
import SendSharpIcon from '@mui/icons-material/SendSharp';

export function CreateForm (props) {
    const [name, setName] = useState('')
    const [lastName, setLastName] = useState('')
    const [amount, setAmount] = useState('')
    const [payed, setPayed] = useState(false)
    const [delivered, setDelivered] = useState(false)

    const handleSend = () => {

        if (name.length < 3 || lastName.length < 3 || amount <= 0) {
            alert('Datos invalidos')
        }
        else {
            var order = {
                name: name, last_name: lastName, amount: amount,
                delivered: delivered, payed: payed,
                id: props.id,
            };          
            props.closeModal();
            var newOrder = CreateOrder(order);
            //props.addOrder(newOrder)
            props.refresh()
        }
    }

    return (
        <React.Fragment>
            <TextField value={name} onChange={(event) => {                        
                        setName(event.target.value);
                    }} onKeyPress={(e) => {
                        if (e.key === "Enter") {
                            e.preventDefault();
                        }
                    }}
                    
                    id="name-box" label="Nombre" variant="filled" />

            <TextField value={lastName} onChange={(event) => {
                        setLastName(event.target.value);
                    }} onKeyPress={(e) => {
                        if (e.key === "Enter") {
                            e.preventDefault();
                        }
                    }}
                    
                    id="last-name-box" label="Apellido" variant="filled" />

            <TextField value={amount} onChange={(event) => {                        
                        setAmount(event.target.value);
                    }} onKeyPress={(e) => {
                        if (e.key === "Enter") {
                            e.preventDefault();
                        }
                    }}
                    
                    id="last-name-box" label="Porciones" variant="filled" type="number" />

            <FormGroup row={false}>
                <FormControlLabel control={<Switch onChange={(e) => {setPayed(e.target.checked)}} />} label="Pagado" />
                <FormControlLabel control={<Switch onChange={(e) => {setDelivered(e.target.checked)}} />} label="Entregado" />
            </FormGroup>
            <IconButton onClick={handleSend}>
                <SendSharpIcon />
            </IconButton>
        </React.Fragment>  
    )
}

export function EditForm (props) {
    const [amount, setAmount] = useState(props.order.amount)
    const [payed, setPayed] = useState(props.order.payed)
    const [delivered, setDelivered] = useState(props.order.delivered)

    const handleSend = () => {
        if (amount <= 0) {
            alert('Datos invalidos')
        }
        else {
            var order = {
                amount: amount,
                delivered: delivered, payed: payed,
                id: props.order.id,
            };          
            props.closeModal();
            var newOrder = EditOrder(order);
            console.log(newOrder)
            props.newOrder(newOrder)
        }

        

    }

    return (
        <React.Fragment>
            <TextField disabled id="name-box" label="Nombre" variant="filled" defaultValue={props.order.name} />

            <TextField disabled id="last-name-box" label="Apellido" variant="filled" defaultValue={props.order.last_name} />

            <TextField value={amount} defaultValue={props.order.amount} onChange={(event) => {
                        setAmount(event.target.value);
                    }} onKeyPress={(e) => {
                        if (e.key === "Enter") {
                            e.preventDefault();
                        }
                    }}
                    
                    id="amount-box" label="Porciones" variant="filled" type="number" />

            <FormGroup row={false}>
                <FormControlLabel control={<Switch onChange={(e) => {setPayed(e.target.checked)}} defaultChecked={payed} />} label="Pagado" />
                <FormControlLabel control={<Switch onChange={(e) => {setDelivered(e.target.checked)}} defaultChecked={delivered} />} label="Entregado" />
            </FormGroup>
            <IconButton onClick={handleSend}>
                <SendSharpIcon />
            </IconButton>
        </React.Fragment>  
    )
}