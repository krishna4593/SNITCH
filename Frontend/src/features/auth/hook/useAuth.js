import { useDispatch } from "react-redux";
import { register,login } from "../service/auth.api";
import { setUser,setError,setLoading } from "../state/auth.slice";


export const useAuth =()=>{
    const dispatch = useDispatch();
    const handleRegister= async(fullname, email, password, contact ,isSeller)=>{
        const data = await register(fullname, email, password, contact ,isSeller);
        dispatch(setUser(data.user));
    }

    const handleLogin = async(email, password)=>{
        const data = await login(email, password);
        dispatch(setUser(data.user));
    }

    return {
        handleRegister,
        handleLogin
    }
}
