import React, { useContext, useEffect, useState } from 'react'
import '../style/ProductPage.css'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import { useNavigate, useParams } from 'react-router-dom'
import FetchContext from '../../fetch/FetchContext'
import AuthContext from '../../fetch/AuthContext'
import { useMutation, useQuery } from '@tanstack/react-query'
import { jwtDecode } from 'jwt-decode';
import DeleteProd from './DeleteProd'

function ProductPage() {
  const {id} = useParams()
  const url = `http://127.0.0.1:8000/api/product/${id}`
  const {user,access,authTok} = useContext(AuthContext)
  var nav = useNavigate()
  var userdetails = user

  const [reviewss,setReviews] = useState([])

  var {Get,data} = useContext(FetchContext)
  

  // useEffect(() => {
  //   Get(url).then((response) => {
  //     console.log(response)
  //     setProduct(response); // Set the product data here
  //   });
  // }, [url]);
  
  // console.log(product)
  
  const product = useQuery({ queryKey: ['product'],
     queryFn: () => Get(url) });
  
  console.log(product.data)

  const updateBtn = () =>{
    nav(`/updateproduct/${product.data.id}`)
  }

  const deleteBtn = () =>{
    nav(`/Deleteproduct/${product.data.id}`)
  }

  const reviews = useQuery({ queryKey: ['reviews'],
    queryFn: () => Get("http://127.0.0.1:8000/api/reviews/") });
 
 console.log(reviews.data)

 var Posterwview = async(formData) =>{
  try {
    const response = await fetch(`http://127.0.0.1:8000/api/createReview/${product.data.id}/` ,{
        method : "POST",
        headers : {
            
            'Authorization' : 'Bearer' + String(authTok.access)
        },
        body:formData
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }

    const result = await response.json();
    
    return result;
    

  } catch (err) {
    return (err.message);
  } 
}
// Step 2: Use useMutation hook to handle product creation
const mutation = useMutation({
  mutationFn:Posterwview,
  onSuccess:()=>{
    product.refetch();
  }
  

});

const reviewSubmit = (e) => {
  e.preventDefault();
  
  
  const formData = new FormData();
  formData.append('reviewer', userdetails.user_id);
  formData.append('body',e.target.review.value)
  formData.append('rate',e.target.rate.value)
  console.log(formData)

  // Step 3: Trigger the mutation when form is submitted
  mutation.mutate(formData);
  e.target.review.value = '';
  e.target.rate.value = null;

};

const handleCart = async() =>{
  const response = await fetch(`http://127.0.0.1:8000/api/addToCart/${product.data.id}/${userdetails.user_id}` ,{
        method : "PUT",
        headers : {
            
            'Authorization' : 'Bearer' + String(authTok.access)
        },
        
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }

    const result = await response.json();
    
    return result;
    

  

}

  
   
  return (
    <>
    <Header></Header>
    {product.data === undefined ? (
  <p>Loading...</p>
) : (
  <div className="product-sect">
    <div className="prod-img">
      <img src={`http://127.0.0.1:8000${product.data.ProductPic}`} alt={product.data.ProductName} />
    </div>
    <div className="prod-desc">
      <div className="prod-text">
        <h4>{product.data.ProductName}</h4>
        <br />
        <p className="prod-price">${product.data.price}</p>
        <hr />
        {product && product.data.seller && (
          <>
            <p>Seller Name: {product.data.seller.username}</p>
            {userdetails.username !== product.data.seller.username ? (
              <></>
            ) : (
              <>
                <button className="update-btn" onClick={updateBtn}>Update</button>
                <button className="delete-btn" onClick={deleteBtn}>Delete this Product</button>
              </>
            )}
          </>
        )}
        <hr />
        <p>Sub Description</p>
      </div>

      <div className="button-count">
        {/* Add to Cart and Quantity Input */}
        <form className="add-to-cart-form" >
          
          <button type="submit" className="add-to-cart-btn" onClick={handleCart}>Add to Cart</button>
        </form>

        <div className="review-wrapper">
          {product.data.ProductReview.map((review, index) => (
            <div className="review-card" key={index}>
              <div className="review-header">
                <img
                  className="review-avatar"
                  src={`http://127.0.0.1:8000${review.reviewer.Avatar}`}
                  alt={`${review.reviewer.username}'s avatar`}
                />
                <div className="review-user-info">
                  <p className="review-username">{review.reviewer.username}</p>
                  <p className="review-rating">Rating: {review.rate} ⭐</p>
                </div>
              </div>
              <p className="review-body">{review.body}</p>
            </div>
          ))}
        </div>

        <form method="POST" onSubmit={reviewSubmit} className="review-form">
          <input type="text" name="review" placeholder="Enter Review" className="input-review" />
          <input type="number" name="rate" placeholder="Rate (1 to 10)" className="input-rate" />
          <input type="submit" className="submit-review" />
        </form>
      </div>
    </div>
  </div>
)}
    <Footer></Footer>
    </>
  )
}

export default ProductPage