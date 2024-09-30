import React, { useContext } from 'react';
import { useNavigate,useParams } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import FetchContext from '../../fetch/FetchContext'
import AuthContext from '../../fetch/AuthContext'
import { jwtDecode } from 'jwt-decode';
import { useQuery } from '@tanstack/react-query'
import { Post } from '../../fetch/FetchContext';

function UserEdit() {
    var {id} = useParams()
    const nav  = useNavigate()
    var {Get} = useContext(FetchContext)
    var {authTok} = useContext(AuthContext)

    const url = `http://127.0.0.1:8000/api/getuser/${id}/ `;

    const user = useQuery({ queryKey: ['user'],
        queryFn: () => Get(url) });
     
     console.log(user.data)
    
    var User = async(formData) =>{
        try {
          const response = await fetch(`http://127.0.0.1:8000/api/updateuser/${id}/ `,{
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

      const mutation = useMutation({
        mutationFn:User,
        onSuccess:()=>{nav('/')}
      
      });
    
      const UpdateUser = (e) => {
        e.preventDefault(); // Prevent the default form submit action

        
        
        const formData = new FormData();
        formData.append('name', e.target.name.value == "" ? user.data.username: e.target.name.value);
        formData.append('Avatar', e.target.Avatar.files[0] );
        formData.append('email', e.target.email.value == "" ? user.data.email:e.target.email.value) ;
        
    
        // Step 3: Trigger the mutation when form is submitted
        mutation.mutate(formData);
      };
    

    




  return (
    <div>
        <form method='PUT' onSubmit={UpdateUser}>
       <input type="text" name='name' placeholder='Enter  Name'  />
       { user.data.Avatar == "undefined" ? <></>:<img src={`http://127.0.0.1:8000${user.data.Avatar}`} alt="" />}
       
       <input type="file" name='Avatar' placeholder='upload product pic' />
       <input type="email" name="email" placeholder="enter email" />
       <input type="submit" />
       </form>
       <button onClick={() => nav('/')}>Home</button>
    </div>
  )
}

export default UserEdit