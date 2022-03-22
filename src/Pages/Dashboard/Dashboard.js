import React, { useEffect, useState } from 'react';
import ProfileSearch from '../../Components/ProfileSearch/ProfileSearch';
import PropTypes from 'prop-types';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import MailIcon from '@mui/icons-material/Mail';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import PersonSearchIcon from '@mui/icons-material/PersonSearch';
import { Link } from 'react-router-dom';
import { useRouteMatch } from 'react-router-dom';
import { Route, Switch } from 'react-router-dom';
import TravelExploreIcon from '@mui/icons-material/TravelExplore';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import LogoutIcon from '@mui/icons-material/Logout';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import ComingSoon from '../../Components/ComingSoon/ComingSoon';
import useAuth from '../../Hooks/useAuth';
import DashboardHome from '../../Components/DashboardHome/DashboardHome';
import Users from '../../Components/Users/Users';
import PeopleAltOutlinedIcon from '@mui/icons-material/PeopleAltOutlined';
import StarBorderPurple500OutlinedIcon from '@mui/icons-material/StarBorderPurple500Outlined';
import logo from '../../Images/icon.png'
import AdminRoute from '../../Components/SignIn/AdminRoute'
import Demo from '../../Components/Demo/Demo';

const drawerWidth = 240;

const Dashboard = (props) => {
    //Use Auth
    const { logOut, user, admin } = useAuth()
    const { window } = props;
    const [mobileOpen, setMobileOpen] = React.useState(false);
    const [credits, setCredits] = useState(0)
    useEffect(() => {
        fetch("https://howtomail.herokuapp.com/users")
            .then(res => res.json())
            .then(data => {
                
                const foundUser = data.find(eachUser => eachUser.email == user?.email)
                let availableCredits;
                if(foundUser.credits){
                    availableCredits = foundUser?.credits;
                }else{
                    availableCredits = 0;
                }
                setCredits(availableCredits)
                
            })
    }, [])

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };
    let { path, url } = useRouteMatch();

    const drawer = (
        <div>
            <img src={logo} style={{width:'56px', height:'56px', marginLeft:'15px'}} />
            <Divider />
            <List>
                <Link to={`${url}`} style={{ textDecoration: 'none', color: '#000000' }}>
                    <ListItem button>
                        <HomeOutlinedIcon sx={{ mr: 2 }} />
                        <ListItemText primary="Home" />
                    </ListItem>
                </Link>
                <Link to={`${url}/profile-search`} style={{ textDecoration: 'none', color: '#000000' }}>
                    <ListItem button>
                        <PersonSearchIcon sx={{ mr: 2 }} />
                        <ListItemText primary="Profile Search" />
                    </ListItem>
                </Link>
                <Link to={`${url}/coming-soon`} style={{ textDecoration: 'none', color: '#000000' }}>
                    <ListItem button>
                        <TravelExploreIcon sx={{ mr: 2 }} />
                        <ListItemText primary="Company Search" />
                    </ListItem>
                </Link>
                <Divider sx={{ my: 1 }} />
                <Link to={`${url}/coming-soon`} style={{ textDecoration: 'none', color: '#000000' }}>
                    <ListItem button>
                        <ManageAccountsIcon sx={{ mr: 2 }} />
                        <ListItemText primary="Account" />
                    </ListItem>
                </Link>
                {
                    admin ?
                        <span>
                            <Link to={`${url}/manage-users`} style={{ textDecoration: 'none', color: '#000000' }}>
                                <ListItem button >
                                    <PeopleAltOutlinedIcon sx={{ mr: 2 }} />
                                    <ListItemText primary="Manage Users" />
                                </ListItem>
                            </Link>
                        </span>
                        :
                        <span></span>
                }

                <ListItem button onClick={logOut}>
                    <LogoutIcon sx={{ mr: 2 }} />
                    <ListItemText primary="Log Out" />
                </ListItem>
                <ListItem>
                    <StarBorderPurple500OutlinedIcon sx={{ mr: 2 }} />

                    <ListItemText primary={`Search Credits: ${credits}`} />
                </ListItem>

            </List>
        </div >
    );

    const container = window !== undefined ? () => window().document.body : undefined;

    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <AppBar
                position="fixed"
                sx={{
                    width: { sm: `calc(100% - ${drawerWidth}px)` },
                    ml: { sm: `${drawerWidth}px` },
                }}

            >
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        edge="start"
                        onClick={handleDrawerToggle}
                        sx={{ mr: 2, display: { sm: 'none' } }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" noWrap component="div">
                        HowToMail
                    </Typography>
                </Toolbar>
            </AppBar>
            <Box
                component="nav"
                sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
                aria-label="mailbox folders"
            >
                {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
                <Drawer
                    container={container}
                    variant="temporary"
                    open={mobileOpen}
                    onClose={handleDrawerToggle}
                    ModalProps={{
                        keepMounted: true, // Better open performance on mobile.
                    }}
                    sx={{
                        display: { xs: 'block', sm: 'none' },
                        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                    }}
                >
                    {drawer}
                </Drawer>
                <Drawer
                    variant="permanent"
                    sx={{
                        display: { xs: 'none', sm: 'block' },
                        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                    }}
                    open
                >
                    {drawer}
                </Drawer>
            </Box>
            <Box
                component="main"
                sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` } }}
            >
                <Toolbar />

                <Switch>
                    <Route exact path={`${path}/`}>
                        <DashboardHome></DashboardHome>
                    </Route>
                    <Route path={`${path}/profile-search`}>
                        <ProfileSearch></ProfileSearch>
                    </Route>
                    <Route path={`${path}/coming-soon`}>
                        <ComingSoon></ComingSoon>
                    </Route>
                    <AdminRoute path={`${path}/manage-users`}>
                        <Users></Users>
                    </AdminRoute>
                </Switch>

            </Box>
        </Box>
    );
};

export default Dashboard;