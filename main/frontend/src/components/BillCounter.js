import React, {useState, useEffect} from 'react';

import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

export default function BillCounter (porps) {


    return (
        <Box>
            <Typography variant="h6" >
                <p>$10: <TextField type="number" /> </p>
                <p>$100: <TextField type="number" /></p>
                <p>$200: <TextField type="number" /></p>
                <p>$500: <TextField type="number" /></p>
                <p>$1000: <TextField type="number" /></p>
            </Typography>
        </Box>
    )
}