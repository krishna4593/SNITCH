import axios from "axios";

const authApiInstance = axios.create({
    baseURL: "http://localhost:3000/api/auth",
    withCredentials: true
})


export async function register({ fullname, email, password, isSeller, contact }){
    const response = await authApiInstance.post("/register", {
        fullname,
        email,
        password,
        isSeller,
        contact
    })
    return response.data
}

export async function login(email, password){
    const response = await authApiInstance.post("/login", {
        email,
        password
    })
    return response.data
}