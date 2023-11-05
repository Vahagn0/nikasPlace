import React from 'react'

function Visit({visit}) {
    
    const {day,month,year,time} = visit

  return (
    <div className='visit'>
        <div className='dateDiv'>
            <span className='dateTime'> {day}.{month}.{year} </span>
        </div>
        <div className='timeDiv'>
            <span className='dateTime'>{time}</span>
        </div>
    </div>
  )
}

export default Visit