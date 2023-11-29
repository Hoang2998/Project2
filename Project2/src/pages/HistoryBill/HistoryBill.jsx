import React, { useEffect, useState } from 'react'
import "./HistoryBill.scss"
import NavStore from '../../components/layout/navStore/navStore'
import { useDispatch,useSelector} from 'react-redux'
import {getAllBills} from "../../store/Bill"
import axios from 'axios'
import apis from "../../service/apis/api.user.js";
import { GrPrevious,GrNext  } from "react-icons/gr";
export default function HistoryBill() {
  const [billRender,setBillRender] = useState([]);
  const [billPana,setBillPana] = useState([])
  const [currentPage,setCurrentPage] = useState(1)
  const [totalPage,setTotalPage] = useState([])
  const [billDetail,setBillDetail]= useState([])
  const distPatch=useDispatch();
//    distPatch(getAllBills())
    const bills = useSelector(res => res.billsReducer.bills)
    // console.log(bills);
    

    useEffect(()=>{
        
        distPatch(getAllBills())
    },[])
    useEffect(()=>{
        apis.checkLogin()
        .then(res => {
            let arr = [...billRender]
            let id = res.data[0].id
            arr = bills.filter(item=> item.idUser == id)
            setBillRender(arr)
        })
    },[bills])
    useEffect(()=>{
        let arr = []
        let arr2 =[]
        const currentPerPage = 6
        const start = (currentPage - 1)*currentPerPage
        let end = currentPage* currentPerPage
        for(let i =0 ;i<Math.ceil( billRender.length/currentPerPage);i++){
            arr2.push(i)
        }
        setTotalPage(arr2)
        if( end > billRender.length){
           end = billRender.length
        }
        for(let i = start ; i<end;i++){
            arr.push(billRender[i])
        }
        console.log(arr);
        setBillPana(arr)
    },[currentPage,billRender,bills])
    const nextPage=()=>{

        if(currentPage >= totalPage.length){
            setCurrentPage(1)
        }else{
            setCurrentPage(currentPage+1)
        }
    }
    const prePage=()=>{

        if(currentPage < totalPage.length){
            setCurrentPage(totalPage.length)
        }else{
            setCurrentPage(currentPage-1)
        }
    }

    const [openDetail,setOpenDetail] = useState("0vh")
    const [totalDetail,settotalDetail] = useState("0")
    const showDetail=(id)=>{
        setOpenDetail("90vh")
        let arr = billRender.filter(item=>item.id == id )
        let letTotal = arr[0].cart.reduce((a,b)=>{
            return a + b.quantity * b.price
        },0)
        console.log(arr);
        settotalDetail(letTotal)
        setBillDetail(arr)
    }
  return (
    <>
    <NavStore></NavStore>
    <div className='historyBill'>
        <div className='historyBill__render'>
            <h1>History Bill</h1>
            <div className='historyBill__render__table'>
                <table style={{width:"100%"}}>
                <thead >
                    <th>Stt</th>
                    <th>ID Bill</th>
                   
                    <th>Time</th>
                    <th>Detail</th>
                    <th>Status</th>
                </thead>
                <tbody>
                    {
                        billPana?.map((item,index)=>{
                            return <tr>
                                <td>{index+1}</td>
                                <td style={{width:"60px"}}>{item?.id}</td>
                                <td>{item?.time}</td>
                                <td className='seeDetail' onClick={()=>{showDetail(item.id)}} > See Detail</td>
                                <td style={{color:item?.status == 0?"white":item?.status == 1?"green":"red"}}>{item?.status == 0?"Loading ...":item?.status == 1?"Process":"Cancel"}</td>
                            </tr>
                        })
                    }
                </tbody>
            </table>
            </div>
            {/* phan trang */}
            <div className='historyBill--pana'>
                    <GrPrevious onClick={prePage}></GrPrevious>
                    {
                       totalPage?.map((item)=>{
                        return <div  onClick={()=>{setCurrentPage(item+1)}}>{item}</div>
                       })
                    }
                   <GrNext onClick={nextPage}></GrNext>
            </div>
            
            <div className='historyBill__detail' style={{height:openDetail}}>
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
