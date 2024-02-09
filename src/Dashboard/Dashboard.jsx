
import CssBaseline from '@mui/material/CssBaseline';

import { createTheme, ThemeProvider } from '@mui/material/styles';

import { Route } from 'react-router-dom';
import Header from './Components/Header';
import Main from './Components/Main';
import { useSelector } from 'react-redux';
import { Routes, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import Users from './Admin/Users';

import AuthRoute from '../util/authRoute';
import AdminRoute from '../util/adminRoute';
import Register from '../Auth/Register';
import Products from './Admin/Products';



// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();


export default function Dashboard() {
    const navigate = useNavigate()
    let authData = useSelector((state) => state.auth);
    useEffect(() => {
        console.log('Dashboard', authData.userData)
        !authData.userData ? navigate('/') : null
    }, [authData.userData, navigate])



    return (
        <ThemeProvider theme={defaultTheme}>
            <CssBaseline />
            <Routes>
                <Route path='' element={<Header />}>
                    <Route index element={<Main />} />

                    <Route path='userAdmin' element={
                        <AuthRoute>
                            <AdminRoute>
                                <Users />
                            </AdminRoute>
                        </AuthRoute>} />
                    <Route path='edit-user-data' element={<AuthRoute><AdminRoute><Register /></AdminRoute></AuthRoute>} />
                    <Route path='productAdmin' element={<AuthRoute><AdminRoute><Products /></AdminRoute></AuthRoute>} />



                </Route>
            </Routes>

        </ThemeProvider>
    );
}