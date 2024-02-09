import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button, Link, Container } from '@mui/material';
import { Outlet } from 'react-router-dom'

export default function Header() {

    return (
        <>
            <AppBar position="static">
                <Container maxWidth="xl">
                    <Toolbar>


                        <Typography align='left' variant="h4" component="div" sx={{ fontWeight: 700, flexGrow: 1 }}>
                            My App
                        </Typography>

                        <nav>

                            <RouterLink color="white" to="/">
                                <Button sx={{ color: "white" }}>

                                    Login

                                </Button>
                            </ RouterLink>
                            <RouterLink to="register">
                                <Button sx={{ color: "white" }}>

                                    Register
                                </Button></ RouterLink>


                        </nav>
                    </Toolbar>
                </Container>
            </AppBar>

            <Container maxWidth="lg">
                <Outlet />
            </Container>
        </>
    );
}
