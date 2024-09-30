import React, { useContext, useEffect, useState } from 'react'
import './css/ImageCard.css'
import { useNavigate } from 'react-router-dom'
import { useParams } from 'react-router-dom'
import FetchContext from '../fetch/FetchContext'
import AuthContext from '../fetch/AuthContext'

function ImageCard() {
  var nav = useNavigate();
  
  const url = `http://127.0.0.1:8000/api/products`
  const urlUser = `http://127.0.0.1:8000/api/getuser/`

  const {user,access} = useContext(AuthContext)
  
  var [users,setUsers] = useState([])
  var {Get,data} = useContext(FetchContext)
  var [products,setProducts] = useState([])

 
  useEffect(() => {
    Get(url).then((response) => {
      console.log(response);
      setProducts(response); // Set the product data here
    });
  }, []);

    
  
  console.log(products)

    


    
  

  return (
   <>
    
      {products.map((product) => (
        <div key={product.id} className="imgCard-container" onClick={() => nav(`/product/${product.id}`)}>
          <img src={`http://127.0.0.1:8000${product.ProductPic}`} alt="" />
          <p>{product.ProductName}</p>
          <p>₱{product.price}</p>
          <p key={product.seller.id}>seller:{product.seller.username}</p>
        </div>
      ))}
    </>
  )
}

export default ImageCard