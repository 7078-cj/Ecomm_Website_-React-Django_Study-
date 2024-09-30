import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'

function DeleteProd() {

    var {id} = useParams()
    const nav = useNavigate()
 
    async function DeleteProd() {
        const response = await fetch(`http://127.0.0.1:8000/api/deleteProduct/${id}/` ,{
            method : "DELETE",
            headers : {
                'Content-Type' : 'application/json',
                
            }
        });
    
        
        
          
        const result = await response.json();
        nav('/')
        console.log (result);
        
        
        
    }
    
    
    

  
  return (
    <div>
        <button onClick={DeleteProd}>Delete</button>
    </div>
  )
}

export default DeleteProd