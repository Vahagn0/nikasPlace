import React from 'react'
import { useState } from 'react';

function CreateUser() {

  const [value, setValue] = useState('');

  function handleInputChange(event) {
      const inputValue = event.target.value.replace(/[^0-9]/g, '').slice(0, 6);
      setValue(inputValue);
    }

  return (
    <div className='createUserMain'>
        <div className='createUserModel'>
          <div className='createLogoDiv'>
            <img src={"logo.png"} className='createLogo' />
          </div>
          <div className='info'>
            <div className='left'>
                  <input type='text' placeholder='name'className='input'/>
                  <input type='text' placeholder='surname' className='input'/>
                  <input type='text' placeholder='ph number' className='input'/>
                  <input type='email' placeholder='mail' className='input'/>
                  <input type='date' className='date'/>
              </div>
              <div className='right'>
                <input type="text" placeholder='6 digit' className='input' value={value} onChange={handleInputChange}/>
                <input type='text' placeholder='aboniment type' className='input'/>
                <span className='visits'>visits: 12</span>
                <button className='addvisit'>add</button>
            </div>
          </div>
        </div>
    </div>
  )
}

export default CreateUser