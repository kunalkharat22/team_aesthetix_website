import React, { useEffect, useState } from 'react'
import { urlFor } from '../lib/client'
import AnimatedTitle from './AnimatedTitle';


const Banner = ({bannerData}) => {

  console.log('banner',bannerData.buttonLink);

  // const [screenSize, setScreenSize] = useState("")

  // const handleScreenSize = () => {
  //     if (window.innerWidth < 767) {
  //       setScreenSize("small")
  //     } else {
  //       setScreenSize("large")
  //     }
  //   }
  // useEffect(() => {
  //     getFeed().then(data => {
  //       setFeed(data);
  //     });
  
  //     handleScreenSize();
  //     window.addEventListener("resize", handleScreenSize);
  //     return () => window.removeEventListener("resize", handleScreenSize);
  //   }, []);
  

  return (
    <div className='banner-container'>
      <img className='bg-img' src={urlFor(bannerData.image)}/>
      <div className='banner-content'> 
        {/* <img src={urlFor(bannerData.image)}/> */}
        <div className='banner-text'>
          <h1>{bannerData.largeText1}</h1>
          <p>{bannerData.desc}</p>
          <a className='revue-action-field' href={`/Products/${bannerData.buttonLink}`}>{bannerData.buttonText}</a>
          <div className='banner-box-container'>
            {bannerData.boxes.map((box) => 
            ( <>
            
              <div className='banner-box'>  
                <img src={urlFor(box.boxImage)}/>
                <p>{box.boxTitle}</p>
              </div>
              <div className='banner-box-animate'>                  
                <AnimatedTitle text={box.boxTitle}/>
              </div>
              </>
            )
            )}
          </div>
          
          {/* <img src='/ExploreMore.svg' style={{position:'absolute',bottom:'0',margin:'0'}}/> */}
        </div>
      </div> 
    </div>
  )
}

export default Banner