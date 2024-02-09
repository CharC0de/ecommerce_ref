import { useState, useEffect } from 'react';
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
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { actions as authActions } from '../redux/auth';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { CircularProgress } from '@mui/material';
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
//return response()->json(['ISAUTHENTICATED' => true, 'Messsage' => 'User is Authenticated', 'data' => $data]);
// TODO remove, this demo shouldn't need to reset the theme.

const defaultTheme = createTheme();

export default function Login() {
    let authData = useSelector((state) => state.auth);
    const navigate = useNavigate()
    const [errorMsg, setErrorMsg] = useState('');
    const [isload, setLoad] = useState(false);
    const [hasUser, validUser] = useState(true);
    const [hasPass, validPass] = useState(true);
    const dispatch = useDispatch();




    useEffect(() => {
        console.log('Login', authData.userData)
        authData.userData ? navigate('/dashboard') : null
    }, [authData.userData, navigate])
    const handleSubmit = async (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        console.log();

        try {
            setLoad(true)
            let response = await axios.post('http://127.0.0.1:8000/api/login', {
                user: data.get('user'),
                password: data.get('password'),
            });
            setLoad(false)
            console.log(response)

            response.data.ISAUTHENTICATED ? dispatch(authActions.success(response.data.data)) : dispatch(authActions.failed())
            console.log('Login', authData)
            response.data.ISAUTHENTICATED ? navigate('/dashboard') : setErrorMsg(response.data.message);


        } catch (error) {
            dispatch(authActions.error(error));
            console.error(error)
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
                        Sign in
                    </Typography>
                    <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                        <TextField
                            margin="normal"
                            required={true}
                            fullWidth
                            id="user"
                            label="Email/Username"
                            name="user"

                            autoFocus
                        />
                        <TextField
                            margin="normal"
                            required={true}
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                        />
                        <FormControlLabel
                            control={<Checkbox value="remember" color="primary" />}
                            label="Remember me"
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                            disabled={isload}
                        >
                            {isload ? (
                                <CircularProgress margin="true" size={20} />
                            ) : null}  Sign In
                        </Button>
                        <Grid container>
                            <Grid item xs>
                                <Link href="#" variant="body2">
                                    Forgot password?
                                </Link>
                            </Grid>
                            <Grid item>
                                <Link href="register" variant="body2">
                                    {"Don't have an account? Sign Up"}
                                </Link>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
                <Typography variant="body2" color="#f44336" align="center">

                    {
                        errorMsg
                    }
                </Typography>
                <Copyright sx={{ mt: 8, mb: 4 }} />
            </Container>
        </ThemeProvider>
    );
}