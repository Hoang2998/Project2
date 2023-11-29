import React, { useRef, useState } from "react";
import "./Register.scss";
import { Link } from "react-router-dom";
import bgLogin2 from "../../assets/videos/bg_login2.mp4";
import { useEffect } from "react";
import { MdCloudDone } from "react-icons/md";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa6";
// import api from "../../service/apis/api.user.js"
import bcrypt from "bcryptjs"

export default function Register() {
  const [users, setUsers] = useState([]);
  const [alertEmail, setAlertEmail] = useState("");
  const [alertPassword, setAlertPassword] = useState("");
  const [alertCPassword, setAlertCPassword] = useState("");
  const [status, setStatus] = useState("");
  const [statusFalse, setStatusFalse] = useState(false);

  useEffect(() => {
    fetch("http://localhost:8008/Account")
      .then((res) => res.json())
      .then((data) => {
        setUsers(data);
      });
  }, []);
  const [newUser, setNewUser] = useState({
    nameuser: "",
    email: "",
    password: "",
    comfirmPassword: "",
    role: "user",
    status: 0,
    cart: [],
    phonenumber:"",
    avatar:"",
    active:1
  });
  const changeValue = (e) => {
    const { name, value } = e.target;
    setNewUser({ ...newUser, [name]: value });
    console.log(newUser);
  };
  const createUser  = async () => {
    if (
      newUser.email != "" &&
      newUser.password != "" &&
      newUser.username != "" &&
      newUser.comfirmPassword != ""
    ) {
      let resultEmail = newUser.email.match(
        /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g
      );
      let checkEmail = users.findIndex((item) => item.email == newUser.email);
      if (resultEmail == null) {
        // console.log("11111");
        setAlertEmail("Email cuả bạn không đúng định dạng!");
      } else if (checkEmail != -1) {
        // console.log("22222");
        setAlertEmail("Email cuả bạn đã tồn tại!");
      } else {
        setAlertEmail("");
      }
      let resultPassword = newUser.password.match(/^\d{8}$/);
      if (resultPassword == null) {
        // console.log("33333");

        setAlertPassword("Mật khẩu của bạn ko đúng định dạng");
      } else {
        setAlertPassword("");
      }
      if (newUser.comfirmPassword != newUser.password) {
        setAlertCPassword("Mời xác nhận lại mật khẩu!");
      } else {
        setAlertCPassword("");
      }
      if (
        resultEmail != null &&
        checkEmail == -1 &&
        resultPassword != null &&
        newUser.comfirmPassword == newUser.password
      ) {
        const hashedPassword = await bcrypt.hash(newUser.password, 10)
        fetch("http://localhost:8008/Account", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            nameuser: newUser.nameuser,
            email: newUser.email,
            password: hashedPassword,
            role: "user",
            active:0,
            status:1,
            cart: [],
            phonenumber:"",
            avatar:"",
            active:1
          }),
        });
        setStatus(<MdCloudDone className="done" />);
        setTimeout(() => {
          setStatus(false);
        }, 2000);
        setNewUser({
          nameuser: "",
          email: "",
          password: "",
          comfirmPassword: "",
          role: "user",
          status: 0,
          cart: [],
          phonenumber:"",
          avatar:"",
          active:1,
        });
      }
    } else {
      setStatus("Bạn chưa điền đủ thông tin mời nhập đủ !");
      setTimeout(() => {
        setStatus(false);
      }, 2000);
    }
  };

  const [statusP, setStatusP] = useState(false);
  const statusPassWord = () => {
    if (statusP == true) {
      setStatusP(false);
    } else {
      setStatusP(true);
    }
  };
  const [statusCP, setStatusCP] = useState(false);
  const statusCPassWord = () => {
    if (statusCP == true) {
      setStatusCP(false);
    } else {
      setStatusCP(true);
    }
  };
  return (
    <>
      <section className="section1">
        <video autoPlay muted loop className="myVideo2">
          <source src={bgLogin2} type="video/mp4" />
        </video>
        {status ? <div className="alertRegister">{status}</div> : ""}

        <div className="form-box">
          <div className="form-value">
            <div action="">
              <h2>Register</h2>
              <div className="inputbox">
                <input
                  onChange={changeValue}
                  type="text"
                  required=""
                  name="nameuser"
                  value={newUser.nameuser}
                />
                <label htmlFor="">Name User</label>
              </div>
              <div className="inputbox">
                <input
                  onChange={changeValue}
                  type="email"
                  required=""
                  name="email"
                  value={newUser.email}
                />
                <label htmlFor="">Email</label>
              </div>
              <p style={{ fontSize: "0.5rem", color: "red", margin: "0" }}>
                {alertEmail}
              </p>
              <div className="inputbox">
                <input
                  onChange={changeValue}
                  type={statusP ? "text" : "password"}
                  required=""
                  name="password"
                  value={newUser.password}
                />
                <label htmlFor="">Password</label>
                {statusP ? (
                  <FaRegEye
                    onClick={statusPassWord}
                    style={{
                      color: "white",
                      position: "absolute",
                      bottom: "0.5rem",
                      right: "1rem",
                    }}
                  ></FaRegEye>
                ) : (
                  <FaRegEyeSlash
                    onClick={statusPassWord}
                    style={{
                      color: "white",
                      position: "absolute",
                      bottom: "0.5rem",
                      right: "1rem",
                    }}
                  />
                )}
              </div>
              <p style={{ fontSize: "0.5rem", color: "red", margin: "0" }}>
                {alertPassword}
              </p>

              <div className="inputbox">
                <input
                  onChange={changeValue}
                  type={statusCP ? "text" : "password"}
                  required=""
                  name="comfirmPassword"
                  value={newUser.comfirmPassword}
                  // className={alertCPassword}
                />
                <label htmlFor="">Comfirm Password</label>
                {statusCP ? (
                  <FaRegEye
                    onClick={statusCPassWord}
                    style={{
                      color: "white",
                      position: "absolute",
                      bottom: "0.5rem",
                      right: "1rem",
                    }}
                  ></FaRegEye>
                ) : (
                  <FaRegEyeSlash
                    onClick={statusCPassWord}
                    style={{
                      color: "white",
                      position: "absolute",
                      bottom: "0.5rem",
                      right: "1rem",
                    }}
                  />
                )}
              </div>
              <p
                style={{
                  fontSize: "0.5rem",
                  color: "red",
                  margin: "0 0 1rem 0",
                }}
              >
                {alertCPassword}
              </p>

              <div className="forget"></div>
              <div style={{ position: "relative" }} className="login__btn">
                <div className="login--btn1"></div>
                <div className="login--btn2"></div>
                <div className="login--btn3"></div>
                <div className="login--btn4"></div>
                <button className="logIn-btn" onClick={createUser}>
                  Create Account
                </button>
              </div>
              <div className="register">
                <Link
                  to="/Login"
                  style={{
                    textDecoration: "none",
                    color: "white",
                    fontSize: "1rem",
                  }}
                >
                  <p>
                    <a>Login</a>
                  </p>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
