import '../App.css';
import Header from './Header';
import Info from './Info';
import React, { useState } from 'react';
import Container from '@mui/material/Container';


function ClassDetail() {
    return (
        <>
            <Header />
            <Container maxWidth="md">
                <Info />
            </Container>

        </>
    );
}

export default ClassDetail;
