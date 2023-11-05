import React from 'react'
import { useParams } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'

function PersonalLeft({data}) {

    const navigate = useNavigate()
    const params = useParams()

  return (
    <div className='personalLeft'>
    <div className='contentDiv'>
      <span className='personalDataLabel'>name: </span>
      <span className='personalData'>{data.name}</span>
    </div>
    <div className='contentDiv'>
      <span className='personalDataLabel'>surname: </span>
      <span className='personalData'>{data.surname}</span>
    </div>
    <div className='contentDiv'>
      <span className='personalDataLabel'>phone: </span>
      <span className='personalData'>{data.phoneNumber}</span>
    </div>
    <div className='contentDiv'>
      <span className='personalDataLabel'>email: </span>
      <span className='personalData'>{data.mail}</span>
    </div>
    <div className='contentDiv'>
      <span className='personalDataLabel'>birth date: </span>
      <span className='personalData'>{data.birthDate}</span>
    </div>
    <div className='contentDiv'>
      <span className='personalDataLabel'>card number: </span>
      <span className='personalData'>{data.personalCode}</span>
    </div>
    <div className='contentDiv'>
      <span className='personalDataLabel'>aboniment: </span>
      <span className='personalData'>{data.currentAboniment}</span>
    </div>
    <div className='contentDiv'>
      <span className='personalDataLabel'>visits left: </span>
      <span className='personalData'>{data.visitsLeft}</span>
    </div>
    <button className='personalAddvisit' onClick={()=> navigate(`/addVisit/${params.personalCode}`)}>Add</button>
  </div>
  )
}

export default PersonalLeft