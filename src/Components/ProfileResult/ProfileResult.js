import React from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import EmailIcon from '@mui/icons-material/Email';
import BusinessIcon from '@mui/icons-material/Business';
import { CircularProgress } from '@mui/material';
import WorkIcon from '@mui/icons-material/Work';
import { Box } from '@mui/system';



const ProfileResult = (props) => {
    const profile = props.profile;
    if(!profile){
        return(
            <Box sx={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
                <CircularProgress />
            </Box>
        )
    }
    return (
        <div>
            <Card sx={{ maxWidth: 345, m: 3 }}>
                <CardHeader
                    avatar={
                        <Avatar>
                            <img src={profile.profile_pic} style={{ height: '50px', width: '50px', objectFit: 'cover' }} alt="Profile Image" />
                        </Avatar>
                    }
                    action={
                        <IconButton aria-label="add to favorites" href={profile.linkedin_url} target="_blank">
                            <LinkedInIcon />
                        </IconButton>
                    }
                    title={profile.name}
                    subheader={profile.current_employer}
                />
                {/*  <CardMedia
                    component="img"
                    image={profile.profile_pic}
                    sx={{height:'100px', width: '100px', objectFit: 'cover', borderRadius:'50%'}}
                /> */}
                <CardContent>
                    <Typography variant="body2" color="text.secondary">
                        <IconButton>
                            <WorkIcon />
                        </IconButton>{profile.current_title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        <IconButton>
                            <BusinessIcon />
                        </IconButton>{profile.location}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        <IconButton>
                            <EmailIcon />
                        </IconButton>{profile.current_personal_email}
                    </Typography>
                </CardContent>
            </Card>
        </div>
    );
};

export default ProfileResult;