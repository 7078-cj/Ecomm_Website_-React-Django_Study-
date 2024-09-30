import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';

import AuthContext from '../../fetch/AuthContext'
import { jwtDecode } from 'jwt-decode';


 function NewProduct  ()  {
  const nav = useNavigate();
  const { authTok, user } = useContext(AuthContext);
  // const { Post } = useContext(FetchContext);

  // Step 1: Define mutation function that sends the POST request
  var Post = async(formData) =>{
    try {
      const response = await fetch('http://127.0.0.1:8000/api/createProduct/' ,{
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
    mutationFn:Post,
    onSuccess:()=>{nav('/')}
  
  });

  const CreateProd = (e) => {
    e.preventDefault();
    const username = jwtDecode(user.access);
    
    const formData = new FormData();
    formData.append('ProductName', e.target.ProductName.value);
    formData.append('ProductPic', e.target.ProductPic.files[0]);
    formData.append('price', e.target.Price.value);
    formData.append('seller', username.user_id);

    // Step 3: Trigger the mutation when form is submitted
    mutation.mutate(formData);
  };
 
  
  


  return (
    <div>
    <form method='POST' onSubmit={CreateProd}>
       <input type="text" name='ProductName' placeholder='Enter Product Name' />
       <input type="file" name='ProductPic' placeholder='upload product pic' />
       <input type="number" name="Price" placeholder='enter price' />
       <input type="submit" />
       </form>
   <button onClick={()=>nav('/')}>home</button>
</div>
  )
}

export default NewProduct