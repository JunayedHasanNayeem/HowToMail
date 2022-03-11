import { Box, Button, CircularProgress, Container, TextField, Typography } from '@mui/material';
import React, { useEffect, useRef, useState } from 'react';
import ProfileResult from '../ProfileResult/ProfileResult';
import './ProfileSearch.css';


const ProfileSearch = () => {
    const profileNameRef = useRef();
    const companyNameRef = useRef();
    const rocketReachApi = 'a27bdbk41e980a36862fdbb403b4df6472ef915';
    const [profiles, setProfiles] = useState([])


    const handleProfileSearch = (e) => {
        const searchInfo = {
            profileName: profileNameRef.current.value,
            companyName: companyNameRef.current.value
        }
        fetch('https://howtomail.herokuapp.com/search-result', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(searchInfo)
        }).then(res => res.json())
            .then(data => setProfiles([data]))
        e.preventDefault()
    }
    return (
        <div>
            <div className="profile-search-bar-container">
                <Container className="profile-search-bar">
                    <Typography variant="h4" component="h1" gutterBottom sx={{ fontWeight: 600, mb: 2 }}>
                        Find anyone's professioal information in seconds
                    </Typography><br/>
                    <form onSubmit={handleProfileSearch} name="profileSearchForm">
                        <TextField
                            sx={{ m: 1 }}
                            id="outlined-password-input"
                            label="Full Name"
                            type="text"
                            inputRef={profileNameRef}
                        />
                        <TextField
                            sx={{ m: 1 }}
                            id="outlined-password-input"
                            label="Company Name"
                            type="text"
                            inputRef={companyNameRef}
                        />
                        <Button variant="contained" type="submit" sx={{ py: 2, px: 4, m: 1 }}>
                            Search
                        </Button>
                    </form>
                </Container>
            </div>
            <Container>
                {
                    profiles.map(profile => <ProfileResult profile={profile} key={profile.id}></ProfileResult>)
                }
            </Container>
        </div>
    );
};

export default ProfileSearch;