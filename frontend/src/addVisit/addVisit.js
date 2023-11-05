import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import {useNavigate } from 'react-router-dom';

function AddVisit() {

    const params = useParams()
    const [notCreated,setNotCreated] = useState(false)
    const [noVisit,setNoVisit] = useState(false)
    const navigate = useNavigate()

    function addVisit(){
        const token = localStorage.getItem("token")

        fetch("http://localhost:4000/api/v1/customer/addVisit", {
        method: "PATCH",
        body: JSON.stringify({personalCode: params.personalCode}),
        headers: {
            "Content-type": "application/json; charset=UTF-8",
            Authorization: `Bearer ${token}`
        }
        })
        .then(res => {
            if(res.status == 200){
                navigate(-1)
            }else if(res.status == 400){
                setNoVisit(true)
            }else{
                setNotCreated(true)
            }
        })
    }

  return (
    <div className='main'>
        <div className='middle'>
            <p className='hitAdd'>hit ADD to add visit</p>
            <button className='addVisit' onClick={addVisit}>Add</button>
            <button className='back' onClick={()=> navigate(-1)}>back</button>
            {notCreated &&
                <p className='notAdded'>something went wrong</p>
            }
            {noVisit &&
                <p className='notAdded'>no visits left</p>
            }
        </div>
    </div>
  )
}

export default AddVisit