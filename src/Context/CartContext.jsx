import axios from 'axios';
import { createContext, useEffect, useState } from "react";

export let CartContext =createContext(0)

export default function CartContextProvider(props){
const [cartId , setcartId] = useState(null)
const [totalPrice , settotalPrice] = useState(0)
const [products , setproducts] = useState(null)
const [numOfCartItems , setnumOfCartItems] = useState(0)

    let token = localStorage.getItem('usertoken')

    let headers={
        token:localStorage.getItem('usertoken')
    }

    function addToCart(prodId){
       return axios.post(`https://ecommerce.routemisr.com/api/v1/cart` , { 
            productId:prodId
        } , { 
            headers
        }).then((response)=>{
          getUserCart()
            return response
        }).catch((error)=>{
            return error
        })
    }

    function updateCart(prodId , count){
       return axios.put(`https://ecommerce.routemisr.com/api/v1/cart/${prodId}` , {
            count:count
        } , {
            headers
        }).then((response)=>{
            setnumOfCartItems(response?.data?.numOfCartItems)
            setcartId(response?.data?.cartId)
            setproducts(response?.data?.data?.products)
            settotalPrice(response?.data?.data?.totalCartPrice)
            return response
            
        }).catch((error)=>{
            return error
            
        })
    }
    function resetCart(){
        setcartId(null)
        setnumOfCartItems(0)
        setproducts(null)
        settotalPrice(0)
    }

    function deleteProd(prodId){
       return axios.delete(`https://ecommerce.routemisr.com/api/v1/cart/${prodId}` , {
            headers
        }).then((response)=>{
             setnumOfCartItems(response?.data?.numOfCartItems)
            setcartId(response?.data?.cartId)
            setproducts(response?.data?.data?.products)
            settotalPrice(response?.data?.data?.totalCartPrice)
            return response
            
        }).catch((error)=>{
            console.log(error);
            
        })
    }
    
    function getUserCart(){
        axios.get(`https://ecommerce.routemisr.com/api/v1/cart` , {
            headers
        }).then((response)=>{
             setnumOfCartItems(response?.data?.numOfCartItems)
            setcartId(response?.data?.cartId)
            setproducts(response?.data?.data?.products)
            settotalPrice(response?.data?.data?.totalCartPrice)
            
            console.log(response);
            
        }).catch((error)=>{
            console.log(error);
            
        })
    }

    useEffect(()=>{
        if(token){
        getUserCart()
        }
       
    },[token])



    return <CartContext.Provider  value={{addToCart ,deleteProd , resetCart , numOfCartItems , products , cartId , totalPrice ,updateCart}}>
            {props.children}
    </CartContext.Provider>
}