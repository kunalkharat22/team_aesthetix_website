import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { urlFor } from '../lib/client'
import {motion} from 'framer-motion'
import Product from './Product'

const Section3 = ({section, products}) => {

  const [currentIndex, setCurrentIndex] = useState(0)
  const limitedData = products.slice(0,3);

  const [sliceNumber, setSliceNumber] = useState(3);
  const [screenSize, setScreenSize] = useState("")

  useEffect(()=>{
    if(screenSize === "small"){
      setSliceNumber(3);
    }else if(screenSize === "medium"){
      setSliceNumber(2);
    }else if(screenSize === "large"){
      setSliceNumber(3);
    }
  },[screenSize])

  const handleScreenSize = () => {
    if (window.innerWidth < 638) {
      setScreenSize("small")
    } else if (window.innerWidth >= 638 && window.innerWidth < 1365) {
      setScreenSize("medium")
    } else {
      setScreenSize("large")
    }
  }

  useEffect(() => {
    handleScreenSize();
    window.addEventListener("resize", handleScreenSize);
    return () => window.removeEventListener("resize", handleScreenSize);
  }, []);

  const handleClick = (index) => {
    setCurrentIndex(index)
  }

  // console.log('slide',products[0].image[0]);
  
  return (
    <div className='section-container'>
      {/* <div className={`section-container-bg`}> */}
        <div className='bg-flair'>
          {/* <div className='section-content' style={{color:'#000', width:'25%'}}>
            <h1 className='p-text'>{section.largeText1}</h1>
            <p className='p-text'>{section.desc1}</p>
            <div className='next'>
              <Link href={`/Products`}>
                <img src='./next.svg' style={{display:'block'}}/>
              </Link>
            </div>  
          </div> */}
          
          <motion.div 
            whileInView={{y: [100,50,0],opacity: [0,0,1]}}
            transition={{duration: 0.2}}
            className='section-content-product' 
          >
            <div className='section-content-product-text'>
              <h1 className='p-text'>{section.largeText1}</h1>
              <p className='p-text'>{section.desc1}</p>
              <div className='next'>
                <Link href={`/Products`}>
                  <img src='./next.svg' style={{display:'block'}} alt='next'/>
                </Link>
              </div>
            </div>  
            {products.length ?
              limitedData.slice(0,sliceNumber).map((product)=>(
              
              <Product key={product._id} product={product}/>
              
              
              // <Link href={`/${product.title}`}>
              //   <motion.div
              //    whileHover={{scale: [1,0.95]}}
              //    className='section-content-2' 
              //    style={{width:'30vw'}}>
              //     {/* {section.midText1 && <h1>{section.midText1[0]}</h1>} */}
              //     <img src={urlFor(product.image[0])} style={{width: '20vw'}}/>
              //     <h1>{product.title}</h1>
              //   </motion.div>
              // </Link>


            )):(
              <h1> New products coming soon </h1>
            )}
            
            {/* <div className='section-content-2' style={{maxHeight:'100vh'}}>
              {section.midText1 && <h1>{section.midText1[0]}</h1>}
              <img src={urlFor(section.image[0])} style={{maxWidth: '25vw'}}/>
              <h1>{section.largeText2[0]}</h1>
              {section.desc2 && <p>{section.desc2[0]}</p>}
            </div> */}

            {/* <div className='section-content-2-btns'>
                  <div className='app__flex' onClick={() => handleClick(currentIndex === 0 ? section.image.length - 1 : currentIndex - 1)}>
                    <p>prev</p>
                  </div>
                  <div className='app__flex' onClick={() => handleClick(currentIndex === section.image.length - 1 ? 0 : currentIndex + 1)}>
                    <p>next</p>
                  </div>              
                </div> */}

           
            {/* <div className='section-content-2'>
              {section.midText1 && <h1>{section.midText1[0]}</h1>}
              {console.log(section.midText1)}
              <img src={urlFor(section.image[0])}/>
              <h1>{section.largeText2[0]}</h1>
              {section.desc2 && <p>{section.desc2[0]}</p>}
            </div> */}


          </motion.div>
        </div>
      {/* </div> */}
    </div>
  )
}

export default Section3