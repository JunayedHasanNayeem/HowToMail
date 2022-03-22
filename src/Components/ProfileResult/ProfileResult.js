import React, { useState } from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import EmailIcon from '@mui/icons-material/Email';
import BusinessIcon from '@mui/icons-material/Business';
import { Button, CircularProgress, Divider, Grid } from '@mui/material';
import BusinessCenterIcon from '@mui/icons-material/BusinessCenter';
import { Box } from '@mui/system';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';

import FacebookOutlinedIcon from '@mui/icons-material/FacebookOutlined';
import InstagramIcon from '@mui/icons-material/Instagram';
import TwitterIcon from '@mui/icons-material/Twitter';
import YouTubeIcon from '@mui/icons-material/YouTube';
import LinkIcon from '@mui/icons-material/Link';



const ProfileResult = (props) => {
    const { profile, isLoading } = props;
    console.log(profile)
    const [expanded, setExpanded] = useState(false);

    const handleGetMoreInfo = () => {
        setExpanded(true)
    }


    return (
        <div>
            <Card sx={{ m: 3 }}>
                <CardHeader
                    avatar={
                        <Avatar sx={{ width: 70, height: 70 }}>
                            <img src={profile.profile_pic} style={{ height: '70px', width: '70px', objectFit: 'cover' }} alt="Profile Image" />
                        </Avatar>
                    }
                    action={
                        <Button variant="contained" onClick={handleGetMoreInfo} disabled = {expanded}>Get More Info</Button>
                        /* <IconButton aria-label="add to favorites" sx={{ backgroundColor: '#EFF6FF', m: 1 }} href={profile.linkedin_url} target="_blank">
                            <LinkedInIcon sx={{ color: '#0077B5' }} />
                        </IconButton> */
                    }
                    title={<Typography gutterBottom variant="h6" component="h6">{profile.name}
                    </Typography>}
                    subheader={profile.current_title}
                />
                {/*  <CardMedia
                    component="img"
                    image={profile.profile_pic}
                    sx={{height:'100px', width: '100px', objectFit: 'cover', borderRadius:'50%'}}
                /> */}
                {
                    expanded ?
                        <CardContent>
                            <Grid container spacing={2}>
                                <Grid item xs={12} md={6}>
                                    <Card variant="outlined" sx={{ p: 3 }}>
                                        <Typography variant="body2" color="text.secondary">
                                            <IconButton>
                                                <BusinessCenterIcon />
                                            </IconButton>{profile.current_employer}
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            <IconButton>
                                                <BusinessIcon />
                                            </IconButton>{profile.location}
                                        </Typography>
                                        <Divider sx={{ m: 1 }} />
                                        <Typography variant="body2" color="text.secondary">
                                            <IconButton>
                                                <LinkIcon />
                                            </IconButton>Other Links <br></br>
                                            {

                                                Object.keys(profile?.links).map((key, link) => (<Button href={profile?.links[key]} target="_blank" sx={{ backgroundColor: '#EFF6FF', m: .5 }} variant="text">{key}</Button>))
                                            }
                                        </Typography>
                                    </Card>
                                </Grid>
                                <Grid item xs={12} md={6}>
                                    <Card variant="outlined" sx={{ p: 3 }}>
                                        <Typography variant="body2" color="text.secondary">
                                            <IconButton>
                                                <EmailIcon />
                                            </IconButton>Emails
                                            <Divider sx={{ m: 1 }} />

                                            {
                                                profile.emails.map(singleEmail => <Typography>
                                                    <IconButton>
                                                        {
                                                            singleEmail.smtp_valid === 'valid' ?
                                                                <CheckCircleOutlineIcon sx={{ fontSize: '22px', color: '#16A34A' }} /> :
                                                                <CheckCircleOutlineIcon sx={{ fontSize: '22px', color: '#FDA4AF' }} />
                                                        }

                                                    </IconButton>
                                                    {singleEmail.email} ({singleEmail.type})
                                                </Typography>)
                                            }
                                        </Typography>
                                    </Card>
                                </Grid>
                            </Grid>
                        </CardContent>
                        :
                        <span></span>
                }

            </Card>

        </div>
    );
};

export default ProfileResult;