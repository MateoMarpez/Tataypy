import React, { Component } from "react";
import DatePicker from '@mui/x-date-pickers/DatePicker';
import UploadFile from './UploadFile';

export default class CreateSale extends Component {
    constructor(props) {
        super(props); 
    }
    
    render() {
        return (
            // Ingresar fecha
            // Precio Porcion
            // Upload File
            <div>
                <h1>HEY HEY!</h1>
                <UploadFile />
            </div>
        );           
    }
}