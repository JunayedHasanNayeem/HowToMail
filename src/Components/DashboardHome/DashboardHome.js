import { Button, Card, Container, Typography } from '@mui/material';
import React from 'react';
import { Link } from 'react-router-dom';

const DashboardHome = () => {
    return (
        <Container>
            <Card sx={{ maxWidth: 300, p: 3 }}>
                <Typography variant="h5" component="div" sx={{textAlign: 'center', mb: 2}}>
                    Profile Search
                </Typography>
                <Link to="/dashboard/profile-search" style={{ textDecoration: 'none' }}>
                    <Button variant="contained" fullWidth>View App</Button>
                </Link>
            </Card>
        </Container>
    );
};

export default DashboardHome;