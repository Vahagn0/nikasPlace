import {useNavigate } from 'react-router-dom';
import React, {useState } from 'react'

function SideBar({noCustomer,setNoCustomer}) {

    const navigate = useNavigate()

    const [personalCode, setPersonalCode] = useState('');

    function handleInputChange(event) {
        const inputValue = event.target.value.replace(/[^0-9]/g, '').slice(0, 4);
        setPersonalCode(inputValue);
      }
    
    function getByPersonalCode(){
        const token = localStorage.getItem("token")
    
        fetch(`http://localhost:4000/api/v1/customer/${personalCode}`,{
            headers: {Authorization: `Bearer ${token}`}
        })
            .then(response => response.json())
            .then(data => {
                if(data.code == "BAD_REQUEST_ERROR"){
                    console.log(data.description)
                    setNoCustomer(true)
                }else{
                    setNoCustomer(false)
                    navigate(`/personalPage/${data.data.personalCode}`)
                }
            })
    }

  return (
    <div className='sidebar'>
            <div className='sidebarTop'>
                <input 
                type="text" 
                value={personalCode} onChange={handleInputChange}
                placeholder='քարտի համար'
                className='userIdInput'
                />
                <button className='findButton' onClick={getByPersonalCode}>Find</button>
                {noCustomer && 
                    <span className='noCustomer' style={{margin: "15px"}}>հաճաքորդ չի գտնվել</span>
                }
                <button className='sidebarOption' onClick={()=> navigate("/users")}>
                    Գլխավոր
                </button>
                <button className='sidebarOption' onClick={()=> navigate("/statistics")}>
                    Ստատիստիկա
                </button>
                <button className='sidebarOption' onClick={()=> navigate("/schedule")}>
                    Դասացուցակ
                </button>
            </div>
            <div className='sidebarBottom'>
                <button className='newButton' onClick={()=> navigate("/create")}>New</button>
            </div>
        </div>
  )
}

export default SideBar