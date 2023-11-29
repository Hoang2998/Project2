import axios from "axios"

export default {
    register:async(data)=>{
        return  await axios.post(" http://localhost:8008/Account",data)
    },
    login : async(data)=>{
        return  await axios.post("http://localhost:8008/Account",data)
    },
    checkEmail:async(data)=>{
        return  await axios.get(`http://localhost:8008/Account?email=${data}`)
    },
    checkLogin:async()=>{
        return await axios.get(`http://localhost:8008/Account?status=${1}`)
    },
    getProducts:async()=>{
        return await axios.get("http://localhost:8008/products")
    },
    getCategorya:async(value)=>{
        return await axios.get(`http://localhost:8008/products?category=${value}`)
    },
    getProduct:async(index)=>{
        return await axios.get(`http://localhost:8008/products/${index+1}`)
    },
    addCart:async(index,data)=>{
        return await axios.put(`http://localhost:8008/Account/${index}`,data)
    },
    deleteItemInCart:async(index,data)=>{
        return await axios.put(`http://localhost:8008/Account/${index}`,data)
    }
}