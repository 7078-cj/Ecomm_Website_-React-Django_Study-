import { jwtDecode } from 'jwt-decode';
import React, { createContext, useState } from 'react'
import { useNavigate } from 'react-router-dom';

const FetchContext = createContext();


export default FetchContext

export async function Post(url,formData,access){
  try {
    const response = await fetch(url ,{
        method : "POST",
        headers : {
            
            'Authorization' : 'Bearer' + String(access)
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

export function FetchProvider({children}) {

  let nav = useNavigate()
    
    
    const getData = async(url) => {
        
        try {
          const response = await fetch(url ,{
              method : "GET",
              headers : {
                  'Content-Type' : 'application/json',
                  
              }
          });

          
          
            
          const result = await response.json();
          return result;
          
          
          

        } catch (err) {
          return (err.message);
        } 
      };

    const postData = async (url,formData,access) => {
        try {
          const response = await fetch(url ,{
              method : "POST",
              headers : {
                  
                  'Authorization' : 'Bearer' + String(access)
              },
              body:formData
          });

          if (!response.ok) {
            throw new Error(`Error: ${response.status}`);
          }

          const result = await response.json();
          nav('/')
          console.log (result);
          

        } catch (err) {
          return (err.message);
        } 
    }



    


    var context = {
        
        Get:getData,
        Post:postData,
        
    }
    return (
      <FetchContext.Provider value={context}>
        {children}
      </FetchContext.Provider>
    )
  }
  