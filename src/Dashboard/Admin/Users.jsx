import React, { useEffect, useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { fetchData as fetchUserData, deleteData as deleteUserData } from '../../redux/admin/userActions';
import { IconButton } from '@mui/material';
import { Delete, Update, Edit } from '@mui/icons-material';
import { CircularProgress } from '@mui/material';
import { TextField } from '@mui/material';
import { Select } from '@mui/material';
import { MenuItem } from '@mui/material';

//['Message'=>'GET users is successful', 'users'=>$users]
const Users = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    let userAdmin = useSelector((state) => state.userAdmin)
    let user = useSelector((state) => state.auth)


    useEffect(() => {

        let privelege = user.userData.privelege
        if (privelege !== 'admin') {
            navigate('/dashboard')
        }
        console.log('user state', userAdmin)
        if (userAdmin.write.isChanged) {

            dispatch(fetchUserData())
            console.log('changed??', userAdmin.users)
        }

    }, [userAdmin, navigate, dispatch, user.userData.privelege])
    console.log('data', userAdmin)
    return (
        <TableContainer component={Paper}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>ID</TableCell>
                        <TableCell>Name</TableCell>
                        <TableCell>Email</TableCell>
                        <TableCell>Privelege</TableCell>
                        <TableCell>Actions</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {userAdmin.users ? userAdmin.users.map((user) => (
                        <TableRow key={user.id}>
                            <TableCell>{user.id}</TableCell>
                            <TableCell>{user.name}</TableCell>
                            <TableCell>{user.email}</TableCell>
                            <TableCell>{user.privelege}</TableCell>
                            <TableCell><IconButton onClick={() => {

                                dispatch(deleteUserData(user.id))

                            }
                            }>
                                {
                                    userAdmin.write.isChanged && userAdmin.write.id == user.id ? <CircularProgress /> : <Delete />
                                } </IconButton>
                                <Link to={
                                    `/dashboard/edit-user-data?id=${user.id}&name=${user.name}&email=${user.email}&privelege=${user.privelege}`
                                } >
                                    <IconButton >
                                        <Edit />
                                    </IconButton>
                                </Link>
                            </TableCell>
                        </TableRow>
                    )) : null}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default Users;