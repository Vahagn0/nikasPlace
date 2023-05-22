import React, { useState } from 'react'
import {useNavigate} from "react-router-dom";

function Login() {

  const [email,setEmail] = useState("")
  const [password,setPassword] = useState("")
  const [incorrect,setIncorrect] = useState(false)
  const navigate = useNavigate()

  function logIn(){

    fetch("http://localhost:4000/api/v1/user/login",
    {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        method: "POST",
        body: JSON.stringify({
          email: email,
          password: password 
        })
    })
    .then((res)=>{ return res.json() })
    .then((data)=>{ 
      console.log(data) 
      redirect(data)})
    }

  function redirect(user){
    if(user.message == "Success"){
      localStorage.setItem("token", user.data.token);
      navigate("/users")
    }else(
      setIncorrect(true)
    )
  }

  return (
    <div className='loginMain'>
        <div className='logInPanel'>
            <img src={"logo.png"} className='logoImg' />
            <input 
            type='text'
            placeholder='Email'
            className='loginInput'
            onChange={(e)=>setEmail(e.target.value)}
            />
            <input 
            type='password'
            placeholder='Password'
            className='loginInput'
            onChange={(e)=> setPassword(e.target.value)}
            />
            {incorrect &&
              <span className='incorrect'>log in or password is incorrect</span>
            }
            <button className='loginButton' onClick={()=> logIn()}>logIn</button>
        </div>
    </div>
  )
}

export default Login