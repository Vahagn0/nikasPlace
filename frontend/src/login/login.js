import React from 'react'

function Login() {
  return (
    <div className='loginMain'>
        <div className='logInPanel'>
            <img src={"logo.png"} className='logoImg' />
            <input 
            type='text'
            placeholder='log In'
            className='loginInput'
            />
            <input 
            type='password'
            placeholder='Password'
            className='loginInput'
            />
            <button className='loginButton'>logIn</button>
        </div>
    </div>
  )
}

export default Login