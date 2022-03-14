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
import { Link, useHistory } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import agent from '../api/agent';
import { useDispatch } from 'react-redux';
import { signInUser } from '../store/slices/accountSlice';
import { Alert, AlertTitle, List, ListItem, ListItemText } from '@mui/material';

const theme = createTheme();

export default function Register() {


    const [validationError, setValidationError] = React.useState([])
    const history = useHistory();
    const dispatch = useDispatch();
    const { register, handleSubmit, formState:{isSubmitting, errors, isValid} }  = useForm({
    mode:'all'
    });


return (
    <ThemeProvider theme={theme}>
    <Container component="main" maxWidth="xs">
        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
            Sign Up
        </Typography>
        <Box component="form"
            onSubmit={
                handleSubmit(data => 
                    agent.Account.register(data)
                    .catch(error => {setValidationError(error); console.log(error)})
                    )
            
            } 
            noValidate sx={{ mt: 1 }}>
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
            label="Email"
            {...register('email', {required: "Email is required"})}
            error={!!errors.email}
            helperText ={ errors?.email?.message}
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
            

            {
                validationError.length>0 && 
                <Alert severity='error'>
                    <AlertTitle>Validation Error</AlertTitle>
                    <List>
                        {
                            validationError.map(
                                error=>(
                                    <ListItem key={error}>
                                        <ListItemText>{error}</ListItemText>
                                    </ListItem>
                                )
                            )
                        }
                    </List>
                </Alert>
            }

            <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            disabled={!isValid || isSubmitting}
            >
            Sign Up
            </Button>
            <Grid container>
            <Grid item>
                <Link to="/login">
                {"have an account? Sign In"}
                </Link>
            </Grid>
            </Grid>
        </Box>
    </Container>
    </ThemeProvider>
);
}