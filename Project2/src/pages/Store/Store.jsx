import React, { useEffect, useRef, useState } from "react";
import "./Store.scss";
import { Rate } from "antd";
import apis from "../../service/apis/api.user.js";
import { GrFormPrevious, GrFormNext } from "react-icons/gr";
import { FaCartPlus } from "react-icons/fa6";
import { IoCloseSharp } from "react-icons/io5";
import { IoIosArrowUp } from "react-icons/io";
import { useSelector, useDispatch } from "react-redux";
import { getAllProduct } from "../../store/Product.js";
import { getAllAccount } from "../../store/Account.js";

import NavStore from "../../components/layout/navStore/navStore.jsx";

export default function Store() {
  const [openfind, setOpenFind] = useState("35px");
  const closeIn = useRef("hidden");
  const [currentUser, setCurrentUser] = useState([]);
  const [product, setProduct] = useState({
    name: "",
    price: "",
    img: "",
    productDetail: "",
  });
  const [openDetail, setOpenDetail] = useState(0);
  const [alert,setAlert] = useState("0px")
  const dispatch = useDispatch();
  useEffect(() => {
    apis.checkLogin().then((res) => {
      setCurrentUser(res.data);})
    dispatch(getAllAccount());
    dispatch(getAllProduct());
  }, []);
  
  // console.log(currentUser);
  const data = useSelector((state) => state.productReducer);
  console.log(data);
  // useEffect(() => {
  //   apis.checkLogin().then((res) => {
  //     // console.log(res.data);
  //     setCurrentUser(res.data);
  //   });
  // }, []);
  const addProductCart = ()=>{
    setAlert("200px")
    setTimeout(()=>{
      setAlert("0")
    },1000)
    let arr = [...currentUser]
    let index = arr[0].cart.findIndex(item => item.id == product.id)
    if(index == -1){
    arr[0].cart.push({...product,quantity:1})
    }else{
      arr[0].cart[index].quantity = arr[0].cart[index].quantity + 1
    }
    apis.addCart(arr[0].id,arr[0])
    dispatch(getAllAccount());
  }
  const next = () => {
    let lists = document.querySelectorAll(".item");
    document.getElementById("slide").appendChild(lists[0]);
  };
  const pre = () => {
    let lists = document.querySelectorAll(".item");
    document.getElementById("slide").prepend(lists[lists.length - 1]);
  };
  const next__render = (index,length) => {
    let lists = document.querySelectorAll(".itemRender");

    data.products.forEach((element,ind) => {
      if(ind == index){
        if(index == 0){
        document.getElementsByClassName("listRender")[index].appendChild(lists[0]);
        }else{
          let count = 0
          for(let i = 0;i<index;i++){
            count += data.products[i].products.length 
          }
        document.getElementsByClassName("listRender")[index].appendChild(lists[count]);
        }
      }
    });
  };
  const pre__render = (index,length) => {
   
    let lists = document.querySelectorAll(".itemRender");
    data.products.forEach((element,ind) => {
      if(ind == index){
        if(index == 0){
          let count = data.products[0].products.length -1 
        
          document.getElementsByClassName("listRender")[index].prepend(lists[count]);
        }else{
          let count = data.products[0].products.length -1 
          for(let i = 1;i<=index;i++){
            count += data.products[i].products.length 
          }
        document.getElementsByClassName("listRender")[index].prepend(lists[count]);
        }
      }
    });
  };
  const openDetaila = (index, id) => {
    setOpenDetail("100vh");
    apis.getProduct(index).then((res) => {
      let arr = res.data;
      let result = arr.products.find((item) => item.id == id);
      console.log(result);
      setProduct(result);
    });
  };
  const closeDetial=()=>{
    setOpenDetail("0vh");
  }
  return (
    <>
        <NavStore></NavStore>
      <div className="Store">


        <div className="Alert__store" style={{height:alert}}>
          <p> Thê giỏ hàng thành công ^^ </p>
        </div>

        <div className="Store__render">
          
          <div className="Store__render--slide">
            <div className="container">
              <div id="slide">
                <div
                  className="item"
                  style={{
                    backgroundImage:
                      "url(https://fanatical.imgix.net/product/original/fcf5e7a6-787b-4e4e-a486-36928c4e49b3.jpeg?auto=compress)",
                  }}
                >
                  <div className="content">
                    <div className="name">Lords Of The Fallen Standard</div>
                    <div className="desa">
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      Iste, debitis.
                    </div>
                    <button  onClick={() => openDetaila( 0 , 11)}>See more</button>
                  </div>
                </div>
                <div
                  className="item"
                  style={{
                    backgroundImage:
                      "url(https://invisioncommunity.co.uk/wp-content/uploads/2023/10/COD-BETA-TOUT.jpg",
                  }}
                >
                  <div className="content">
                    <div className="name">Call of Duty Modern Warfare 3</div>
                    <div className="desa">
                      Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                      Perferendis obcaecati suscipit consequatur!
                    </div>
                    <button onClick={() => openDetaila( 1 , 21)} >See more</button>
                  </div>
                </div>
                <div
                  className="item"
                  style={{
                    backgroundImage:
                      "url(https://www.flashfly.net/wp/wp-content/uploads/2022/01/gt7.jpg)",
                  }}
                >
                  <div className="content">
                    <div className="name">Gran Turismo 7 STD</div>
                    <div className="desa">
                      Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                      Odio!
                    </div>
                    <button onClick={() => openDetaila( 0 , 15)} >See more</button>
                  </div>
                </div>
                <div
                  className="item"
                  style={{
                    backgroundImage:
                      "url(https://www.gematsu.com/wp-content/uploads/2022/06/SF6-Inits_06-02-22.jpg",
                  }}
                >
                  <div className="content">
                    <div className="name">Street Fighter 6</div>
                    <div className="desa">
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      Doloremque, enim.
                    </div>
                    <button onClick={() => openDetaila( 2 , 33)} >See more</button>
                  </div>
                </div>
                <div
                  className="item"
                  style={{
                    backgroundImage:
                      "url(https://i.ytimg.com/vi/jmnIQZWSBTk/maxresdefault.jpg)",
                  }}
                >
                  <div className="content">
                    <div className="name">THE KING OF FIGHTERS XV</div>
                    <div className="desa">lorem13</div>
                    <button onClick={() => openDetaila( 2 , 32)} >See more</button>
                  </div>
                </div>
                <div
                  className="item"
                  style={{
                    backgroundImage:
                      "url(https://i0.wp.com/www.gamerfocus.co/wp-content/uploads/2023/04/Dead-Island-2-Resena.png?resize=1000%2C600&ssl=1",
                  }}
                >
                  <div className="content">
                    <div className="name">Dead Island</div>
                    <div className="desa">
                      Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                      In minima vero dolor non dolorem architecto eveniet
                      aspernatur perferendis expedita! Tempore?
                    </div>
                    <button onClick={() => openDetaila( 3 , 43)} >See more</button>
                  </div>
                </div>
              </div>
              <div className="buttons">
                <button id="prev" onClick={pre}>
                  <GrFormPrevious></GrFormPrevious>
                </button>
                <button id="next" onClick={next}>
                  <GrFormNext></GrFormNext>
                </button>
              </div>
            </div>
          </div>

          {data.products.map((item, index) => {
            return (
              <div
                style={{
                  backgroundColor: "rgb(13, 13, 13,0.6)",
                  paddingLeft: "22vw",
                  paddingTop: "5vw",
                  paddingBottom: "2vw",
                }}
              >
                <h2 className="Store--nameCategory">{item?.category}</h2>
                <div
                  style={{
                    display: "flex",
                    gap: "2rem",
                    width: "100%",
                    position: "relative",
                    transition: ".5s",
                  }}
                  className="listRender"
                >
                  {item?.products.map((items) => {
                    return (
                      <div
                        style={{
                          width: "300px",
                          height: "265px",
                          background: "rgb(13, 13, 13,0.7)",
                          color: "white",
                        }}
                        className="itemRender"
                        onClick={() => openDetaila(index, items.id)}
                      >
                        <div
                          style={{
                            width: "300px",
                            height: "180px",
                            overflow: "hidden",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                          }}
                        >
                          <img
                            src={items.img[1]}
                            alt=""
                            width={300}
                            height={180}
                          />
                        </div>
                        <div>
                          <p style={{ padding: "10px 10px 0 10px" }}>
                            {items?.name}
                          </p>
                          <div
                            style={{
                              display: "flex",
                              justifyContent: "space-between",
                            }}
                          >
                            <p style={{ padding: " 0 10px" }}>{items?.price}$</p>
                            <Rate
                              disabled
                              defaultValue={5}
                              style={{ paddingRight: "10px" }}
                            />
                          </div>
                        </div>
                      </div>
                    );
                  })}
                  <div className="buttons__render">
                    <button id="prev" onClick={() => pre__render(index,item.products)}>
                      <GrFormPrevious></GrFormPrevious>
                    </button>
                    <button id="next" onClick={() => next__render(index)}>
                      <GrFormNext></GrFormNext>
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="Store__detail" style={{ height: openDetail }}>
          <div style={{ display: "flex", padding: "4rem",width:"100%",height:"60vh" }}>
            <div style={{width:"50%",height:"100%"}}>
              <h1 style={{fontSize:"2rem",width:"100%",height:"5vw"}}>{product?.name}</h1>
              {/* <p>{product.productDetail}</p> */}
              <div style={{margin:"1rem"}}>
              <img src={product?.img[0]} alt="" width={100} />
              </div>
              <Rate
                disabled
                defaultValue={5}
                value={product?.rate}
                style={{ paddingRight: "10px" }}
              />

              <p>
                Price :
                <span style={{ color: "orange" }}>  {product?.price} $</span>
              </p>
              <button className="button__detail" onClick={addProductCart} >Add to Cart <FaCartPlus></FaCartPlus></button>
            </div>
            <div style={{ width: "400px" }}>
              <img src={product?.img[1]} alt="" width={400} height={300} />
            </div>
          </div>

          <div style={{ width:"100%",backgroundColor:"black",
          height:"36vh",padding:"1rem 3rem",
          display:"grid",
          gridTemplateColumns:"50% 50%",
          gap:"2rem"

          
          }}>
              <div>
              <h3>Infomation</h3>
              <p>Date : {product?.date}</p>
              <p>{product?.productDetail}</p>
              </div>
              <div>
                <h3>Comment</h3>
                <p>Rate : <Rate allowHalf defaultValue={2} /> </p>
                <textarea name="" id="" cols="46" rows="4" style={{
                  backgroundColor:"transparent",
                  color:"white"
                }}></textarea>
                <button className="button__detail">Sumbit</button>
              </div>
          </div>

          <div style={{ width:"100%",backgroundColor:"rgba(255, 0, 0, 0.5)",color:"black",
          textAlign:"center"
        }}
        onClick={closeDetial}
        >
          <IoIosArrowUp></IoIosArrowUp>
          </div>
        </div>

      </div>
    </>
  );
}
