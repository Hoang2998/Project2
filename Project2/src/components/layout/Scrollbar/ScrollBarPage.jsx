import React from "react";
import { MDBContainer } from "mdbreact";
import "./Scroll.scss";
import HomePage from "../../../pages/Home/HomePage";

const ScrollBarPage = () => {
  const scrollContainerStyle = { width: "100%", maxHeight: "100vw" };
  return (
    <MDBContainer>
      <div className="scrollbar scrollbar-primary  mt-5 mx-auto" style={scrollContainerStyle}>
        {/* <HomePage></HomePage> */}
      </div>

      <div className="scrollbar my-5 mx-auto" style={scrollContainerStyle}>
        <img
          alt=""
          src="https://mdbootstrap.com/img/Photos/Others/img%20(51).webp"
        />
      </div>
    </MDBContainer>
  );
}
export default ScrollBarPage;
