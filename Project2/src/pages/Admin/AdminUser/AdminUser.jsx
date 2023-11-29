import React, { useEffect, useState } from 'react'
import './AdminUser.scss'
import NavAdminn from '../../../components/layout/navAdmin/NavAdminn'
import api from '../../../service/apis/api.user'
import axios from 'axios'

export default function AdminUser() {
const [users,setUsers] = useState([])

useEffect(()=>{
    axios.get("http://localhost:8008/Account")
    .then(res=>{
        let arr = res.data.filter(item=>item.role == "user")
        setUsers(arr)
    })
},[])
const changeStatus=(id)=>{
    let arr = [...users]
    let index = arr.findIndex(item=>item.id == id)
    if(arr[index].active == 0){
    arr[index].active = 1
    }else{
    arr[index].active = 0
    }
    setUsers(arr)
    axios.put(`http://localhost:8008/Account/${id}`,arr[index])
}


  return (
    <>
    <NavAdminn></NavAdminn>
    <div className='AdminUser'>
        <div className='AdminUser__render'>
            <table>
                <thead>
                <th>Stt</th>
                <th>Name User</th>
                <th>Email</th>
                <th>Status</th>
                <th>Action</th>
                </thead>
                <tbody>
                    {
                        users.map((item,index)=>{
                            return <tr key={index}>
                                <td>{index +1}</td>
                                <td>{item?.nameuser}</td>
                                <td>{item?.email}</td>
                                <td style={{color:item?.active?"green":"red"}} >{item?.active?"Active":"Block"}</td>
                                <td><button style={{color:item?.active?"red":"green"}} onClick={()=>changeStatus(item.id)} >{item?.active?"Block":"Active"}</button></td>
                            </tr>
                        })
                    }
                </tbody>
            </table>
        </div>

                   

    </div>
    </>
  )
}
