import React, { useEffect } from 'react'
import { useState } from 'react';

function CreateUser() {

  const [value, setValue] = useState('');
  const [products,setProducts] = useState([])

  useEffect(()=>{
    const token = localStorage.getItem("token")

    fetch('http://localhost:4000/api/v1/product/', {
    headers: {Authorization: `Bearer ${token}`}
  })
   .then(response => response.json())
   .then(data => {
    if(data.message == "products fetched successfully"){
      setProducts(data.data)
    }else if(data.status == 0){
      console.log("cant get products")
    }else{
      console.log("data is empty")
    }
  })

  },[])

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
                <select className='aboniments'>
                  {
                    products.map((item)=>{
                      return <option value={item.name} key={item._id}>{item.name}</option>
                    })
                  }
                   <option value="" hidden="hidden"></option>
                </select>
                <span className='visits'>visits: 12</span>
                <button className='addvisit'>add</button>
            </div>
          </div>
        </div>
    </div>
  )
}

export default CreateUser