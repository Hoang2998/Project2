import React, { useEffect } from 'react'
import './Login.scss'
import {Link,useNavigate} from 'react-router-dom'
import bgLogin2 from '../../assets/videos/bg_login2.mp4'
import { useState } from 'react'
import { MdCloudDone } from "react-icons/md";
import axios from 'axios'
import bcrypt from "bcryptjs";
export default function Login() {
  const [users,setUsers] = useState([])
  const [status, setStatus] = useState("");
  const [account,setAccount] = useState({
    email:"",
    password:""
  })
  const navigate = useNavigate()
  useEffect(()=>{
    fetch("http://localhost:8008/Account")
    .then((res) => res.json())
    .then((data) => {
      setUsers(data);
    });
  },[])
  const changeValue = (e) =>{
    const {name,value} = e.target
    setAccount({...account,[name]:value})
  }

  const login = async()=>{
    let checkEmail = users.findIndex(item => item.email == account.email)
    if(checkEmail != -1){
      const isMatch = await bcrypt.compare(account.password, users[checkEmail].password);
      if(isMatch){
        if( users[checkEmail].active == 1){
          setStatus(<MdCloudDone className="done" />);
        fetch(`http://localhost:8008/Account/${users[checkEmail].id}`,{
                method:'PATCH',
                headers:{
                    'Content-Type':'application/json',
                },
                body:JSON.stringify({
                    'status':1,
                })
        })
        setTimeout(()=>{
        setStatus(false)
        if(users[checkEmail].role == "user"){
        navigate("/")
        }else{
        navigate("/Admin")
        }
        },2000)
        }else{
          setStatus("Tài khoản cuả bạn đã bị khóa!")
        setTimeout(()=>{
        setStatus(false)
        },2000)
        }
        
      }else{
      setStatus("Tài khoản Email hoặc mật khẩu không đúng!")
      setTimeout(()=>{
        setStatus(false)
      },2000)
      }
    }else{
      setStatus("Tài khoản Email hoặc mật khẩu không đúng!")
      setTimeout(()=>{
        setStatus(false)
      },2000)
    }
  }
  return (
    <>
    <div>
    <section className='section1'>
    <video autoPlay muted loop className="myVideo2">
          <source src={bgLogin2} type="video/mp4" />
        </video>
        {status ? <div className="alertRegister">{status}</div> : ""}

  <div className="form-box">
    <div className="form-value">
      <div action="">
        <h2>Login</h2>
        <div className="inputbox">
          <input type="email" required="" 
          onChange={changeValue}
          name='email'
          value={account.email}
          />
          <label htmlFor="">Email</label>
        </div>
        <div className="inputbox">
          <input type="password" required="" 
          onChange={changeValue}
          name='password'
          value={account.password}
          />
          <label htmlFor="">Password</label>
        </div>
        <div className="forget">
          <label htmlFor="">
            <input type="checkbox" />
            Remember Me <a href="#">Forget Password</a>
          </label>
        </div>
        <div style={{position:'relative'}} className='login__btn'>
          <div className='login--btn1'></div>
          <div className='login--btn2'></div>
          <div className='login--btn3'></div>
          <div className='login--btn4'></div>
        <button className='logIn-btn' onClick={login} >Log in</button>
        </div>
        <div className="register">
          <Link to='/Register' style={{textDecoration:"none"}}>
          <p >
            Don't have a account <a href="#">Register</a>
          </p>
          </Link>
        </div>
      </div>
    </div>
  </div>
</section>

    </div>
    </>

  )
}
