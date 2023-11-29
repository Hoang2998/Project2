import React, { useEffect, useRef, useState } from "react";
import NavStore from "../../components/layout/navStore/navStore";
import "./Cart.scss";
import { useSelector, useDispatch } from "react-redux";
import apis from "../../service/apis/api.user.js";
import { MdDeleteForever } from "react-icons/md";
import { getAllAccount } from "../../store/Account";
import axios, { Axios } from "axios";
import { v4 as uuidv4 } from 'uuid';
import { getAllAddress } from "../../store/Address.js";
import { getAllBills } from "../../store/Bill.js";
export default function Cart() {
  const [currentUser, setCurrentUser] = useState("");
  const [arr, setArr] = useState([]);
  const [total, setTotal] = useState(0);
  const [openPayment, setOpenPayMent] = useState("Cart__payment");
  const dispatch = useDispatch();
  const carta = useSelector((data) => data.accountReducer.account);
  const [openNewContact,setNewContact] = useState("0")
  const [addressPayment,setAddressPayment] = useState([])
  const [alertAnimation , setAlertAnimation] = useState("105%")
  const [alert ,setAlert] = useState("")
  const [hidden,setHidden] = useState("hidden")
  const [address, setAddres] = useState({
    name:"",
    phonenumber:"",
    city: "",
    district: "",
    ward: "",
    ride: "",
    idUser:"",
    id:uuidv4()
  });
  const uuid=()=>{
    return Math.floor(Math.random()*99999)
  }
  const [bill,setBill] = useState({
    id:uuid(),
    idUser:"",
    status:0,
    time:"",
    cart:[],
    address:{
      name:"",
    }
  })

  apis.checkLogin().then((res) => {
    let index = carta.findIndex((item) => item.id == res.data[0].id);
    setCurrentUser(index);
  });

  useEffect(() => {
    apis.checkLogin().then((res) => {
      setArr(res.data);
    });
  }, []);
  useEffect(() => {
    let result = [...arr];
    // console.log(result[0]?.cart);
    let totala = result[0]?.cart.reduce((a, b) => {
      return a + b.quantity * b.price;
    }, 0);
    setTotal(totala);
  }, [arr]);
  const increaseQuan = (id) => {
    let result = [...arr];
    let index = result[0].cart.findIndex((item) => item.id == id);
    result[0].cart[index].quantity = result[0].cart[index].quantity + 1;
    apis.addCart(result[0].id, result[0]);
    setArr(result);
    dispatch(getAllAccount());
  };
  const decreaseQuan = (id) => {
    let result = [...arr];
    let index = result[0].cart.findIndex((item) => item.id == id);
    result[0].cart[index].quantity = result[0].cart[index].quantity - 1;
    if (result[0].cart[index].quantity < 1) {
      result[0].cart[index].quantity = 1;
    }
    apis.addCart(result[0].id, result[0]);
    setArr(result);
    dispatch(getAllAccount());
  };
  const [idItemCard,setIdItemCart] = useState("")
  const deleteItem = (id) => {
    setAlert("Bạn có muốn xóa sản phẩn khỏi cart ? ")
    setAlertAnimation("30%")
    setHidden("visible")
    setIdItemCart(id)
   
  };
  let statusBill = useRef(true);
  const closePayment =()=>{
    setOpenPayMent("Cart__payment")
    statusBill.current = true
  }
  const paymentBill = () => {
    if (statusBill.current) {
      
      setOpenPayMent("Cart__payment--open");
      statusBill.current = false;
      axios.get("http://localhost:8008/address")
      .then(res =>{
        // console.log(res.data);
        let arr = [...carta]
        let idUser = arr[currentUser].id
        let arrPay = res.data.filter(item => item.idUser == idUser)
        bill.cart = arr[currentUser].cart
        setAddres({...address,idUser:idUser})
        setBill({...bill,idUser:idUser})
        setAddressPayment(arrPay)
      })

    } else {
      let time = new Date()
      let timea = time.getHours()+":"+time.getMinutes()+":"+time.getSeconds()+" "+  time.getDate() + "/" + ( +time.getMonth()+1 ) + "/" + time.getFullYear()

      let billset = {...bill}
      billset.time = timea
      if (bill.cart.length != 0 && bill.address.name != "") {

        setAlert("Đơn hàng đang đợi xử lí !")
        setAlertAnimation("30%")
        axios.post("http://localhost:8008/bills",billset)
        let result = [...arr];
          result[0].cart = [];
          // apis.addCart(result[0].id,result[0])
          axios.put(`http://localhost:8008/Account/${result[0].id}`, result[0]);
          setArr(result);
          dispatch(getAllAccount());
        setTimeout(()=>{
          setAlertAnimation("105%")
          setOpenPayMent("Cart__payment");
          statusBill.current = true;
          dispatch(getAllBills())
        },1500)
        
      }else{
        setAlert("chưa có địa chỉ gửi hàng")
        setAlertAnimation("30%")
        setTimeout(()=>{
          setAlertAnimation("105%")
        },1500)
      }
    }
  };
  console.log(bill);
  const [city, setCity] = useState([]);
  const [dis, setDis] = useState([]);
  const [ward, setWard] = useState([]);
  const [codeCity, setCodeCity] = useState("");
  const [codeDis, setCodeDis] = useState("");
  useEffect(() => {
    axios.get("https://provinces.open-api.vn/api/p/").then((city) => {
      setCity(city.data);
    });
    if (codeCity != "") {
      axios
        .get(`https://provinces.open-api.vn/api/p/${codeCity}?depth=2`)
        .then((res) => {
          setDis(res.data);
        });
    }
    if (codeDis != "") {
      axios
        .get(`https://provinces.open-api.vn/api/d/${codeDis}?depth=2`)
        .then((res) => {
          setWard(res.data);
        });
    }
  }, [codeCity, codeDis]);
  
  const changeCity = (e) => {
    setAddres({
      ...address,
      city: city.find((item) => item.code == e.target.value).name,
    });
    setCodeCity(e.target.value);
  };
  const changeDis = (e) => {
    setAddres({
      ...address,
      district: dis.districts.find((item) => item.code == e.target.value).name,
    });
    setCodeDis(e.target.value);
  };
  const changeWard = (e) => {
    setAddres({
      ...address,
      ward: ward.wards.find((item) => item.code == e.target.value).name,
    });
  };
  const changevalue = (e)=>{

    setAddres({...address,[e.target.name]:e.target.value})
  }
  const saveAddress = ()=>{
    if(address.name != ""&&
        address.phonenumber !=""&&
        address.city!=""&&
        address.district!=""&&
        address.ward!=""&&
        address.ride   
    ){
      axios.post("http://localhost:8008/address",address)
      let arr = [...addressPayment]
      arr.push(address)
      setHidden("hidden")
      setAddressPayment(arr)
      setAlert("Lưu thành công ^^")
      setAlertAnimation("30%")
      setAddres({
        ...address,
        name:"",
        phonenumber:"",
        city: "",
        district: "",
        ward: "",
        ride: "",
        id:uuidv4()
      });
      dispatch(getAllAddress())
      setTimeout(()=>{
        setNewContact(0) 
        setAlertAnimation("105%")
      },1500) 
    }else{
      setHidden("hidden")
      setAlert("Bạn chưa điền đủ thông tin")
      setAlertAnimation("30%")
      setTimeout(()=>{
        setAlertAnimation("105%")
      },1500) 
    }
    
    
  }
  const [idDelete,setIdDelete] = useState({
    id:"",
    index:""
  })
  const deleteAddress=(id,index)=>{
    setIdDelete({id,index})
    setAlert("Bạn muốn xóa địa chỉ này ?")
    setAlertAnimation("30%")
    setHidden("visible")
  }
  const acceptDelete=()=>{
   
    if(idDelete.id != ""){
      axios.delete(`http://localhost:8008/address/${idDelete.id}`)
    let arr = [...addressPayment]
    arr.splice(idDelete.index,1)
    setAddressPayment(arr)
    setIdDelete({id:"",index:""})
    }else if(idItemCard != ""){
      let result = [...arr];
      let index = result[0].cart.findIndex((item) => item.id == idItemCard);
      result[0].cart.splice(index, 1);
    // apis.addCart(result[0].id,result[0])
      axios.put(`http://localhost:8008/Account/${result[0].id}`, result[0]);
      setArr(result);
      dispatch(getAllAccount());
      setIdItemCart("")
    }
    setAlertAnimation("105%")
    setHidden("hidden")
  }

  const createBill = (id)=>{
    
      let arr = [...addressPayment]
      let result = arr.filter(item => item.id == id)
      // console.log(result);
      setBill({...bill,address:result[0]})
      
  }

  console.log(bill);
  return (
    <>
      <NavStore></NavStore>
      <div className="Cart">
        {/* alert */}
        <div className="alert__cart" style={{top:alertAnimation}}>
            <p>{alert}</p> 
            <div style={{visibility:hidden }}>
              <button onClick={acceptDelete} > OK </button>
              <button onClick={()=>{setAlertAnimation("105%")}}> CANCEL</button>
            </div>
        </div>

        <div className="Cart__render">
          <table className="Cart__render--table">
            <thead>
              <th>Stt</th>
              <th>Product</th>
              <th>Name</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Total</th>
              <th></th>
            </thead>
            <tbody>
              {carta[currentUser]?.cart.map((item, index) => {
                return (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>
                      <img src={item.img[0]} alt="" width={100} />
                    </td>
                    <td style={{ textAlign: "left" }}>{item.name}</td>
                    <td>{item.price} $</td>
                    <td>
                      <div
                        style={{
                          height: "100%",
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        <button onClick={() => decreaseQuan(item.id)}>-</button>
                        <p
                          style={{
                            display: "inline-block",
                            width: "3rem",
                            marginBottom: "0",
                          }}
                        >
                          {item.quantity}
                        </p>
                        <button onClick={() => increaseQuan(item.id)}>+</button>
                      </div>
                    </td>
                    <td>{item.price * item.quantity} $</td>
                    <td>
                      <button onClick={() => deleteItem(item.id)}>
                        <MdDeleteForever></MdDeleteForever>
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        <div className="Cart__total">
          <div>
            <button onClick={paymentBill}>Payment</button>
          </div>
          <h3 style={{ color: "whitesmoke" }}>Total bill : {total} $</h3>
        </div>

        <div className={openPayment}>
          <div className="container__payment">
            <div>
              <h1 className="main_heading">Payment</h1>
              <hr />
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                
                <div style={{width:"80%",height:"66vh",overflowX:"hidden"}}>
                  <div style={{position:"absolute",right:"6vw"}}>
                    <button style={{ backgroundColor:"transparent",color:"brown",border:"none"}} onClick={closePayment}>close</button>
                  </div>
                  <h3 style={{color:"silver"}}>
                    Contact Information <i className="fa fa-id-card" /> 
                  </h3>

                  <div className="render__contact">
                  
                    {
                        addressPayment.map((item,index)=>{
                        return <div className="render__contact--address" >
                              <div>
                              <input style={{marginRight:"1rem"}} type="radio" name="a" onChange={()=>createBill(item.id)} />
                              <span>{item.name} </span>|<span> {item.phonenumber}</span>  
                                  <p style={{paddingLeft:"2rem"}}>{item.ride}|{item.city} | {item.district}|{item.ward}</p>
                              </div>
                              <div style={{marginRight:"2rem"}}>
                              <button onClick={()=>{
                                deleteAddress(item.id,index)}} ><MdDeleteForever></MdDeleteForever></button>
                              </div>
                                </div>
                      })
                    }
                  </div>

                  <div style={{display:"flex",justifyContent:"space-between",width:"100%" }}>
                    <button className="addNewContact--btn"  onClick={()=>{setNewContact("500px")}}>
                      Add new contact
                    </button>
                  </div>
                  

                  <div className="addNewContact" style={{height:openNewContact}}>
                    <div style={{marginTop:"2rem"}}>
                    <p>
                      Name:* <i className="fa fa-user" />
                      <input
                        type="text"
                        name="name"
                        required=""
                        placeholder="Enter Full Name"
                        value={address.name}
                        onChange={changevalue}
                      />
                    </p>
                    <p>
                      Phone Number:* <i className="fa fa-phone" />
                      <input
                        type="text"
                        name="phonenumber"
                        onChange={changevalue}
                        value={address.phonenumber}
                        required=""
                        placeholder="phone number"
                      />
                    </p>
                    <p>
                      Address:*
                      <i className="fa fa-home" />
                      <div style={{ display: "flex", width: "92%" }}>
                        <select name="" id="" onChange={changeCity}>
                          <option value="">City</option>
                          {city?.map((item, index) => {
                            return (
                              <option
                                value={item.code}
                                style={{ color: "black" }}
                              >
                                {item.name}
                              </option>
                            );
                          })}
                        </select>
                        <select name="" id="" onChange={changeDis}>
                          <option value="">Districts</option>
                          {dis.districts?.map((item, index) => {
                            return (
                              <option
                                value={item.code}
                                style={{ color: "black" }}
                              >
                                {item.name}
                              </option>
                            );
                          })}
                        </select>
                        <select name="" id="" onChange={changeWard}>
                          <option value="">Ward</option>
                          {ward.wards?.map((item, index) => {
                            return (
                              <option
                                value={item.code}
                                style={{ color: "black" }}
                              >
                                {item.name}
                              </option>
                            );
                          })}
                        </select>
                      </div>
                      <textarea
                        name="ride"
                        onChange={changevalue}
                        id=""
                        cols={100}
                        rows={1}
                        required=""
                        placeholder="Enter Your Address"
                        defaultValue={""}
                        value={address.ride}
                      />
                    </p>
                    </div>
                    <button className="saveNewContact--btn" onClick={saveAddress}>
                      Save
                    </button>
                    <button className="saveNewContact--btn" style={{right:"11rem"}} onClick={()=>{setNewContact("0px")}}>
                      Close
                    </button>
                  </div>

                </div>

               
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
