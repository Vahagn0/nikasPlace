import React, { useEffect } from 'react'
import { useState } from 'react';
import { useFormik } from 'formik';
import {useNavigate } from 'react-router-dom';


function CreateUser() {

  const [products,setProducts] = useState([])
  const [wrong,setWrong] = useState(false)
  const [wrongInput,setWrongInput] = useState("")
  const [currentAboniment,setCureentAboniment] = useState("")
  const navigate = useNavigate()

  const user = useFormik({
    initialValues : {
      name: "",
      surname: "",
      phone: "",
      email: "",
      date: "",
      sixDigit: "",
      aboniment: ""
    }
  })

  function addCustomer(){
    const token = localStorage.getItem("token")
    const body = {
      name: user.values.name,
      surname: user.values.surname,
      phoneNumber: user.values.phone,
      mail: user.values.email,
      birthDate: user.values.date,
      personalCode: user.values.sixDigit,
      currentAboniment: user.values.aboniment,
      aboniments: [user.values.aboniment],
      visitsLeft: currentAboniment.stock,
      visits: []
    }

    if(wrong){
      console.log("something wrond")
    }else{
      fetch("http://localhost:4000/api/v1/customer", {
        method: "POST",
        body: JSON.stringify(body),
        headers: {
            "Content-type": "application/json; charset=UTF-8",
            Authorization: `Bearer ${token}`
        }
        })
        .then(response => response.json())
        .then(json => console.log(json));
    }
  }

  useEffect(()=>{
    products.map((product)=>{
      if(product.name == user.values.aboniment){
        setCureentAboniment(product)
      }
    })
  },[user.values.aboniment])


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

    // const inputValue = event.target.value.replace(/[^0-9]/g, '').slice(0, 6);

  useEffect(()=>{
    const {name,surname,phone,email,date,sixDigit,aboniment} = user.values
    
    if(!name){
      setWrong(true)
      setWrongInput("name")
    }else if(!surname){
      setWrong(true)
      setWrongInput("surname")
    }else if(!phone || phone.length != 9){
      setWrong(true)
      setWrongInput("phone")
    }else if(!email){
      setWrong(true)
      setWrongInput("email")
    }else if(!date){
      setWrong(true)
      setWrongInput("date")
    }else if(!sixDigit || sixDigit.length != 6){
      setWrong(true)
      setWrongInput("6 digit")
    }else if(!aboniment){
      setWrong(true)
      setWrongInput("aboniment")
    }else{
      setWrong(false)
    }
    },[user.values])

  return (
    <div className='createUserMain'>
        <div className='createUserModel'>
          <div className='createUserHeader'>
            <div className='headerButton'>
              <button className='backButton' onClick={()=> navigate(-1)}>Back</button>
            </div>
            <div className='headerLogo'>
              <img src={"logo.png"} className='createLogo' />
            </div>
          </div>
          <div className='info'>
            <div className='left'>
                  <input type='text' placeholder='name' className='input' name="name" onChange={user.handleChange}/>
                  <input type='text' placeholder='surname' className='input' name="surname" onChange={user.handleChange}/>
                  <input type='text' placeholder='ph number' className='input' name="phone" onChange={user.handleChange}/>
                  <input type='email' placeholder='email' className='input' name="email" onChange={user.handleChange}/>
                  <input type='date' className='date' name="date" onChange={user.handleChange}/>
              </div>
              <div className='right'>
                <input type="text" placeholder='6 digit' className='input' name="sixDigit" onChange={user.handleChange}/>
                <select className='aboniments' name="aboniment" onChange={user.handleChange}>
                  {
                    products.map((item)=>{
                      return <option value={item.name} key={item._id} >{item.name}</option>
                    })
                  }
                   <option value="" hidden="hidden"></option>
                </select>
                <button className='addvisit' onClick={addCustomer}>create</button>
                {wrong &&
                  <span className='wrong'>{wrongInput} input is wronge</span>
                }
            </div>
          </div>
        </div>
    </div>
  )
}

export default CreateUser