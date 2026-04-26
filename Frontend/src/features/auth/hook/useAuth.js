import { useDispatch } from "react-redux";
import { register,login } from "../service/auth.api";
import { setUser,setError,setLoading } from "../state/auth.slice";

const extractApiErrorMessage = (err, fallbackMessage) => {
    const errors = err?.response?.data?.errors;

    if (Array.isArray(errors) && errors.length > 0) {
        return errors.map((item) => item.msg).join(", ");
    }

    return err?.response?.data?.message || fallbackMessage;
};


export const useAuth =()=>{
    const dispatch = useDispatch();
    const handleRegister= async(fullname, email, password, contact ,isSeller)=>{
        try {
            dispatch(setLoading(true));
            dispatch(setError(null));
            const data = await register({ fullname, email, password, contact, isSeller });
            dispatch(setUser(data.user));
            return data;
        } catch (err) {
            dispatch(setError(extractApiErrorMessage(err, "Registration failed")));
            throw err;
        } finally {
            dispatch(setLoading(false));
        }
    }

    const handleLogin = async(email, password)=>{
        try {
            dispatch(setLoading(true));
            dispatch(setError(null));
            const data = await login(email, password);
            dispatch(setUser(data.user));
            return data;
        } catch (err) {
            dispatch(setError(extractApiErrorMessage(err, "Login failed")));
            throw err;
        } finally {
            dispatch(setLoading(false));
        }
    }

    return {
        handleRegister,
        handleLogin
    }
}
