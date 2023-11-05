import React, { useState } from 'react'
import SideBar from '../sidebar/sideBar'

function Schedule() {

  return (
    <div style={{display:"flex", height: "100vh", width: "100vw"}}>
        <SideBar />
        <div className='rightDiv'>
          <Row />
          <Row />
          <Row />
          <Row />
          <Row />
          <Row />
          <Row />
          <Row />
          <Row />
          <Row />
          <Row />
          <Row />
          <Row />
          <Row />
          <Row />
        </div>
    </div>
  )
}

function Row(){

  const [time,setTime] = useState("")
  const [monday,setMonday] = useState("")
  const [tuesday,setTuesday] = useState("")
  const [wednesday,setWednesday] = useState("")
  const [thursdya,setThursday] = useState("")
  const [friday,setFriday] = useState("")
  const [saturday,setSaturday] = useState("")

  function fill(arg){
    
  }

  return(
    <div className='row'>
      <div className='rowTime' onClick={()=>fill(time)}>{time}</div>
      <div className='rowItem' onClick={()=>fill(1)}>{monday}</div>
      <div className='rowItem' onClick={()=>fill(2)}>{tuesday}</div>
      <div className='rowItem' onClick={()=>fill(3)}>{wednesday}</div>
      <div className='rowItem' onClick={()=>fill(4)}>{thursdya}</div>
      <div className='rowItem' onClick={()=>fill(5)}>{friday}</div>
      <div className='rowItem' onClick={()=>fill(6)}>{saturday}</div>
    </div>
  )
}

export default Schedule