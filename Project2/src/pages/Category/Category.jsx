import React, { useState,useEffect } from "react";
import NavStore from "../../components/layout/navStore/navStore";
import "./Category.scss";
import apis from "../../service/apis/api.user.js";
import { Rate } from "antd";
import { FaCartPlus } from "react-icons/fa6";
import { IoIosArrowUp } from "react-icons/io";
import { useSelector, useDispatch } from "react-redux";
import { getAllProduct } from "../../store/Product.js";
import { getAllAccount } from "../../store/Account.js";

export default function Category() {
  const [height, setHeight] = useState("100vh");
  const [openDetail, setOpenDetail] = useState("0vh");
  const [currentUser, setCurrentUser] = useState([]);
  const [alert,setAlert] = useState("0px")
  const [nameCategory,setNameCategory] = useState("")
  const [product, setProduct] = useState({
    name: "",
    price: "",
    img: "",
    productDetail: "",
  });
  const dispatch = useDispatch();
  useEffect(() => {
    apis.checkLogin().then((res) => {
      setCurrentUser(res.data);})
    dispatch(getAllAccount());
    dispatch(getAllProduct());
  }, []);
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
  const [products, setProducts] = useState([]);
  const getCategory = (value) => {
    setHeight("0vh");
    setNameCategory(value)
    apis.getCategorya(value).then((data) => {
     
      setProducts(data.data);
    });

  };
  const openDetaila = (index) => {
    setOpenDetail("100vh");
    // apis.getProduct(index).then((res) => {
    //   let arr = res.data;
    //   let result = arr.products.find((item) => item.id == id);
    //   console.log(result);
    //   setProduct(result);
    // });
    let arr = [...products]
    setProduct( arr[0].products[index])
    // console.log( arr[0].products[index]);
  };
  const closeDetial=()=>{
    setOpenDetail("0vh");
  }
  return (
    <>
      <NavStore></NavStore>
      <div className="Category">

        <div className="lista" style={{ height: height }}>
          <div className="itema" onClick={() => getCategory("Platform games")}>
            <img
              src="https://anhdepfree.com/wp-content/uploads/2022/02/hinh-nen-laptop-gaming-4k_518700-1280x720.jpg"
              alt=""
            />
            <div className="contenta">
              <h1 style={{ fontSize: "1.5rem" }}>Platform games</h1>
            </div>
          </div>
          <div className="itema" onClick={() => getCategory("Shooter games")}>
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQopBsY-CG_LUGu0DhNxrdOrbKuCJcPGJbe1xf_Ak4yCn4cHSN0urccrnJoJbQ4vghjI14&usqp=CAU"
              alt=""
            />
            <div className="contenta">
              <h1 style={{ fontSize: "1.5rem" }}>Shooter games</h1>
            </div>
          </div>
          <div className="itema" onClick={() => getCategory("Fighting games")}>
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTXC5jfYu35aiHC85hyXCbbyitKuhF8F-5SEmcE_J7KQaL6nqu8-fi3QJ6mP4bNUItYteg&usqp=CAU"
              alt=""
            />
            <div className="contenta">
              <h1 style={{ fontSize: "1.5rem" }}>Fighting games</h1>
            </div>
          </div>
          <div className="itema" onClick={() => getCategory("Survival games")}>
            <img
              src="https://top10tphcm.com/wp-content/uploads/2023/02/hinh-nen-game-4k-cho-dien-thoai-6.jpg"
              alt=""
            />
            <div className="contenta">
              <h1 style={{ fontSize: "1.5rem" }}>Survival games</h1>
            </div>
          </div>
          <div className="itema" onClick={() => getCategory("Action RPG")}>
            <img src="https://wallpaperaccess.com/full/2086927.jpg" alt="" />
            <div className="contenta">
              <h1 style={{ fontSize: "1.5rem", fontWeight: "800" }}>
                Action RPG
              </h1>
            </div>
          </div>
        </div>
        <div  className="Category__name" onClick={()=>{setHeight("100vh")}}>
          <h1>{nameCategory}</h1>
        </div>

        <div className="render__category ">
          {
          products[0]?.products?.map((items, index) => {
            return (
              <div key={index}>
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
                    <img src={items.img[1]} alt="" width={300} height={180} />
                  </div>
                  <div>
                    <p style={{ padding: "10px 10px 0 10px" }}>{items.name}</p>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                      }}
                    >
                      <p style={{ padding: " 0 10px" }}>{items.price}$</p>
                      <Rate
                        disabled
                        defaultValue={5}
                        style={{ paddingRight: "10px" }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
         
          
        </div>

        <div className="Alert__category" style={{height:alert}}>
          <p> Thê giỏ hàng thành công ^^ </p>
        </div>

        <div className="category__detail" style={{ height: openDetail }}>
            <div
              style={{
                display: "flex",
                padding: "4rem",
                width: "100%",
                height: "60vh",
              }}
            >
              <div style={{ width: "50%", height: "100%" }}>
                <h1 style={{ fontSize: "2rem", width: "100%", height: "5vw" }}>
                  {product?.name}
                </h1>
                {/* <p>{product.productDetail}</p> */}
                <div style={{ margin: "1rem" }}>
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
                  <span style={{ color: "orange" }}> {product?.price} $</span>
                </p>
                <button className="button__detail" onClick={addProductCart}>
                  Add to Cart <FaCartPlus></FaCartPlus>
                </button>
              </div>
              <div style={{ width: "400px" }}>
                <img src={product?.img[1]} alt="" width={400} height={300} />
              </div>
            </div>

            <div
              style={{
                width: "100%",
                backgroundColor: "black",
                height: "36vh",
                padding: "1rem 3rem",
                display: "grid",
                gridTemplateColumns: "50% 50%",
                gap: "2rem",
              }}
            >
              <div>
                <h3>Infomation</h3>
                <p>Date : {product?.date}</p>
                <p>{product?.productDetail}</p>
              </div>
              <div>
                <h3>Comment</h3>
                <p>
                  Rate : <Rate allowHalf defaultValue={2} />{" "}
                </p>
                <textarea
                  name=""
                  id=""
                  cols="46"
                  rows="4"
                  style={{
                    backgroundColor: "transparent",
                    color: "white",
                  }}
                ></textarea>
                <button className="button__detail">Sumbit</button>
              </div>
            </div>

            <div
              style={{
                width: "100%",
                backgroundColor: "rgba(255, 0, 0, 0.5)",
                color: "black",
                textAlign: "center",
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
