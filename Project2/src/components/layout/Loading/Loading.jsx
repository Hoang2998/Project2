import React from "react";
import bg from '../../../assets/videos/video.mp4'
import './Loading.scss'



export default function Loading() {
  return (
    <>
   
        <div className="Loadingbanner">
        <video autoPlay muted loop className="myVideo">
          <source src={bg} type="video/mp4" />
        </video>
        <div className="Loadingcontent">
          <h2 className="Loadingh2">LOAdiNG!</h2>
          <div className="dots">
            <div className="dot dot1" />
            <div className="dot dot2" />
            <div className="dot dot3" />
          </div>
          <div className="des">
            <br />
            Wellcome to my store SharkGame
          </div>
        </div>
      </div>

      
    </>
  );
}
