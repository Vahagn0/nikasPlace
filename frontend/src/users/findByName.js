import React, { useState } from 'react'

function FindByName({setCustomers,setNoFoundByName}) {

    const [name,setName] = useState("")
    const [surname,setSurname] = useState("")

    function find(){
        fetch("http://localhost:4000/api/v1/customer/findByName", {
            method: "POST",
            body: JSON.stringify({
                name: name,
                surname: surname
            }),
            headers: {
                "Content-type": "application/json; charset=UTF-8",
            }
            })
            .then(response => response.json())
            .then(json =>{
               if(json.data){
                setCustomers(json.data)
               }else{
                setNoFoundByName(true)
               }
            });
    }

  return (
    <div className='findByNameMain'>
        <input 
        type='text'
        placeholder='Name'
        className='findByNameInput'
        onChange={(e) => setName(e.target.value)}
        />
        <input 
        type='text'
        placeholder='Surname'
        className='findByNameInput'
        onChange={(e) => setSurname(e.target.value)}
        />
        <button className='findByNameButton' onClick={find}>find</button>
    </div>
  )
}

export default FindByName