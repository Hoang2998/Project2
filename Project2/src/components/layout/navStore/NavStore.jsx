import React, { useState, useRef, useEffect } from "react";
import "./navStore.scss";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import apis from "../../../service/apis/api.user.js";
import { useSelector, useDispatch } from "react-redux";
import { getAllProduct } from "../../../store/Product.js";
import { getAllAccount } from "../../../store/Account.js";
import logo from "../../../assets/images/shark.png";
import avatar from "../../../assets/images/sheep.png";
import { SiIconfinder } from "react-icons/si";
import axios from "axios";
import { AiOutlineClose,AiTwotoneEdit } from "react-icons/ai";

export default function NavStore() {
  const [openfind, setOpenFind] = useState("35px");
  const closeIn = useRef("hidden");
  const [currentUser, setCurrentUser] = useState("");
  const [products, setProducts] = useState("");
  const data = useSelector((state) => state.accountReducer);
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const [content,setContent] = useState("abc")
  const [alert,setAlert] = useState("-500px")
  const [tab,setTab] = useState("0%")
  const [openUpdatePs , setOpenUpdatePs] = useState("0px")
  const carta  = useSelector((data) => data.accountReducer.account);
  const [nameUser,setNameUser] = useState("abc")




  // apis.checkLogin().then((res) => {
  //   let index = data.account.findIndex(item=>item.status == true )
  //   setProducts(index)
  // });

  useEffect(() => {
    apis.checkLogin().then((res) => {
      let index = data.account.findIndex(item=>item.status == true )
      setProducts(index)
    });
      dispatch(getAllProduct());
      dispatch(getAllAccount());
  }, []);
  useEffect(()=>{
    apis.checkLogin().then((res) => {
      let arr = [...res.data]
      setCurrentUser(arr[0])
      let index = carta.findIndex((item) => item.id == res.data[0].id);
      setNameUser(index);
    });
    dispatch(getAllAccount())
  },[])
  const changeValue=(e)=>{
    setCurrentUser({...currentUser,[e.target.name]:e.target.value}) 
    console.log(currentUser);
 
   }
   const changeName = ()=>{

   }
   useEffect(()=>{
    setTimeout(() => {
      setAlert("-500px")
    }, 2000);
  },[alert])
  const saveUser =()=>{
    let arr = {...currentUser}
    axios.put(`http://localhost:8008/Account/${arr.id}`,arr)
    setContent(" Save Accept")
    setAlert("80px")
    
  }
  const [newPassword,setNewPassword] = useState({
    password:"",
    newpassword:"",
    comfirmpassword:""
  })
  const checkValuePass = (e)=>{
    setNewPassword({...newPassword,[e.target.name]:e.target.value})
    console.log(newPassword);
  }
  const updatePassword = async()=>{

    if(newPassword.password !="" &&
      newPassword.newpassword != "" &&
      newPassword.comfirmpassword != ""
    ){
      const isMatch = await bcrypt.compare(newPassword.password, currentUser.password);
      if (isMatch) {
        if(newPassword.newpassword == newPassword.comfirmpassword){
          let arr = {...currentUser}
          const hashedPassword = await bcrypt.hash(newPassword.newpassword, 10)
          arr.password = hashedPassword
          axios.put(`http://localhost:8008/Account/${arr.id}`,arr)
          setNewPassword({
            password:"",
            newpassword:"",
            comfirmpassword:""
          })
          setContent(" Update Accept !")
          setAlert("80px")
          setOpenUpdatePs("0px")
        }else{
          setContent(" Comfirm Password incorrect !")
          setAlert("80px")
        }

      }else{
        setContent(" Sai mật khẩu !")
        setAlert("80px")
      }
    }else{
      setContent("Bạn chưa điền đủ thông tin")
      setAlert("80px")
    }
  }
  // console.log(data);
  const closeTab=()=>{
    setTab("0%")
  }
  const openTab=()=>{
    setTab("38%")
  }
  const openfinda = () => {
    closeIn.current = "visible";
    setOpenFind("250px");
  };
  const closefinda = () => {
    closeIn.current = "hidden";
    setOpenFind("35px");
  };
  const logOut =()=>{
    let arr = {...currentUser}
    arr.status = 0
    axios.put(`http://localhost:8008/Account/${arr.id}`,arr) 
    navigate("/login")
  }

  const [openTableAvatar,setOpenTableAvatar] = useState("0px")
  const changeAvatar =(img)=>{
    setCurrentUser({...currentUser,avatar:img})
  }
  const saveAvatar =()=>{
    let arr = {...currentUser}
    axios.put(`http://localhost:8008/Account/${arr.id}`,arr)
    setContent(" Accept!")  
    setAlert("80px")
    setOpenTableAvatar("0px")
  }

  return (
    <>
      <div className="Store__bar">

      <div className='nav__alert' style={{bottom:alert}}> 
                  <p>{content}</p>
            </div>

        <div className="phg">
          <img
            src="https://i.pinimg.com/originals/a0/26/1b/a0261b885cfba5a65c675c33327acf5a.png"
            width={150}
            alt=""
          />
        </div>
        <ul className="ul">
          <NavLink to={"/"} className="Store--link" style={{ fontSize: "0.9rem" }}>
            <li className="l1 fa-solid fa-house">Home</li>
          </NavLink>

          <NavLink to={"/store"} className="Store--link" style={{ fontSize: "0.9rem" }}>
            <li className="l2 fa-solid fa-shop">Store</li>
          </NavLink>
          <NavLink to={"/category"} className="Store--link" style={{ fontSize: "0.9rem" }}>
            <li className="l3 fa-solid fa-cube">Category</li>
          </NavLink>
          <NavLink to={"/cart"} className="Store--link">
            <li className="l4 fa-solid fa-cart-shopping" style={{ fontSize: "0.9rem" }}>
              <p style={{ display: "flex", justifyContent: "space-between" }}>
                MY CART<span>{data?.account[products]?.cart.length}</span>
              </p>
            </li>
          </NavLink>
          <NavLink to={"/historyBill"} className="Store--link">
            <li className="l5 fa-solid fa-money-bill" style={{ fontSize: "0.9rem" }}>
              <p style={{ display: "flex", justifyContent: "space-between" }}>
                HISTORY BILL
              </p>
            </li>
          </NavLink>
          <li
            className="l6 fa-solid fa-arrow-right-from-bracket"
            style={{ fontSize: "0.8rem" }}
            onClick={logOut}
          >
            {currentUser ? "Log out" : "Log in"}
          </li>
          <div className="l7"></div>
        </ul>
      </div>

      <div className="Store__bar2">
        <div style={{ position: "absolute", left: "8%" }}>
          <img src={logo} alt="" width={50} />
        </div>
        {/* <div className="Store__bar2__input" onClick={openfinda}>
          <input
            type="text"
            style={{ width: openfind }}
            className="Store__bar2--input"
          />
          <SiIconfinder
            style={{
              position: "absolute",
              right: "10px",
              top: "8px",
              color: "brown",
            }}
          ></SiIconfinder>
        </div>
        <div
          style={{ visibility: closeIn.current }}
          className="Store__bar2__inputClose"
          onClick={closefinda}
        >
          X
        </div> */}
        <div
          style={{
            position: "absolute",
            right: "8%",
            display: "flex",
            gap: "1vw",
            justifyContent: "center",
            alignItems: "center",
            height: "100%",
            width: "10vw",
          }}
          onClick={openTab}
        >
          <div style={{borderRadius:"25px",overflow:"hidden",width:"35px",height:"35px",
        display:"flex",justifyContent:"center",alignItems:"center"
        }}>
          <img src={currentUser?.avatar} alt="" width={35} height={35}/>
          </div>
          <p style={{ color: "white", fontWeight: "600",marginTop:"1rem" }}> {currentUser?.nameuser}</p>
        </div>
      </div>

      <div className='nav__user' style={{width:tab}}>
              <div onClick={closeTab}><AiOutlineClose className='nav__user--close'></AiOutlineClose></div>
              <div style={{width:"100%",position:"relative" }}>
                  <div className='nav--avatar'>
                  <img src={currentUser?.avatar} width={200}  alt="" />  
                  </div>
                  <div style={{width:"100%",display:"flex",justifyContent:"center",alignItems:"center"}} onClick={()=>{setOpenTableAvatar("300px")}}>
                  <div className='nav--changeAvatar'>
                    Change Avatar 
                  </div>
                  </div>
                  <div style={{display:'flex',justifyContent:'center',alignItems:'center'}}>
                   <input type="text" id='ChangName' name='nameuser' value={currentUser?.nameuser} style={{backgroundColor:"transparent",color:"brown"
                   ,border:"none", textAlign:"center",padding:"0.5em",outline:"none",fontSize:"1.5rem" }} 
                   onChange={changeValue}
                   />
                   <label htmlFor="ChangName" onClick={changeName}  >
                   <AiTwotoneEdit style={{color:"brown",cursor:"pointer",fontSize:"1.2rem"}}></AiTwotoneEdit>
                   </label>
                  </div>
              </div>
              <div className='nav__user--info'>
                <div>
                    <label htmlFor="">Email</label>
                    <br />
                    <input type="email" placeholder='Email' onChange={changeValue} name='email' value={currentUser?.email}/>
                </div>
                <div>
                    <label htmlFor="">Phone Number</label>
                    <br />
                    <input type="text" placeholder='Phone Number' onChange={changeValue}  name='phonenumber' value={currentUser?.phonenumber} />
                </div>
               
                <p onClick={()=>{setOpenUpdatePs("380px")}}>Update Password</p>
                <button onClick={saveUser}>Save</button>


                <div className='nav__user__newPassword' style={{height:openUpdatePs}}>
                <div>
                    <label htmlFor="">Password</label>
                    <br />
                    <input type="password" placeholder='Password' onChange={checkValuePass} name='password' value={newPassword.password}/>
                </div>
                <div>
                    <label htmlFor="">New Password</label>
                    <br />
                    <input type="password" placeholder='New Password' onChange={checkValuePass} name='newpassword' value={newPassword.newpassword}/>
                </div>
                <div>
                    <label htmlFor="">Comfirm Password</label>
                    <br />
                    <input type="password" placeholder='Comfirm Password' onChange={checkValuePass} name='comfirmpassword' value={newPassword.comfirmpassword}/>
                </div>
                <button style={{marginTop:"4rem",marginLeft:"1.5rem"}} onClick={updatePassword}>Update</button>
                <button style={{marginTop:"4rem",marginLeft:"1.5rem"}} onClick={()=>{setOpenUpdatePs("0px")}}>Close</button>
                </div>
              </div>

            </div>

            <div className='nav__tableAvatar' style={{width:openTableAvatar}}>
                <div className='sameImg'
                onClick={()=>{changeAvatar("https://i.pinimg.com/originals/f2/91/b5/f291b5ea58464fc84b46bfe4298fbc77.png")}}
                ><img src={"https://i.pinimg.com/originals/f2/91/b5/f291b5ea58464fc84b46bfe4298fbc77.png"} alt="" width={50} /></div>
               <div className='sameImg'
                onClick={()=>{changeAvatar("https://i.pinimg.com/originals/c8/51/f7/c851f7740be845fb788cc847d73bf9a9.png")}}
                ><img src={"https://i.pinimg.com/originals/c8/51/f7/c851f7740be845fb788cc847d73bf9a9.png"} alt="" width={50} /></div>
                <div className='sameImg'
                onClick={()=>{changeAvatar("https://i.pinimg.com/originals/92/1d/6e/921d6ec30a3f911a05b6bb939c9ae303.png")}}
                ><img src={"https://i.pinimg.com/originals/92/1d/6e/921d6ec30a3f911a05b6bb939c9ae303.png"} alt="" width={50} /></div>
                <div className='sameImg'
                onClick={()=>{changeAvatar("https://i.pinimg.com/originals/66/d6/30/66d6304607ae97c4ac8b0ac0febbc92d.png")}}
                ><img src={"https://i.pinimg.com/originals/66/d6/30/66d6304607ae97c4ac8b0ac0febbc92d.png"} alt="" width={50} /></div>
                <div className='sameImg'
                onClick={()=>{changeAvatar("https://toigingiuvedep.vn/wp-content/uploads/2022/08/hinh-avatar-ff-hoi-nhom.jpg")}}
                ><img src={"https://toigingiuvedep.vn/wp-content/uploads/2022/08/hinh-avatar-ff-hoi-nhom.jpg"} alt="" width={50} /></div>
                <div className='sameImg'
                onClick={()=>{changeAvatar("https://khoinguonsangtao.vn/wp-content/uploads/2022/09/avatar-ff-ngau-nhat-danh-cho-gamer.jpg")}}
                ><img src={"https://khoinguonsangtao.vn/wp-content/uploads/2022/09/avatar-ff-ngau-nhat-danh-cho-gamer.jpg"} alt="" width={50} /></div>
                <div className='sameImg'
                onClick={()=>{changeAvatar("https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQJB2kPENBfFHGxTBl1Mdz2Nzeq72KmOF-GKbLZ6aWv5f5TKKQFCM0-qKCwlMLWTs99XRU&usqp=CAU")}}
                ><img src={"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQJB2kPENBfFHGxTBl1Mdz2Nzeq72KmOF-GKbLZ6aWv5f5TKKQFCM0-qKCwlMLWTs99XRU&usqp=CAU"} alt="" width={50} /></div>
                <div className='sameImg'
                onClick={()=>{changeAvatar("https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSU2pPaIqQb4YjAmXVYX1vFG5TWNP5R6xpRi0tfyRdfcfgiPirdu-CtH9nU2ZxznFT48Q4&usqp=CAU")}}
                ><img src={"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSU2pPaIqQb4YjAmXVYX1vFG5TWNP5R6xpRi0tfyRdfcfgiPirdu-CtH9nU2ZxznFT48Q4&usqp=CAU"} alt="" width={50} /></div>
                <div className='sameImg'
                onClick={()=>{changeAvatar("https://media.istockphoto.com/id/1346361424/vi/vec-to/linh-v%E1%BA%ADt-game-th%E1%BB%A7.jpg?s=1024x1024&w=is&k=20&c=TxGFMvsehIpp54bcD1HVP3ziGfF-7wIOYd8lt6PLyb0=")}}
                ><img src={"https://media.istockphoto.com/id/1346361424/vi/vec-to/linh-v%E1%BA%ADt-game-th%E1%BB%A7.jpg?s=1024x1024&w=is&k=20&c=TxGFMvsehIpp54bcD1HVP3ziGfF-7wIOYd8lt6PLyb0="} alt="" width={50} /></div>
                <div><button onClick={saveAvatar}>Save</button></div>
            </div>
    </>
  );
}
