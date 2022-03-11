import { useContext } from "react"
import { AuthContext } from "../AuthProvider/AuthProvider"


//Use auth items via AuthContext from useFirebase hook
const useAuth = () => {
    return useContext(AuthContext)
}

export default useAuth;