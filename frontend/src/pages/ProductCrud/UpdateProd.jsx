import React, { useContext } from 'react';
import { useNavigate,useParams } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import FetchContext from '../../fetch/FetchContext'
import AuthContext from '../../fetch/AuthContext'
import { jwtDecode } from 'jwt-decode';
import { useQuery } from '@tanstack/react-query'
import { Post } from '../../fetch/FetchContext';

function UpdateProd() {
  const nav = useNavigate();
  const { authTok, user } = useContext(AuthContext);
  const {id} = useParams()
  const url = `http://127.0.0.1:8000/api/product/${id}`

  
  
  var {Get,data} = useContext(FetchContext)

  const product = useQuery({ queryKey: ['product'],
    queryFn: () => Get(url) });
 
 console.log(product.data)

  
  // const { Post } = useContext(FetchContext);

  // Step 1: Define mutation function that sends the POST request
  var Put = async(formData) =>{
    try {
      const response = await fetch(`http://127.0.0.1:8000/api/updateProduct/${id}/ `,{
          method : "PUT",
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
    mutationFn:Put,
    onSuccess:()=>{nav('/')}
  
  });

  const UpdateProd = (e) => {
    
    const username = jwtDecode(user.access);
    
    const formData = new FormData();
    formData.append('ProductName', e.target.ProductName.value == "" ? product.data.ProductName: e.target.ProductName.value);
    formData.append('ProductPic', e.target.ProductPic.files[0] );
    formData.append('price', e.target.Price.value == "" ? product.data.price:e.target.Price.value) ;
    formData.append('seller', username.user_id);

    // Step 3: Trigger the mutation when form is submitted
    mutation.mutate(formData);
  };

  
  
   
  return (
    <>
    
    {product.data === undefined ? (
      <p>Loading...</p>
    ) : 
    <>
    <div>
    <form method='PUT' onSubmit={UpdateProd}>
       <input type="text" name='ProductName' placeholder='Enter Product Name'  />
       <img src={`http://127.0.0.1:8000${product.data.ProductPic}`} alt="" />
       <input type="file" name='ProductPic' placeholder='upload product pic' />
       <input type="number" name="Price" placeholder="enter price" />
       <input type="submit" />
       </form>
       <button onClick={() => nav('/')}>Home</button>
</div>
</>
  }
</>
  )
}

export default UpdateProd