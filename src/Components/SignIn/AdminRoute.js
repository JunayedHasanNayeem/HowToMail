import { LinearProgress } from "@mui/material";
import { Box } from "@mui/system";
import { Redirect, Route } from "react-router";
import useAuth from "../../Hooks/useAuth"


const AdminRoute = ({ children, ...rest }) => {
    const { user, admin } = useAuth();
    //While collecting the user data, show spinner.
    if (!admin) {
        return (
            <Box sx={{ width: '100%' }}>
                <LinearProgress />
            </Box>
        )
    }
    
    return (
        <Route
            {...rest}
            render={({ location }) =>
            user?.email && admin ? (
                    children
                ) :
                    <Redirect
                        to={{
                            pathname: "/",
                            state: { from: location }
                        }}
                    />
            }

        />

    )


};

export default AdminRoute