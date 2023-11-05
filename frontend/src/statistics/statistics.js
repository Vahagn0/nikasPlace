import React from 'react'

function Statistics() {
  return (
    <div className='statisticsMain'>
        <div className='dmyDiv'>
          <input 
          type='text'
          placeholder='day'
          className='dmyInput'
          />
          <input 
          type='text'
          placeholder='month'
          className='dmyInput'
          />
          <input 
          type='text'
          placeholder='year'
          className='dmyInput'
          />
          <button className='searchStats'>
            Search
          </button>
        </div>
        <div className='statisticsMiddle'>

        </div>
    </div>
  )
} 

export default Statistics