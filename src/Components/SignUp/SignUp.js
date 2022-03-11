import React, { useState } from 'react';
import useAuth from '../../Hooks/useAuth';
import { Link, useLocation, useHistory } from 'react-router-dom';
import { Container, Paper, TextField, Typography, Button, Alert } from '@mui/material';
import { Box } from '@mui/system';

const SignUp = () => {
    const { signInUsingGoogle, signUpUsingEmail, errorMessage } = useAuth()

    const [email, setEmail] = useState({})
    const [password, setPassword] = useState({})
    const [fullName, setFullName] = useState({})
    //User redirect to their specific URL
    const history = useHistory();
    const location = useLocation()
    const redirect_uri = location.state?.from || '/dashboard';
    //Google sign in
    const handleSignUpUsingGoogle = () => {
        signInUsingGoogle(redirect_uri, history)
    }

    const handleEmail = (event) => {
        setEmail(event.target.value)
    }
    const handlePassword = (event) => {
        setPassword(event.target.value)
    }

    //Email Sign up
    const handleSignUpUsingEmail = () => {
        signUpUsingEmail(email, password, fullName, redirect_uri, history)
    }

    const handleFullName = (event) => {
        setFullName(event.target.value)
    }
    return (
        <Box>
            <Container>
                <Paper elevation={3} sx={{ maxWidth: "400px", p: 4, mt: 5, mx: 'auto' }}>
                    <Typography variant="h4" component="h2">
                        Sign Up
                    </Typography>

                    {errorMessage && <Alert sx={{ mt: 3 }} severity="error">{errorMessage}</Alert>}

                    <TextField label="Full Name" fullWidth sx={{ display: 'block', my: 2 }} variant="standard" type="text" onBlur={handleFullName} />

                    <TextField label="Email Address" fullWidth sx={{ display: 'block', my: 2 }} variant="standard" type="email" onBlur={handleEmail} />

                    <TextField label="Password" fullWidth sx={{ display: 'block', my: 2 }} variant="standard" type="password" onBlur={handlePassword} />

                    <Button variant="contained" size="large" sx={{ display: 'block', width: '100%', mt: 4, mb: 2 }} onClick={handleSignUpUsingEmail}>Sign Up</Button>

                    <span className="border-bottom"></span>
                    <Button variant="outlined" size="large" sx={{ display: 'block', width: '100%' }} onClick={handleSignUpUsingGoogle}>Continue with Google</Button>
                    <p className="mt-3">Already have an account? <Button><Link to="/sign-in" style={{ textDecoration: 'none' }}>Sign In</Link></Button> </p>
                </Paper>
            </Container>
        </Box>


    );
};

export default SignUp;