import React, { createContext } from 'react';
import useFirebase from '../Hooks/useFirebase';

//Create Auth context
export const AuthContext = createContext();

const AuthProvider = (props) => {
    const {children} = props;
    return (
        <AuthContext.Provider value={useFirebase()}>
        {children}
        </AuthContext.Provider>
    ) 
}

export default AuthProvider;
