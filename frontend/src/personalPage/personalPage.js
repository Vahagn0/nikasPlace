import React, { useState ,useEffect } from 'react'
import { useParams } from 'react-router-dom'
import {useNavigate } from 'react-router-dom';
import PersonalLeft from './personalLeft';
import Visit from './visit';
import SideBar from '../sidebar/sideBar';

function PersonalPage() {

    const navigate = useNavigate()
    const params = useParams()
    const [data,setData] = useState("")

    useEffect(()=>{
        const token = localStorage.getItem("token")

        fetch(`http://localhost:4000/api/v1/customer/${params.personalCode}`,{
            headers: {Authorization: `Bearer ${token}`}
        })
            .then(response => response.json())
            .then(data => {
                if(data.code == "BAD_REQUEST_ERROR"){
                    console.log(data.description)
                }else{
                    setData(data.data)
                }
            })
    },[])

  return (
    <div className='createUserMain'>
      <SideBar />
      <div className='createUserModel'>
        <div className='createUserHeader'>
          <div className='headerButton'>
            <button className='personalBackButton' onClick={()=> navigate(-1)}>Back</button>
          </div>
          <div className='headerLogo'>
            <img src={"logo.png"} className='createLogo' />
          </div>
        </div>
        <div className='info'>
          <PersonalLeft data={data}/>
          <div className='personalRight'>
              <div className='visits'>
                {data.visits &&
                  data.visits.map((visit)=>{
                    return <Visit visit={visit} key={visit.time}/>
                  })
                }
              </div>
          </div>
        </div>
      </div>
  </div>
  )
}

export default PersonalPage