import React, {useState, useEffect} from 'react';
import BillCounter from './BillCounter'

export default function BalancePage () {

    useEffect(() => {
        fetch('../api/list', ).then((response) => response.json()).then((data) => {
            console.log(data[0])
        })}, [])

    return (
        <BillCounter />
    )

}