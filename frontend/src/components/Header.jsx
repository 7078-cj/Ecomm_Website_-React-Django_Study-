import React, { useRef, useState,useEffect, useContext } from 'react'
import './css/Header.css'
import { useNavigate } from 'react-router-dom'
import AuthContext from '../fetch/AuthContext';
import { useQuery } from '@tanstack/react-query'
import FetchContext from '../fetch/FetchContext'
import { jwtDecode } from 'jwt-decode';

function Header() {

  var nav = useNavigate();
  var dropmenu = useRef();
  var profile = useRef();
  var {user,logOut} = useContext(AuthContext)
  var {Get} = useContext(FetchContext)
  console.log(user)
  
  const url = `http://127.0.0.1:8000/api/getuser/${user.user_id}/ `;

    const userdata = useQuery({ queryKey: ['user'],
        queryFn: () => Get(url) });
     
     console.log(userdata.data)

  
  

  var [clas,setClas] = useState(false)
  var [prof,setProf] = useState(false)
  
  function proff(){
    setProf(!prof);
  }
  function menunu(){
    setClas(!clas);
  }


  //menu
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropmenu.current && !dropmenu.current.contains(event.target)) {
        setClas(false);
      }
    };

    const handleClickOutsideprofile = (event) => {
      if (profile.current && !profile.current.contains(event.target)) {
        setProf(false);
      }
    };


    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('mousedown', handleClickOutsideprofile);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('mousedown', handleClickOutsideprofile);
    };
  }, []);

  const handleLogout = () =>{
    logOut()
    nav('/login')
  }
  
  const logIn = () =>{
    nav('/login')
  }

  

  return (
    <>
    
      <header className='header-container'>

      <div ref={dropmenu} className="menu-container">
        <p className='Menu'  onClick={menunu}><img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAAAXNSR0IArs4c6QAAAExJREFUSEtjZKAxYKSx+QyjFhAM4QEJov8EnYVfAYqjsfmA5hZQ6AFU7QMSBzT3Ac3jgOYW0DyIhr4FNI8Dmlsw9ONg1AcoIUDz0hQAbegGGXzv/l0AAAAASUVORK5CYII="/></p>

       { clas ?<div className="dropmenu" >
          <div className="dmSel">
            <p>Cart</p>
            <p onClick={()=>{
        nav('/createProd')
      }}>Sell</p>
            
          </div>
          

        </div>:
        <></>
        }
       
      </div>

      <p onClick={()=>{
        nav('/')
      }} className='logo'>7078Shop.co</p>

      <div className="selection">
        <p onClick={()=>{
        nav('/shop')
      }}>Shop</p>
       
        
      </div>

   
   
        <input  className="search-bar" type='text' placeholder='Search'/>
      
      <div className="icon">
        <div onClick={()=>{
        nav('/cart')
      }}>
        <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAAAXNSR0IArs4c6QAAAPpJREFUSEvdlVEOgjAMhtesJBxDbiI3gVc9hHoIfYWbyE3kGCS0qe5hZCKQbUhi7OOy9Wv/f91AbRywcX71RwBElG/JJSItM2cm3yDR5gBbPSKelVKnNd0AQNn3ff3WgU2YpumOiB5rAEQ0KDN5ixDxrpTax0BEpGbm0p6dBCRJUohIFQNAxKzrunYRECvTuPpJDxyzY2TKiahxO5+dZEQ0HhiIbzRElI83zwJGMn1U5ktdfIu01hUAFK+BvBCRmY/gWASEyOTefS8PQic7GhCsyeiA13+gtb4CwEFEbsx8tDnm1oMkMpvdl9aVYm49GLB5B2t88PLgpwFPLH9+GVH8OrEAAAAASUVORK5CYII=" />
        </div>

      <div className="prof-container" ref={profile}>
            <div className="profilee"  onClick={proff}>
          
            <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAAAXNSR0IArs4c6QAAAYNJREFUSEu1VdttwzAMFCMK8BjJJK03iSdpO0nSSZpMknQLA6ashIJsyHraCCLA0IclHnU8HkG8ecGb44sqACJ+CiH4++DdGHN/7hcA+OediC6lJLMATdPsiejkgmdjMKBSqu37noGjlQRQSh2NMRx81WIQAPglou/wQgSwNXgQ8CcEWQA4Wm6r0k4cStG1AEDEvwLnNjuXxFEI8ZVJhAvfTv9mgBI1T8V0wzCc/YAVKttJXTMAInKBklkh4iFUSYXOuRYzgJTyBAD89GilAPgQIpoaTT7ADQD2mQuROkoUcbG11geOtQrA1/mKItscicjG9mtQUtAm5RpjzlrrLgTIFtm94O58yILl6uUyiYvsTI1fsVgpifIBpkprzeYXWYp/p9Zos55zHCXkmm60KSsimq2i5pQpxw0lXTW7yf93u91VSmm9n4hYzjwjwsaMXpy061JXF+QU9cpCReHFtQOHpxoidpsGjg/G6uIOH8fRjkwnUZ5e15dG5qbOKhyuDv1XgR5FivwZLBlZbwAAAABJRU5ErkJggg=="/>
          
           
            </div>
            {prof ? (
                <div className="profile">
                  <div className="prof-details">
                    {!user ? (
                      <div>
                        <p onClick={() => nav('/login')} className="auth-link">Login</p>
                        <p onClick={() => nav('/register')} className="auth-link">Register</p>
                      </div>
                    ) : (
                      <div className="prof-details">
                        <img
                          className="userProf"
                          src={`http://127.0.0.1:8000${userdata.data.Avatar}`}
                          alt={`${userdata.data.username}'s avatar`}
                        />
                        <hr />
                        <p className="user-username">{userdata.data.username}</p>
                        <p className="user-email">{userdata.data.email}</p>
                        <button className="edit-profile-btn" onClick={() => nav(`/user/${userdata.data.id}`)}>Edit Profile</button>
                        <button className="logout-btn" onClick={handleLogout}>Logout</button>
                      </div>
                    )}
                  </div>
                </div>
              ) : null}

          
            </div>
          
            
      
      </div>
      


    </header> :
    
    </>
  )
}

export default Header