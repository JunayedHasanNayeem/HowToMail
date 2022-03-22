import { getAuth, signInWithPopup, GoogleAuthProvider, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged, updateProfile } from "firebase/auth";
import { useEffect, useState } from "react";
import initAuth from "../Firebase/firebase.init";

initAuth()
const auth = getAuth();
const useFirebase = () => {
    const [user, setUser] = useState({})
    const [isLoading, setIsLoading] = useState(true)
    const [admin, setAdmin] = useState(false)
    const [errorMessage, setErrorMessage] = useState('')
    
    //Google sign in
    const signInUsingGoogle = (redirect_uri, history)=> {
        const googleProvider = new GoogleAuthProvider();
        signInWithPopup(auth, googleProvider)
         .then(result =>{
            const user = result.user 
            setUser(user)
            setErrorMessage('')
            saveUser(user.displayName, user.email, user.metadata.creationTime, "PUT")
            history.push(redirect_uri)
         })
        .catch(error =>
            setErrorMessage(error.message)
            )
        .finally(()=>{
            setIsLoading(false)
        })
    };

    //Email and password sign up
    const signUpUsingEmail = (email, password, fullName, redirect_uri, history) =>{
        createUserWithEmailAndPassword(auth, email, password)
        .then(result =>{
            const user = result.user
            setUser(user)
            setUserName(fullName)
            setErrorMessage('');
            saveUser(fullName, user.email, user.metadata.creationTime, "POST")
            history.push(redirect_uri)
            window.location.reload();
        })
        .catch(error =>
            setErrorMessage(error.message)
            )
    }
    //Email and password sign ins
    const signInUsingEmail = (email, password, redirect_uri, history) =>{
        signInWithEmailAndPassword(auth, email, password)
        .then(result =>{
            setUser(result.user)
            setErrorMessage('')
            history.push(redirect_uri)
            window.location.reload(); 
        })
        .catch(error =>
            setErrorMessage(error.message)
            )
    }

    // User logout function
    const logOut = () =>{
        setIsLoading(true)
        signOut(auth)
        .then(() =>{
            setUser({})
            setErrorMessage('')
        })
        .finally(()=>{
            setIsLoading(false)
        })
    } 

    const saveUser  = (displayName, email, creationTime, method ) => {
        const user = {displayName, email, creationTime}
        fetch('https://howtomail.herokuapp.com/users', {
            method: method,
            headers: {
                "Content-Type" : "application/json"
            },
            body: JSON.stringify(user)

        })
    }

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if(user){
                setUser(user)
            }  
            setIsLoading(false) 
        })
    }, [])

    //Set displayName for Email sign up
    const setUserName = (fullName) => {
        updateProfile(auth.currentUser, {
            displayName: fullName})
            .then(() => {
            // Profile updated!
            // ...
          })
          .catch(error =>
            setErrorMessage(error.message)
            )
    }

    //Is Admin 
    useEffect(() => {
        fetch(`https://howtomail.herokuapp.com/users/${user.email}`)
            .then(res => res.json())
            .then(data => {
                setAdmin(data.admin)
            })
    }, [user.email])


    return{
        user, 
        admin,
        signInUsingGoogle,
        signUpUsingEmail,
        signInUsingEmail,
        logOut,
        isLoading,
        errorMessage
    }
};

export default useFirebase;