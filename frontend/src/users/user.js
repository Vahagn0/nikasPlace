import React from 'react'
import {useNavigate } from 'react-router-dom';

function User({name,surname,visitsLeft,sixDigit}) {

    const navigate = useNavigate()

    function personalPage(){
        navigate(`/personalPage/${sixDigit}`)
    }

  return (
    <div className='userDiv'>
        <div className='nameDiv' onClick={personalPage}>
            {name} {surname}
        </div>
        <div className='visitsDiv' onClick={personalPage}>
            {visitsLeft}
        </div>
        <div className='idDiv' onClick={personalPage}>
            {sixDigit}
        </div>
        <div className='buttonDiv' onClick={()=> navigate(`/addVisit/${sixDigit}`)}>
            <button className='plusButton'>+</button>
        </div>
    </div>
  )
}

export default User