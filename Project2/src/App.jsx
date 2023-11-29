import React,{lazy,Suspense} from "react";
// Nhúng thư viện của bạn vào dự án

// import HomePage from "./pages/Home/HomePage";
import Login from './pages/login/Login'
import Register from './pages/Register/Register'
import Header from "./components/layout/Header/Header";
import Scroll from "./components/layout/Scrollbar/ScrollBarPage";
import Footer from "./components/layout/Footer/Footer";
import { Routes, Route, Outlet } from "react-router-dom";
// import Store from "./pages/Store/Store";
import Loading from "./components/layout/Loading/Loading";
import Notfound from "./components/layout/NotFoud/Notfound";
import Category from "./pages/Category/Category";
import Store from "./pages/Store/Store";
import NavStore from "./components/layout/navStore/navStore";
import CategoryDetail from "./pages/CategoryDetail/CategoryDetail";
import Cart from "./pages/Cart/Cart";
import HistoryBill from "./pages/HistoryBill/HistoryBill";
import AdminProduct from "./pages/Admin/AdminProduct/AdminProduct";
import AdminCategory from "./pages/Admin/AdminCategoy/AdminCategory";
import AdminUser from "./pages/Admin/AdminUser/AdminUser";
import AdminBills from "./pages/Admin/AdminBills/AdminBills";

const Lazy2 = lazy(()=>{
  return new Promise(resolve =>{
    setTimeout(()=>resolve(import("./pages/Home/HomePage")),2000)
  }) 
})


export default function App() {
  
  return (
    <>
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Header /> <Outlet /> <Footer />
            </>
          }
        >
          <Route path="/" element={
            <Suspense fallback={<Loading></Loading>}>
            <Lazy2 />
          </Suspense>
          } />
        </Route>
        <Route path="/cart" element={<Cart></Cart>}/>
        <Route path="/store" element={<Store></Store>} />
        <Route path="/category" element={<Category></Category>}/>
        <Route path="/Login" element={<Login></Login>}/>
        <Route path="/Register" element={<Register></Register>}/>
        <Route path="*" element={<Notfound></Notfound>}/>
        <Route path="/historyBill" element={<HistoryBill></HistoryBill>}/>
        <Route path="/Admin" element={<AdminProduct></AdminProduct>}/>
        <Route path="/categoryAdmin" element={<AdminCategory></AdminCategory>}/>
        <Route path="/userAdmin" element={<AdminUser></AdminUser>}/>
        <Route path="/billAdmin" element={<AdminBills></AdminBills>}/>
      </Routes>


      {/* <Loading></Loading> */}
      {/* 
      <Footer></Footer> */}
      {/* <Login></Login>
    <Register></Register> */}
      {/* <Scroll></Scroll> */}
    </>
  );
}
