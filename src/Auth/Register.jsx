import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useState } from 'react';
import axios from 'axios';
import { CircularProgress } from '@mui/material'
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { updateData } from '../redux/admin/userActions';

function Copyright(props) {
    return (
        <Typography variant="body2" color="text.secondary" align="center" {...props}>
            {'Copyright © '}
            <Link color="inherit" href="https://mui.com/">
                Your Website
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

// TODO remove, this demo shouldn't need to reset the theme.
//`/edit-user-data?id=${user.id}&name=${user.name}&email=${user.email}&userprivelege=${user.privelege}`

const defaultTheme = createTheme();

export default function Register() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const location = useLocation()
    const userData = new URLSearchParams(location.search)
    const id = userData.get('id')
    const serverError = userData.get('error')


    const [privelege, setPrivelege] = useState(userData.get('privelege') && userData.get('privelege'))
    const [isLoad, setLoad] = useState(false);
    const [passMatch, setMatch] = useState(false);
    const [nameDupe, setNameDupe] = useState(false);
    const [emailDupe, setEmailDupe] = useState(false);
    const [error, setError] = useState(serverError !== undefined && serverError !== null);
    const [successMsg, setSuccessMsg] = useState('');
    const [errorMsg, setErrorMsg] = useState('');
    let [form, setForm] = useState({
        name: userData.get('name'),
        email: userData.get('email'),
        privelege: userData.get('privelege'),

    })

    React.useEffect(
        () =>
            serverError ? setErrorMsg('A Problem has occurred during update') : setErrorMsg('')
        , [serverError]
    )
    const handleChange = (event) => {
        setForm({
            ...form, [
                event.target.id ?
                    event.target.id :
                    event.target.name
            ]: event.target.value
        })
        console.log(form)
    }
    const handleSubmit = async (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);

        const reset = () => {
            setLoad(false)
            setError(false)
            setErrorMsg('')
            setMatch(false)
            setNameDupe(false)
            setEmailDupe(false)
        }
        if (data.get('confirm_password') == data.get('password')) {

            setMatch(false)
            if (!id) {
                try {
                    console.log(
                        {
                            name: data.get('username'),
                            email: data.get('email'),
                            password: data.get('password'),
                        }
                    );
                    setLoad(true)

                    let response = await axios.post('http://127.0.0.1:8000/api/register', {
                        name: data.get('username'),
                        email: data.get('email'),
                        password: data.get('password'),
                    }

                    )
                    reset
                    console.log(response.data);
                    if (response.data.SUCCESS) {
                        setSuccessMsg('Registation Success!!')
                        console.log(response.data);
                        event.target.reset();
                        reset
                    }
                    if (response.data.UNAMETAKEN) {
                        setNameDupe(true)
                    }
                    if (response.data.EMAILTAKEN) {
                        setEmailDupe(true)
                    }

                } catch (error) {
                    setError(true)
                    setErrorMsg('A Problem has occurred during register')
                    console.error(error)
                    setLoad(false)
                }
            }
            else {
                setLoad(true)
                dispatch(updateData(id, {
                    name: data.get('username'),
                    email: data.get('email'),
                    password: data.get('password'),
                    privelege: data.get('privelege')
                }, navigate, location))

                console.log({
                    name: data.get('username'),
                    email: data.get('email'),
                    password: data.get('password'),
                    privelege: data.get('privelege')
                })
                reset
            }

        }
        else {
            console.log({
                password: data.get('confirm_password'),
            });
            setMatch(true)
        }

    };

    return (
        <ThemeProvider theme={defaultTheme}>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        {id ? "Update" : "Sign up"}
                    </Typography>
                    <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                {id ? (<TextField
                                    required
                                    value={form.name}
                                    onChange={handleChange}
                                    fullWidth
                                    id="username"
                                    label="Username"
                                    name="username"
                                    error={nameDupe}
                                    helperText={nameDupe && 'Username is Already Taken'}

                                />) : (<TextField
                                    required
                                    fullWidth
                                    id="username"
                                    label="Username"
                                    name="username"
                                    error={nameDupe}
                                    helperText={nameDupe && 'Username is Already Taken'}

                                />)}
                            </Grid>
                            <Grid item xs={12}>
                                {id ? (<TextField
                                    onChange={handleChange}
                                    value={form.email}
                                    required
                                    fullWidth
                                    id="email"
                                    label="Email Address"
                                    name="email"
                                    autoComplete="email"
                                    error={emailDupe && 'Email is Already Taken'}
                                />) : (<TextField
                                    required
                                    fullWidth
                                    id="email"
                                    label="Email Address"
                                    name="email"
                                    autoComplete="email"
                                    error={emailDupe && 'Email is Already Taken'}
                                />)}
                            </Grid>
                            {id ? (<Grid item xs={12}>
                                <Select fullWidth onChange={handleChange} value={form.privelege} name='privelege' id='privelege' label='privelege'>
                                    <MenuItem className='privelege' value='regular'>
                                        regular
                                    </MenuItem>
                                    <MenuItem className='privelege' value='admin'>
                                        admin
                                    </MenuItem>
                                </Select>
                            </Grid>) : null}
                            <Grid item xs={12}>
                                <TextField
                                    onChange={id ? handleChange : null}
                                    required
                                    fullWidth
                                    name="password"
                                    label={"New password"}
                                    type="password"
                                    id="password"
                                    autoComplete="new-password"
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    onChange={id ? handleChange : null}
                                    required
                                    fullWidth
                                    name="confirm_password"
                                    label={id ? "Confirm New Password" : "Confirm Password"}
                                    type="password"
                                    id="confirm_password"
                                    error={passMatch}
                                    helperText={passMatch && 'Passwords do not match'}

                                />
                            </Grid>

                        </Grid>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}

                            disabled={isLoad}
                        >
                            {isLoad ? (
                                <CircularProgress margin="true" size={20} />
                            ) : id ? "Update User" : 'Sign Up'}

                        </Button>
                        <Grid container justifyContent="flex-end">
                            <Grid item>
                                {id ? null : (<Link href="/" variant="body2">
                                    Already have an account? Sign in
                                </Link>)}
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
                <Typography variant="body2" color={error ? "#f44336" : "#4caf50"} align="center">
                    {
                        successMsg
                    }
                    {
                        errorMsg
                    }
                </Typography>
                <Copyright sx={{ mt: 5 }} />
            </Container>
        </ThemeProvider>
    );
}