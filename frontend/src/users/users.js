import React, { useState } from 'react'
import User from './user';
import { redirect, useNavigate } from 'react-router-dom';

function Users() {
    const navigate = useNavigate()

    const [value, setValue] = useState('');

    function handleInputChange(event) {
        const inputValue = event.target.value.replace(/[^0-9]/g, '').slice(0, 6);
        setValue(inputValue);
      }


  return (
    <div className='usersMain'>
        <div className='sidebar'>
            <div className='sidebarTop'>
                <img src={"logo.png"} className='usersLogo' />
                <input 
                type="text" 
                value={value} onChange={handleInputChange}
                placeholder='6 digit'
                className='userIdInput'
                />
                <button className='findButton'>Find</button>
            </div>
            <div className='sidebarBottom'>
                <button className='newButton' onClick={()=>{
                    navigate("/create")
                }}>New</button>
            </div>
        </div>
        <div className='users'>
            <span className='usersSpan'>Users</span>
            <div className='usersDiv'>
                <User />
                <User />
                <User />
                <User />
                <User />
                <User />
                <User />
                <User />
            </div>
        </div>
    </div>
  )
}
export default Users