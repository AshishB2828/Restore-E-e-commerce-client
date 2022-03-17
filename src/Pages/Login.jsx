import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';

import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Link, useHistory, useLocation } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import agent from '../api/agent';
import { useDispatch } from 'react-redux';
import { signInUser } from '../store/slices/accountSlice';

const theme = createTheme();

export default function Login() {


    const history = useHistory();
    const dispatch = useDispatch();
    const location = useLocation();
    const { register, handleSubmit, formState:{isSubmitting, errors, isValid} }  = useForm({
    mode:'all'
    });

async function submitForm(data){

    try {
        await dispatch(signInUser(data));
        history.push( location.state?.from.pathname || '/catalog')
    } catch (error) {
        console.log(error)
    }

}

return (
    <ThemeProvider theme={theme}>
    <Container component="main" maxWidth="xs">
        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
            Sign in
        </Typography>
        <Box component="form" onSubmit={handleSubmit(submitForm)} noValidate sx={{ mt: 1 }}>
            <TextField
            margin="normal"
            required
            fullWidth
            label="Username"
            autoFocus
            {...register('username', {required: "Username is required"})}
            error={!!errors.username}
            helperText ={ errors?.username?.message}
            />
            <TextField
            margin="normal"
            required
            fullWidth
            {...register('password', {required: 'Password required'})}
            label="Password"
            type="password"
            error={!!errors.password}
            helperText ={ errors?.password?.message}
            
            />
            
            <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            disabled={!isValid || isSubmitting}
            >
            Sign In
            </Button>
            <Grid container>
            <Grid item>
                <Link to="/register">
                {"Don't have an account? Sign Up"}
                </Link>
            </Grid>
            </Grid>
        </Box>
    </Container>
    </ThemeProvider>
);
}