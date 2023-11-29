import React, { useState,useRef } from 'react'
import NavAdminn from '../../../components/layout/navAdmin/NavAdminn'
import './AdminBill.scss'
import { useEffect } from 'react'
import axios from 'axios'
import { GrPrevious,GrNext  } from "react-icons/gr";
import { SiIconfinder } from "react-icons/si";

export default function AdminBills() {
const [Bills,setBills] = useState([])
const [BillsFind,setBillsFind] = useState([])
const [openfind, setOpenFind] = useState("35px");
  const closeIn = useRef("hidden");
useEffect(()=>{
    axios.get("http://localhost:8008/bills")
    .then(res=>{
        setBills(res.data)
        setBillsFind(res.data)
    })
},[])


const changeColor = ()=>{
    for(let i =0 ;i<Math.ceil( Bills.length/6);i++){
      if( currentPage-1 == i){
        document.getElementsByClassName('dot')[i].style.color = "red"
      }else{
        document.getElementsByClassName('dot')[i].style.color = "white"
      }
  }
  }
  
  
  const [billsPana,setbillsPana] = useState([])
  const [currentPage,setCurrentPage] = useState(1)
  const [totalPage,setTotalPage] = useState([])
  useEffect(()=>{
    let arr = []
    let arr2 =[]
    const currentPerPage = 6
    const start = (currentPage - 1)*currentPerPage
    let end = currentPage* currentPerPage
    for(let i =0 ;i<Math.ceil( Bills.length/currentPerPage);i++){
        arr2.push(i)
       
    }
    setTotalPage(arr2)
    if( end > Bills.length){
       end = Bills.length
    }
    for(let i = start ; i<end;i++){
        arr.push(Bills[i])
    }
    console.log(arr);
    setbillsPana(arr)
    for(let i =0 ;i<Math.ceil( Bills.length/6);i++){
      if(document.getElementsByClassName('dot')[i]){
        if( currentPage-1 == i){
          document.getElementsByClassName('dot')[i].style.color = "red"
        }else{
          document.getElementsByClassName('dot')[i].style.color = "white"
        }
      }
  }
  },[currentPage,Bills])
  const nextPage=()=>{
    if(currentPage >= totalPage.length){
        setCurrentPage(1)
    }else{
        setCurrentPage(currentPage+1)
    }
    changeColor()
  
  }
  const prePage=()=>{
    if(currentPage < 2){
        setCurrentPage(totalPage.length)
    }else{
        setCurrentPage(currentPage-1)
    }
    changeColor()
  }

const [openDetail,setOpenDetail] = useState("0vh")
const [totalDetail,settotalDetail] = useState("0")
const [billDetail , setBillDetail] = useState([])
const showDetail=(id)=>{
    setOpenDetail("90vh")
    let arr = Bills.filter(item=>item.id == id )
    let letTotal = arr[0].cart.reduce((a,b)=>{
        return a + b.quantity * b.price
    },0)
    console.log(arr);
    settotalDetail(letTotal)
    setBillDetail(arr)
}

const acceptBill =(id , index)=>{
    let arr = [...Bills]
    let ind = arr.findIndex((item)=>{
        return item.id == id 
    })
    arr[ind].status = 1
    setBills(arr)
    axios.put(`http://localhost:8008/billS/${id}`,arr[ind])
}
const cancelBill =(id , index)=>{
    let arr = [...Bills]
    let ind = arr.findIndex((item)=>{
        return item.id == id 
    })
    arr[ind].status = 2
    setBills(arr)
    axios.put(`http://localhost:8008/bills/${id}`,arr[ind])

}

  const openfinda = () => {
    closeIn.current = "visible";
    setOpenFind("250px");
  };
  const closefinda = () => {
    closeIn.current = "hidden";
    setOpenFind("35px");
  };
  
  const changeValueFind = (e)=>{
    if(e.target.value == ""){
        let arr = [...BillsFind]
        setBills(arr)
    }else{    
        let arrFind = BillsFind.filter((item)=>{
       return item.id == e.target.value
    })
    setBills(arrFind)

}
    // setproductsRender(arrFind)
  }
  const debound = (arr,e)=>{
    clearTimeout(time)
    
    var time = setTimeout(()=>{
      arr(e)
    },2000)
  }
  return (
    <>
    <NavAdminn></NavAdminn>
    <div style={{position:"absolute",width:"100vw",height:"35px",zIndex:"100"}} >
        <div className="admin__bar2__input" onClick={openfinda}>
          <input
            type="text"
            style={{ width: openfind }}
            className="admin__bar2--input"
            onChange={(e)=>{debound(changeValueFind,e)}}
            placeholder="Tìm kiếm theo Id"
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
          className="admin__bar2__inputClose"
          onClick={closefinda}
        >
          X
        </div>
      </div>
    <div className='AdminBills'>
        <div className='AdminBills__render'>
                <table>
                    <thead>
                        <th>Stt</th>
                        <th>Id Bill</th>
                        <th>Time</th>
                        <th>Detail</th>
                        <th>Status</th>
                        <th>Action</th>
                    </thead>
                    <tbody>
                        {
                            billsPana?.map((item,index)=>{
                                return <tr key={index}>
                                    <td>{index+1}</td>
                                    <td>{item.id}</td>
                                    <td>{item.time}</td>
                                    <td><button onClick={()=>{showDetail(item.id)}} >Show Bill</button></td>
                                    <td
                                    style={{color:item.status == 0 ?"yellow":item.status == 1?"green":"red"}}
                                    >{item.status == 0 ?"loading":item.status == 1?"accept":"cancel"}</td>
                                    <td>
                                        {
                                            item.status == 0? <div>
                                                <button onClick={()=>acceptBill(item.id)}>Accept</button>
                                                <button onClick={()=>cancelBill(item.id)}>Cancel</button>
                                            </div> :""
                                        }
                                    </td>
                                </tr>
                            })
                        }
                    </tbody>
                </table>
                <div className='adminProduct--pana'>
                    <GrPrevious onClick={prePage}></GrPrevious>
                    {
                       totalPage?.map((item)=>{
                        return <div  className='dot' onClick={()=>{setCurrentPage(item+1)
                        changeColor()
                        }}>{item +1}</div>
                       })
                    }
                   <GrNext onClick={nextPage}></GrNext>
            </div>

            <div className='Bill__detail' style={{height:openDetail}}>
                    <h1>Detail Bill</h1>
                    <p> <span>Name:</span>  {billDetail[0]?.address.name}</p>
                    <p> <span>Phone Number:</span> {billDetail[0]?.address.phonenumber}</p>
                    <p><span>Id:</span> {billDetail[0]?. id}</p>
                    <p><span>Time:</span>  {billDetail[0]?.time}</p>
                    <div>
                        <table>
                            <thead>
                                <th>Stt</th>
                                <th>Product</th>
                                <th>Quatity</th>
                                <th>Price</th>
                                <th>Total</th>
                            </thead>
                            <tbody>
                                {
                                    billDetail[0]?.cart.map((item,index)=>{
                                        return <tr key={index}>
                                            <td>{index +1}</td>
                                            <td>{item?.name}</td>
                                            <td>{item?.quantity}</td>
                                            <td>{item?.price} $</td>
                                            <td>{item?.quantity * item?.price } $</td>
                                        </tr>
                                    })
                                }
                            </tbody>
                            <tfoot>
                                <td colSpan={4}>Total Bill:</td>
                                <td >{totalDetail} $</td>
                            </tfoot>
                        </table>
                    </div>
                    <button onClick={()=>{setOpenDetail("0vh")}}>Close</button>
            </div>
        </div>
    </div>
    </>
  )
}
