import React, { useEffect, useState ,useRef} from "react";
import "./AdminProduct.scss";
import NavAdminn from "../../../components/layout/navAdmin/NavAdminn";
import { useSelector, useDispatch } from "react-redux";
import api from "../../../service/apis/api.user";
import { MdDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import { GrPrevious, GrNext } from "react-icons/gr";
import { getDownloadURL, uploadBytes, ref } from "firebase/storage";
import { storage } from "../../../../config/firebase";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { HiArrowCircleDown,HiArrowCircleUp } from "react-icons/hi";
import { SiIconfinder } from "react-icons/si";



export default function AdminProduct() {
  const uuid = () => {
    return Math.floor(Math.random() * 999999);
  };
  const [openfind, setOpenFind] = useState("35px");
  const closeIn = useRef("hidden");

  const [products, setProducts] = useState({
    product: {
      name: "",
      price: "",
      stock: "",
      date: "",
      productDetail: "",
      img: [],
      rate: 5,
      id: uuid(),
    },
    category: "",
  });
  const [productsRender, setproductsRender] = useState([]);
  const [productsFind, setproductsFind] = useState([]);
  const [productsPana, setproductsPana] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPage, setTotalPage] = useState([]);
  const [openAddNew, setOpenAddNew] = useState("0vh");
  const [openEdit, setOpenEdit] = useState("0vw");
  const [imageUpload, setImageUpload] = useState(null);
  const [urlImage, setUrlImage] = useState(null);
  const [urlImage2, setUrlImage2] = useState(null);
  const [category, setCategory] = useState([]);
  const [content, setContent] = useState("");
  const [alert, setAlert] = useState("0");
  // const [productsDetail,setproductsDetail]= useState([])
  const navigate = useNavigate();
  useEffect(() => {
    api.getProducts().then((res) => {
      let arr = [];
      res.data.forEach((element) => {
        element.products.forEach((item) => {
          arr.push(item);
        });
      });
      setproductsRender(arr);
      setproductsFind(arr);
      axios.get(" http://localhost:8008/category").then((res) => {
        setCategory(res.data);
      });
    });
    axios.get(" http://localhost:8008/Account").then((res) => {
      let arr = [...res.data];
      let index = arr.findIndex((item) => item.status == 1);
      if (arr[index].role == "user") {
        navigate("/");
      }
    });
  }, []);
  const changeColor = () => {
    for (let i = 0; i < Math.ceil(productsRender.length / 6); i++) {
      if (currentPage - 1 == i) {
        document.getElementsByClassName("dot")[i].style.color = "red";
      } else {
        document.getElementsByClassName("dot")[i].style.color = "white";
      }
    }
  };
  useEffect(() => {
    let arr = [];
    let arr2 = [];
    const currentPerPage = 6;
    const start = (currentPage - 1) * currentPerPage;
    let end = currentPage * currentPerPage;
    for (
      let i = 0;
      i < Math.ceil(productsRender.length / currentPerPage);
      i++
    ) {
      arr2.push(i);
    }
    setTotalPage(arr2);
    if (end > productsRender.length) {
      end = productsRender.length;
    }
    for (let i = start; i < end; i++) {
      arr.push(productsRender[i]);
    }
    console.log(arr);
    setproductsPana(arr);
    for (let i = 0; i < Math.ceil(productsRender.length / 6); i++) {
      if (document.getElementsByClassName("dot")[i]) {
        if (currentPage - 1 == i) {
          document.getElementsByClassName("dot")[i].style.color = "red";
        } else {
          document.getElementsByClassName("dot")[i].style.color = "white";
        }
      }
    }
  }, [currentPage, productsRender]);
  const nextPage = () => {
    if (currentPage >= totalPage.length) {
      setCurrentPage(1);
    } else {
      setCurrentPage(currentPage + 1);
    }
    changeColor();
  };
  const prePage = () => {
    if (currentPage < 2) {
      setCurrentPage(totalPage.length);
    } else {
      setCurrentPage(currentPage - 1);
    }
    changeColor();
  };
  const changeImage = (e) => {
    let file = e.target.files[0];
    const imageRef = ref(storage, `image/${file.name}`);
    uploadBytes(imageRef, file).then((result) => {
      getDownloadURL(result.ref).then((url) => {
        if (e.target.name == "img1") {
          setUrlImage(url);
          let arr = { ...products };
          arr.product.img.unshift(url);
          setProducts(arr);
          console.log(url);
        } else {
          setUrlImage2(url);
          let arr = { ...products };
          arr.product.img.push(url);
          setProducts(arr);
          console.log(url);
        }
      });
    });
  };

  const changeValue = (e) => {
    let arr = { ...products };
    arr.product = { ...arr.product, [e.target.name]: e.target.value };
    console.log(arr);
    setProducts(arr);
  };
  const changeValueCategory = (e) => {
    let arr = { ...products };
    arr.category = e.target.value;
    console.log(arr);
    setProducts(arr);
  };
  const saveNewProduct = () => {
    if (
      (products.product.name != "",
      products.product.price != "",
      products.product.stock != "",
      products.product.img.length != 2,
      products.product.productDetail != "",
      products.product.name != "",
      products.category != "")
    ) {
      api.getProducts().then((res) => {
        let arr = [...res.data];
        let index = arr.findIndex((item) => {
          return item.category == products.category;
        });
        if (index != -1) {
          arr[index].products.push(products.product);
          axios.put(
            `http://localhost:8008/products/${arr[index].id}`,
            arr[index]
          );
        } else {
          let productNew = {
            category: products.category,
            products: [
              {
                name: products.product.name,
                price: products.product.price,
                img: products.product.img,
                stock: products.product.stock,
                id: products.product.id,
                rate: products.product.rate,
                date: products.product.date,
                productDetail: products.product.productDetail,
              },
            ],
          };
          axios.post("http://localhost:8008/products", productNew);
        }
      });

      let array = [...productsRender];
      array.push(products.product);
      setproductsRender(array);
      setProducts({
        product: {
          name: "",
          price: "",
          stock: "",
          date: "",
          productDetail: "",
          img: [],
          rate: 5,
          id: uuid(),
        },
        category: "",
      });

      setUrlImage("");
      setUrlImage2("");
      setContent("Accept ^^!");
      setAlert("200px");
      setTimeout(() => {
        setAlert("0px");
      }, 1500);
    } else {
      console.log("11111111111");
    }
  };

  const [idDelete, setIdDelete] = useState("");
  const deleteItem = (id) => {
    setContent("Bạn muốn xóa sản phẩm này ?");
    setAlert("200px");
    setIdDelete(id);
  };
  const deleteItemCP = () => {
    let arr = [...productsRender];
    let index = arr.findIndex((item) => item.id == idDelete);
    arr.splice(index, 1);
    setproductsRender(arr);
    api.getProducts().then((res) => {
      let arr = [...res.data];
      res.data.forEach((items, indexs) => {
        items.products.forEach((item, index) => {
          if (item.id == idDelete) {
            arr[indexs].products.splice(index, 1);
            axios.put(
              `http://localhost:8008/products/${items.id}`,
              arr[indexs]
            );
          }
        });
      });
    });
    setIdDelete("");
    setAlert("0px");
  };
  const [idEdit, setIdEdit] = useState("");
  const editItem = (id) => {
    setIdEdit(id);
    setOpenEdit("78vw");
    let arr = [...productsRender];
    let index = arr.findIndex((item) => item.id == id);
    setUrlImage(arr[index].img[0]);
    setUrlImage2(arr[index].img[1]);
    let arrEdit;
    api.getProducts().then((res) => {
      // let arr = [...res.data]
      res.data.forEach((items, indexs) => {
        items.products.forEach((item) => {
          if (item.id == id) {
            arrEdit = {
              product: {
                name: arr[index].name,
                price: arr[index].price,
                stock: arr[index].stock,
                date: arr[index].date,
                productDetail: arr[index].productDetail,
                img: [arr[index].img[0], arr[index].img[1]],
                rate: 5,
                id: arr[index].id,
              },
              category: items.category,
            };
          }
        });
        setProducts(arrEdit);
      });
    });
  };
  const saveEditProduct = () => {
    let arr = [...productsRender];
    let index = arr.findIndex((item) => item.id == idEdit);
    arr[index] = products.product;
    setproductsRender(arr);
    api.getProducts().then((res) => {
      res.data.forEach((items, indexs) => {
        let arr = [...res.data];
        items.products.forEach((item, index) => {
          if (item.id == idEdit) {
            arr[indexs].products[index] = products.product;
            axios.put(
              `http://localhost:8008/products/${items.id}`,
              arr[indexs]
            );
          }
        });
      });
    });
    setOpenEdit("0vw");
    setProducts({
      product: {
        name: "",
        price: "",
        stock: "",
        date: "",
        productDetail: "",
        img: [],
        rate: 5,
        id: uuid(),
      },
      category: "",
    });
    setUrlImage("");
    setUrlImage2("");
    setContent("Accept Update ^^!");
    setAlert("200px");
    setTimeout(() => {
      setAlert("0px");
    }, 1500);
  };
  const sortPriceDe = ()=>{
    let arr = [...productsRender]
    arr.sort((a,b)=> b.price - a.price )
    setproductsRender(arr)
  }
  const sortPriceIn = ()=>{
    let arr = [...productsRender]
    arr.sort((a,b)=> a.price - b.price )
    setproductsRender(arr)

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
    let arrFind = productsFind.filter((item)=>{
       return item.name.toLowerCase().indexOf(e.target.value.toLowerCase()) != -1
    })
    setproductsRender(arrFind)
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
            placeholder="Tìm kiếm theo tên"
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
      <div className="adminProduct">
        <div className="admin__Alert" style={{ height: alert }}>
          <p>{content}</p>
          {idDelete ? (
            <div>
              <button onClick={deleteItemCP}>OK</button>
              <button
                onClick={() => {
                  setAlert("0px");
                  setIdDelete("");
                }}
              >
                Cancel
              </button>
            </div>
          ) : (
            ""
          )}
        </div>

        <div className="adminProduct__render">
          <div className="adminProduct--addNew">
            <button
              onClick={() => {
                setOpenAddNew("75vh");
              }}
            >
              Add new product +
            </button>
            <div
              className="admin__addNewProduct"
              style={{ height: openAddNew }}
            >
              <button
                onClick={() => {
                  setOpenAddNew("0vh");
                }}
              >
                close
              </button>
              <div style={{ display: "flex" }}>
                <table>
                  <tr>
                    <td>
                      <label htmlFor="">Name</label>
                    </td>
                    <td>
                      {" "}
                      <input
                        type="text"
                        onChange={changeValue}
                        name="name"
                        value={products.product.name}
                      />
                      <br />
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <label htmlFor="">Category</label>
                    </td>
                    <td>
                      <select name="category" onChange={changeValueCategory}>
                        <option value={""}>Category</option>
                        {category?.map((item, index) => {
                          if (item.status == 1) {
                            return (
                              <option key={index} value={item.name}>
                                {" "}
                                {item.name}
                              </option>
                            );
                          }
                        })}
                      </select>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <label htmlFor="">Price</label>
                    </td>
                    <td>
                      {" "}
                      <input
                        type="text"
                        onChange={changeValue}
                        name="price"
                        value={products.product.price}
                      />
                      <br />
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <label htmlFor="">Stock</label>
                    </td>
                    <td>
                      {" "}
                      <input
                        type="text"
                        onChange={changeValue}
                        name="stock"
                        value={products.product.stock}
                      />
                      <br />
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <label htmlFor="">Date</label>
                    </td>
                    <td>
                      {" "}
                      <input
                        type="date"
                        onChange={changeValue}
                        name="date"
                        value={products.product.date}
                      />
                      <br />
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <label htmlFor="">Product Detail</label>
                    </td>
                    <td>
                      {" "}
                      <input
                        type="text"
                        onChange={changeValue}
                        name="productDetail"
                        value={products.product.productDetail}
                      />
                      <br />
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <label htmlFor="">Image</label>
                    </td>
                    <td>
                      <input type="file" onChange={changeImage} name="img1" />
                      <br />
                      <input type="file" onChange={changeImage} name="img2" />
                      <br />
                      {/* <button onClick={handleAdd}> Add Img </button> */}
                    </td>
                  </tr>
                </table>
                <div>
                  <div>
                    <h5>Image</h5>
                    <div
                      style={{
                        width: "80px",
                        height: "100px",
                        border: "1px solid brown",
                        margin: "1rem",
                      }}
                    >
                      <img src={urlImage} alt="" width={80} />
                    </div>
                  </div>
                  <div>
                    <h5>BackGround</h5>
                    <div
                      style={{
                        width: "300px",
                        height: "200px",
                        border: "1px solid brown",
                        margin: "1rem",
                      }}
                    >
                      <img src={urlImage2} alt="" width={300} height={200} />
                    </div>
                  </div>
                  <div>
                    <button
                      style={{ border: "1px solid brown" }}
                      onClick={saveNewProduct}
                    >
                      Save New Product
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="adminProduct--addNew">
            {/* <button onClick={()=>{setOpenAddNew("75vh")}}>Add new product +</button> */}
            <div className="admin__addNewProduct" style={{ width: openEdit }}>
              <button
                onClick={() => {
                  setOpenEdit("0vw");
                }}
              >
                close
              </button>
              <div style={{ display: "flex" }}>
                <table>
                  <tr>
                    <td>
                      <label htmlFor="">Name</label>
                    </td>
                    <td>
                      {" "}
                      <input
                        type="text"
                        onChange={changeValue}
                        name="name"
                        value={products.product.name}
                      />
                      <br />
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <label htmlFor="">Category</label>
                    </td>
                    <td>
                      <select
                        name="category"
                        onChange={changeValueCategory}
                        value={products.category}
                        style={{
                          backgroundColor: "transparent",
                          border: "none",
                          outline: "none",
                        }}
                      >
                        <option value={""}>Category</option>
                        {category?.map((item, index) => {
                          if (item.status == 1) {
                            return (
                              <option key={index} value={item.name}>
                                {" "}
                                {item.name}
                              </option>
                            );
                          }
                        })}
                      </select>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <label htmlFor="">Price</label>
                    </td>
                    <td>
                      {" "}
                      <input
                        type="text"
                        onChange={changeValue}
                        name="price"
                        value={products.product.price}
                      />
                      <br />
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <label htmlFor="">Stock</label>
                    </td>
                    <td>
                      {" "}
                      <input
                        type="text"
                        onChange={changeValue}
                        name="stock"
                        value={products.product.stock}
                      />
                      <br />
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <label htmlFor="">Date</label>
                    </td>
                    <td>
                      {" "}
                      <input
                        type="date"
                        onChange={changeValue}
                        name="date"
                        value={products.product.date}
                      />
                      <br />
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <label htmlFor="">Product Detail</label>
                    </td>
                    <td>
                      {" "}
                      <input
                        type="text"
                        onChange={changeValue}
                        name="productDetail"
                        value={products.product.productDetail}
                      />
                      <br />
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <label htmlFor="">Image</label>
                    </td>
                    <td>
                      <input type="file" onChange={changeImage} name="img1" />
                      <br />
                      <input type="file" onChange={changeImage} name="img2" />
                      <br />
                      {/* <button onClick={handleAdd}> Add Img </button> */}
                    </td>
                  </tr>
                </table>
                <div>
                  <div>
                    <h5>Image</h5>
                    <div
                      style={{
                        width: "80px",
                        height: "100px",
                        border: "1px solid brown",
                        margin: "1rem",
                      }}
                    >
                      <img src={urlImage} alt="" width={80} />
                    </div>
                  </div>
                  <div>
                    <h5>BackGround</h5>
                    <div
                      style={{
                        width: "300px",
                        height: "200px",
                        border: "1px solid brown",
                        margin: "1rem",
                      }}
                    >
                      <img src={urlImage2} alt="" width={300} height={200} />
                    </div>
                  </div>
                  <div>
                    <button
                      style={{ border: "1px solid brown" }}
                      onClick={saveEditProduct}
                    >
                      Save Edit Product
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <table>
            <thead>
              <th>Stt</th>
              <th>Product</th>
              <th>Name</th>
              <th>Price 
                <button  onClick={sortPriceDe}  style={{width:"1rem",height:"1rem",padding:"0px",borderRadius:"50%"}}><HiArrowCircleDown/></button > 
              <button  onClick={sortPriceIn}   style={{width:"1rem",height:"1rem",padding:"0px",borderRadius:"100%"}} ><HiArrowCircleUp/></button>  </th>
              <th>Stock</th>
              <th>Action</th>
            </thead>
            <tbody>
              {productsPana?.map((item, index) => {
                return (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>
                      <img src={item?.img[0]} alt="" width={60} />
                    </td>
                    <td>{item?.name}</td>
                    <td>{item?.price} $</td>
                    <td>{item?.stock}</td>
                    <td>
                      <button onClick={() => editItem(item.id)}>
                        <FaEdit></FaEdit>
                      </button>
                      <button onClick={() => deleteItem(item.id)}>
                        <MdDelete></MdDelete>
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          <div className="adminProduct--pana">
            <GrPrevious onClick={prePage}></GrPrevious>
            {totalPage?.map((item) => {
              return (
                <div
                  className="dot"
                  onClick={() => {
                    setCurrentPage(item + 1);
                    changeColor();
                  }}
                >
                  {item + 1}
                </div>
              );
            })}
            <GrNext onClick={nextPage}></GrNext>
          </div>
        </div>
      </div>
    </>
  );
}
