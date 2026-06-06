import axios from "axios";
const productAPiInstance= axios.create({
    baseURL:"/api/products",
    withCredentials:true
})

export async function createProduct(formData){
    const response = await productAPiInstance.post("/",formData)
    return response.data
}
export async function getSellerProducts(){
    const response = await productAPiInstance.get("/seller")
    return response.data
}

export async function getAllProducts(){
    const response = await productAPiInstance.get("/")
    return response.data
}

export async function getProductDetails(productId){
    const response = await productAPiInstance.get(`/${productId}`)
    return response.data
}
