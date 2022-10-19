import React, {useState, useEffect} from "react";
import $ from 'jquery';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import Grid from '@mui/material/Grid';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import ClearIcon from '@mui/icons-material/Clear';

//<FormControlLabel control={<Switch value={'MANADA'} onChange={(event) => props.onChange(event.target.value)} />} label="Manada" />

let filterValues = [];
let idList = [];
let searchTerm = "";
let didWork = false;

export default function FilterBar(props) {

    const [searchBox, setSearchBox] = useState('');

    useEffect(()=> {
        console.log('Filter has re-rendered.')
    });

    function addFilter(e) {
        const newFilter = e.target.value;
        const checked = e.target.checked;
        setSearchBox(searchTerm);

        if (checked) {
            filterValues.push(newFilter);
        }
        else {
            filterValues = filterValues.filter((value) => value !== newFilter);
        }

        props.addFilter({searchTerm: searchTerm, values: filterValues});
    }

    function addSearch (newSearch) {
        searchTerm = newSearch;
        props.addFilter({searchTerm: newSearch, values: filterValues});
    }

    const  cleanSearch = (e) => {
        console.log('Cleaning Search...');
        setSearchBox("");
        console.log('Previous Search Term: ', searchTerm)
        searchTerm = ("");
        console.log('New Search Term: ', searchTerm);
        didWork = false
        console.log('Trying add search...', didWork);
        addSearch();
        console.log('Checking if worked...', didWork);
    }
    
    return (
        <Box
            component="form"
            sx={{
                '& > :not(style)': { m: 0 },
            }}
            noValidate
            autoComplete="off"
            >
            <Grid container spacing={12} >
                <Grid item xs={3}>
                    <TextField value={searchBox} onChange={(event) => {
                        setSearchBox(event.target.value);
                    }} onKeyPress={(e) => {
                        if (e.key === "Enter") {
                            e.preventDefault();
                            addSearch(searchBox);
                        }
                    }}
                    InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton onClick={cleanSearch} >
                                <ClearIcon />
                            </IconButton>
                          </InputAdornment>
                        ),
                      }}
                    id="search-bar" label="Buscar" variant="outlined" />
                    
                </Grid>
                <Grid item xs={9} >
                    <FormGroup row={true}>
                        <FormControlLabel control={<Switch value={'FILTER_1'} onChange={(e) => addFilter(e)} />} label="Filter One" />
                        <FormControlLabel  control={<Switch value={'FILTER_2'} onChange={(e) => addFilter(e)} />} label="Filter Two" />
                        <FormControlLabel control={<Switch value={'FILTER_3'} onChange={(e) => addFilter(e)} />} label="Filter Three" />
                        <FormControlLabel  control={<Switch value={'FILTER_4' } onChange={(e) => addFilter(e)} />} label="Filter Four" />
                    </FormGroup>
                        
                </Grid>
            </Grid>
            
            
            
            
        </Box>
    )
}