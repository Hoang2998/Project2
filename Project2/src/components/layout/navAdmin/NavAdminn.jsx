import React,{useEffect,useState,useRef} from 'react'
import'./NavAdmin.scss'
import { NavLink, useNavigate, Outlet } from "react-router-dom";
import apis from "../../../service/apis/api.user.js";
import { useSelector, useDispatch } from "react-redux";
import { getAllProduct } from "../../../store/Product.js";
import { getAllAccount } from "../../../store/Account.js";
import logo from "../../../assets/images/shark.png";
import avatar from "../../../assets/images/sheep.png";
import { SiIconfinder } from "react-icons/si";
import axios from 'axios';

export default function NavAdminn() {
    const [openfind, setOpenFind] = useState("35px");
    const closeIn = useRef("hidden");
    const [currentUser, setCurrentUser] = useState("");
    const [products, setProducts] = useState("");
    const data = useSelector((state) => state.accountReducer);
    const dispatch = useDispatch();
    const navigate = useNavigate()

    // apis.checkLogin().then((res) => {
    //   let index = data.account.findIndex(item=>item.status == true )
    //   setProducts(index)
    // });
  
    useEffect(() => {
      apis.checkLogin().then((res) => {
        let index = data.account.findIndex(item=>item.status == true )
        setProducts(index)
        setCurrentUser(res.data);
      });
        dispatch(getAllProduct());
        dispatch(getAllAccount());
    }, []);
  
    // console.log(data);
  
    const openfinda = () => {
      closeIn.current = "visible";
      setOpenFind("250px");
    };
    const closefinda = () => {
      closeIn.current = "hidden";
      setOpenFind("35px");
    };

    const logOut =()=>{
      let arr = [...currentUser]
      arr[0].status = 0
      axios.put(`http://localhost:8008/Account/${arr[0].id}`,arr[0]) 
      navigate("/login")
    }
  return (
    <div>
         <div className="NavAmin__bar">
        
        <ul className="ul">
          <NavLink to={"/Admin"} className="NavAmin--link" style={{ fontSize: "0.9rem" }}>
            <li className="l1 fa-brands fa-product-hunt">Product</li>
          </NavLink>

          <NavLink to={"/userAdmin"} className="NavAmin--link" style={{ fontSize: "0.9rem" }}>
            <li className="l2 fa-solid fa-user">User</li>
          </NavLink>
          <NavLink to={"/categoryAdmin"} className="NavAmin--link" style={{ fontSize: "0.9rem" }}>
            <li className="l3 fa-solid fa-cube">Category</li>
          </NavLink>
          <NavLink to={"/billAdmin"} className="NavAmin--link">
            <li className="l5 fa-solid fa-money-bill" style={{ fontSize: "0.9rem" }}>
              <p style={{ display: "flex", justifyContent: "space-between" }}>
                 BILL
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

      <div className="NavAmin__bar2">
        <div style={{ position: "absolute", left: "8%" }}>
          <img src={logo} alt="" width={50} />
        </div>
        {/* <div className="NavAmin__bar2__input" onClick={openfinda}>
          <input
            type="text"
            style={{ width: openfind }}
            className="NavAmin__bar2--input"
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
          className="NavAmin__bar2__inputClose"
          onClick={closefinda}
        >
          X
        </div> */}
       
       <div className='btn__home'>
        <button onClick={()=>{navigate("/")}}>Home</button>
       </div>


      </div>

    </div>
  )
}
