import React, { useContext } from 'react'
import './css/Cartprod.css'
import { useNavigate } from 'react-router-dom'
import AuthContext from '../fetch/AuthContext';
import { useQuery } from '@tanstack/react-query';
import FetchContext from '../fetch/FetchContext';

function CartProd() {
    var nav = useNavigate();
    const {user,access,authTok} = useContext(AuthContext)
    var {Get} = useContext(FetchContext)
    
    
    var nav = useNavigate()
    var userdetails = user
    console.log(userdetails.user_id)
    const url = `http://127.0.0.1:8000/api/getuser/${userdetails.user_id}/ `;

    const userCart = useQuery({ queryKey: ['userCart'],
        queryFn: () => Get(url) });

        console.log(userCart.data)

        const handleDeleteCart = async(pk) => {
          const response = await fetch(`http://127.0.0.1:8000/api/removeToCart/${pk}/${userdetails.user_id}` ,{
              method : "PUT",
              headers : {
                  'Content-Type' : 'application/json',
                  
              }
          })
        nav('/cart')
        }
          
          
      
          
          
            
          
          
          
      
  return (
    <>
    {userCart.data ?
    userCart.data.Cart.map((product) => (
      <div key={product.id} className="imgCard-container" onClick={() => nav(`/product/${product.id}`)}>
        <img src={`http://127.0.0.1:8000${product.ProductPic}`} alt="" />
        <p>{product.ProductName}</p>
        <p>₱{product.price}</p>
        <p key={product.seller.id}>seller:{product.seller.username}</p>
        <button onClick={()=>handleDeleteCart(product.id)}>Remove to Cart</button>
      </div>
    )) : <></>}
  </>
  )
}


export default CartProd