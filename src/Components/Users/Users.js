import { Button, Card, CircularProgress, Container, Grid, TextField, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React, { useEffect, useRef, useState } from 'react';
import useAuth from '../../Hooks/useAuth';

const Users = () => {
    const { user } = useAuth()
    const [users, setUsers] = useState([]);
    const [clicked, setClicked] = useState(0)
    const [usersLoading, setusersLoading] = useState(true);
    useEffect(() => {
        fetch('https://howtomail.herokuapp.com/users')
            .then(res => res.json())
            .then(data => {
                setUsers(data)
                console.log(data)
                setusersLoading(false)
            });

    }, [clicked])

    const creditsRef = useRef()
    const handleAddCredits = (userEmail) => {
        const creditsData = {
            credits: creditsRef.current.value,
            email: userEmail
        };
        fetch('https://howtomail.herokuapp.com/users/add-credits', {
            method: 'PUT',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(creditsData)
        })
        .then(res => res.json())
        .then(data => setClicked(data.currentCredits))

        alert("Credits added successfully!")
        document.addCreditsForm.reset()

    }
        //Conditional Spinner
        if (usersLoading) {
            return (
                <Box sx={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
                    <CircularProgress />
                </Box>
            )
    
        }

    return (
        <Container>
            <Typography variant="h4" sx={{ mb: 4, textAlign: 'center' }}>
                Manage Users
            </Typography>
            {
                users.map(user =>
                    <Card variant="outlined" sx={{ mb: 1 }} >
                        <Grid container columns={{ xs: 6, md: 12 }} sx={{ p: 2 }}>
                            <Grid item xs={6} md={6}>
                                <Typography variant="h6" component="div">
                                    {user.displayName}
                                </Typography>
                                <Typography sx={{ fontSize: 14 }} color="text.secondary">
                                    {user.email}
                                </Typography>
                            </Grid>
                            <Grid item xs={6} md={2} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                <Typography sx={{ fontSize: 14 }} color="text.secondary">
                                    <b>Registered on:</b> {user.creationTime}
                                </Typography>
                            </Grid>
                            <Grid xs={6} md={4} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'end' }}>
                                <span style={{marginRight: '10px'}}>
                                    Credits: {user?.credits}
                                </span>
                                <form name="addCreditsForm" onSubmit={() => {handleAddCredits(user.email)}}>
                                    <TextField
                                        sx={{ m: 1, width: '12ch' }}
                                        label="Credits"
                                        type="number"
                                        size="small"
                                        inputRef={creditsRef}
                                    />
                                    <Button variant="outlined" type="submit" sx={{ padding: '30px, 20px', marginTop: '10px' }}> Add </Button>
                                </form>

                            </Grid>
                        </Grid>
                    </Card>
                )
            }
        </Container >
    );
};

export default Users;