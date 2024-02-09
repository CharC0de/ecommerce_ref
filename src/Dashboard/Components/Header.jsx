import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { actions as authActions } from '../../redux/auth';
import { actions as userAdminActions } from '../../redux/admin/user';
import { actions as productAdminActions } from '../../redux/admin/product';
import { useEffect } from 'react';
export default function Header() {
    const authData = useSelector((state) => state.auth);
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const handleLogout = (event) => {
        dispatch(authActions.logout())
        dispatch(userAdminActions.reset())
        dispatch(productAdminActions.reset())
        navigate('/')
    }

    return (
        <>
            <AppBar position="relative">
                <Toolbar sx={{ justifyContent: 'space-between' }}>
                    <Typography variant="h6" color="inherit" noWrap>
                        Hello! {authData.userData && authData.userData.name}
                    </Typography>
                    <nav>
                        <Button onClick={handleLogout} sx={{
                            color: "white"
                        }}>
                            Logout
                        </Button>
                        {
                            authData.userData && authData.userData.privelege == 'admin' ? (
                                <>
                                    <Link to='userAdmin'>
                                        <Button sx={{
                                            color: "white"
                                        }}>
                                            Users
                                        </Button>
                                    </Link>
                                    <Link to='productAdmin'>
                                        <Button sx={{
                                            color: "white"
                                        }}>
                                            Products
                                        </Button>
                                    </Link>



                                </>
                            ) : null
                        }
                    </nav>
                </Toolbar>
            </AppBar>
            <Outlet />
        </>

    )
}