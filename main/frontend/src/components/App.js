import React, { Component } from "react";
import { render } from "react-dom";
import { BrowserRouter as Router, Routes, Route, Link, Redirect } from "react-router-dom";
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';

//import Menu from './Menu';
import CreateSale from './CreateSale';
import ListPage from './ListPage';
import BalancePage from './BalancePage'
import UploadFile from './UploadFile';
//import ListPage from './ListPage';
//import Stats from './Stats';

export default class App extends Component {
    constructor(props) {
        super(props); 
    }
        
    render() {
        return (
            <Router>
                <Routes>
                    <Route exact path='/'>I CRY</Route>
                    <Route exact path='/create-sale' element={<CreateSale />} />
                    <Route exact path='/list' element={<ListPage />} />
                    <Route exact path='/balance' element={<BalancePage />} />
                </Routes>
            </Router>
            
        );        
    }
}

const appDiv = document.getElementById("app");
render(<App />, appDiv); 