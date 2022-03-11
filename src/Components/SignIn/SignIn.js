import React, { useState } from 'react';
import { Alert, Button, Container, Paper, TextField, Typography } from '@mui/material';
import useAuth from '../../Hooks/useAuth';
import { Link, useLocation, useHistory } from 'react-router-dom';
import { Box } from '@mui/system';
const SignIn = () => {
    const { signInUsingGoogle, signInUsingEmail, errorMessage } = useAuth()
    //User redirect to their specific URL
    const history = useHistory();
    const location = useLocation()
    const redirect_uri = location.state?.from || '/dashboard';
    //Google sign in
    const handleSignInUsingGoogle = () => {
        signInUsingGoogle(redirect_uri, history)
    }

    const [email, setEmail] = useState({})
    const [password, setPassword] = useState({})

    const handleEmail = (event) => {
        setEmail(event.target.value)
    }
    const handlePassword = (event) => {
        setPassword(event.target.value)
    }
    //Email Sign In
    const handleSignInUsingEmail = () => {
        signInUsingEmail(email, password, redirect_uri, history)
    }

    return (
        <Box>
            <Container>
                <Paper elevation={3} sx={{ maxWidth: "400px", p: 4, mt: 5, mx: 'auto' }}>
                    <Typography variant="h4" component="h2">
                        Sign In
                    </Typography>
                    {errorMessage && <Alert sx={{ mt: 3 }} severity="error">{errorMessage}</Alert>}
                    <TextField id="standard-basic" label="Email" fullWidth sx={{ display: 'block', my: 2 }} variant="standard" type="email" onBlur={handleEmail} />
                    <TextField id="standard-basic" label="Password" fullWidth sx={{ display: 'block', my: 2 }} variant="standard" type="password" onBlur={handlePassword} />
                    <Button variant="contained" size="large" sx={{ display: 'block', width: '100%', mt: 4, mb: 2 }} onClick={handleSignInUsingEmail}>Sign In</Button>
                    <span className="border-bottom"></span>
                    <Button variant="outlined" size="large" sx={{ display: 'block', width: '100%' }} onClick={handleSignInUsingGoogle}>Continue with Google</Button>
                    <p className="mt-3">New here? <Button><Link to="/sign-up" style={{ textDecoration: 'none' }}>Sign Up</Link></Button> </p>
                </Paper>
            </Container>
        </Box>
    );
};

export default SignIn;