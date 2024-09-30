import React, { useContext } from 'react'
import AuthContext from '../fetch/AuthContext'
import { useNavigate } from 'react-router-dom'
import './style/LogIn.css'


function LoginPage() {
    let {loginUser} = useContext(AuthContext)
    const nav = useNavigate()

    const goHome = () =>{
        nav('/')
    }
  return (
    <div className='container'>
          <form method="POST" onSubmit={loginUser} className="form">
        <input
          type="email"
          name="email"
          placeholder="Enter Email"
          className="input-email" // Specific class name for email
        />
        <input
          type="password"
          name="password"
          placeholder="Enter Password"
          className="input-password" // Specific class name for password
        />
        <input
          type="submit"
          value="Login"
          className="input-submit" // Specific class name for submit button
        />
      </form>
      <button onClick={()=>nav('/register')} className="home-button">register</button>
    </div>
  )
}

export default LoginPage