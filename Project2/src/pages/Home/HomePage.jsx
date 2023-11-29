import React, { useEffect, useState } from 'react'
import './HomePage.scss'
import { Parallax, ParallaxLayer } from '@react-spring/parallax'
import Text from './Text'
import '../../components/layout/Scrollbar/Scroll.scss'
import Footer from '../../components/layout/Footer/Footer'
import {Link} from 'react-router-dom'

export default function HomePage() {
  const [dataUser,setDataUser] = useState("") 
  useEffect(()=>{
    fetch("http://localhost:8008/Account")
    .then(res => res.json())
    .then(data =>{
      
    })
  },[])
  return (
    <>
     <div className="App scrollbar scrollbar-primary">
      <Parallax pages={4} style={{ top: '0', left: '0' }} class="animation">
        <ParallaxLayer offset={0} speed={0.25}>
          <div className="animation_layer parallax" id="artback"></div>
        </ParallaxLayer>
        <ParallaxLayer offset={0} speed={0.3}>
          <div className="animation_layer parallax" id="mountain"></div>
        </ParallaxLayer>
        <ParallaxLayer offset={0} speed={-0.1}>
          <div className="animation_layer parallax" id="logoland"></div>
          <div className=" parallax" id='birdfly'>
              <div  className=" parallax" id='bird'></div>
          </div>
          <div className=" parallax" id='birdfly1'>
              <div  className=" parallax" id='bird'></div>
          </div>
          
        </ParallaxLayer>
        <ParallaxLayer offset={0} speed={0.3}>
          <div className="animation_layer parallax" id="jungle1"></div>
        </ParallaxLayer>
        <ParallaxLayer offset={0} speed={0.35}>
          <div className="animation_layer parallax" id="jungle2"></div>
        </ParallaxLayer>
        <ParallaxLayer offset={0} speed={0.5}>
          <div className="animation_layer parallax" id="jungle3"></div>
        </ParallaxLayer>
        <ParallaxLayer offset={0} speed={0.45}>
          <div className="animation_layer parallax" id="jungle4"></div>
        </ParallaxLayer>
        <ParallaxLayer offset={0} speed={0.40}>
          <div className="animation_layer parallax" id="manonmountain"></div>
        </ParallaxLayer>
        <ParallaxLayer offset={0} speed={0.35}>
          <div className="animation_layer parallax" id="jungle5"></div>
        </ParallaxLayer>
        <ParallaxLayer offset={1} speed={0.3}>
          <Text></Text>
        </ParallaxLayer>
        <ParallaxLayer offset={1} speed={0.6}>
          <div className="animation_layer parallax" id='cumeo'></div>
        </ParallaxLayer>
        <ParallaxLayer offset={1} speed={0.25}>
        <div className="animation_layer parallax" id='fire2'></div>
        </ParallaxLayer>
        <ParallaxLayer offset={2} speed={0.3}>
          <div className="animation_layer parallax" id="bg21"></div>
          <div className="animation_layer parallax" id='fire'></div>
          <Link to='/Store'>
          <div className="" id='btn'>
            <button className='btn__btn'>Go to Store</button>
          </div>
          </Link>
        </ParallaxLayer>
        {/* <ParallaxLayer offset={2} speed={0.3}>
        <div className="animation_layer parallax" id='bg7'></div>
        </ParallaxLayer>
        <ParallaxLayer offset={2} speed={0.35}>
        <div className="animation_layer parallax" id='bg6'></div>
        </ParallaxLayer>
        <ParallaxLayer offset={2} speed={0.35}>
        <div className="animation_layer parallax" id='bg5'></div>
        </ParallaxLayer>
        <ParallaxLayer offset={2} speed={0.40}>
        <div className="animation_layer parallax" id='bg4'></div>
        </ParallaxLayer>
        <ParallaxLayer offset={2} speed={0.40}>
        <div className="animation_layer parallax" id='bg3'></div>
        </ParallaxLayer>
        <ParallaxLayer offset={2} speed={0.45}>
        <div className="animation_layer parallax" id='bg1'></div>
         <div className="animation_layer parallax" id='fire'></div>
          <Link to='/Store'>
          <div className="" id='btn'>
            <button className='btn__btn'>Go to Store</button>
          </div>
          </Link>
        </ParallaxLayer> */}
        <ParallaxLayer offset={3} speed={0.35} >
          <div className="animation_layer parallax HomeFooter">
          <Footer></Footer>
          </div>
        </ParallaxLayer>
        
      </Parallax>
    </div>
    </>
  )
}
