import React, { useEffect, useState } from 'react'
import User from './user';
import FindByName from './findByName';
import SideBar from '../sidebar/sideBar';

function Users() {
    
    const [customers,setCustomers] = useState("")
    const [noCustomer,setNoCustomer] = useState(false)
    const [noFoundByName,setNoFoundByName] = useState(false)
    
    useEffect(()=>{
        const token = localStorage.getItem("token")

        fetch('http://localhost:4000/api/v1/customer/', {
        headers: {Authorization: `Bearer ${token}`}
        })
        .then(response => response.json())
        .then(data => {
            if(data.message == "products fetched successfully"){
                setCustomers(data.data)
            }else if(data.status == 0){
                console.log("cant get products")
            }else{
                console.log("data is empty")
            }
        })
    },[])

  return (
    <div className='usersMain'>
        <SideBar noCustomer={noCustomer} setNoCustomer={setNoCustomer}/>
        <div className='users'>
            <FindByName setCustomers={setCustomers} setNoFoundByName={setNoFoundByName}/>
            <div className='usersDiv'>
                {noFoundByName &&
                    <span className='noCustomer' >customers not found</span>
                }
                {customers &&
                    customers.map((customer)=>{
                        return <User key={customer._id} 
                                     name={customer.name} 
                                     surname={customer.surname}
                                     visitsLeft={customer.visitsLeft}
                                     sixDigit={customer.personalCode}
                                     />
                    })
                }
            </div>
        </div>
    </div>
  )
}


export default Users