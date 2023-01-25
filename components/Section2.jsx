import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { urlFor } from '../lib/client'
import {motion} from 'framer-motion'
import InstaFeed from './InstaFeed'
import { getFeed } from '../lib/instagram'


const Section2 = ({section}) => {

  const [currentIndex, setCurrentIndex] = useState(0)
  
  const [feed, setFeed] = useState([]);


  const handleClick = (index) => {
    setCurrentIndex(index)
  }

  
  const [sliceNumber, setSliceNumber] = useState(3);
  const [screenSize, setScreenSize] = useState("")

  useEffect(()=>{
    if(screenSize === "small"){
      setSliceNumber(2);
    }else if(screenSize === "large"){
      setSliceNumber(3);
    }
  },[screenSize])

  const handleScreenSize = () => {
    if (window.innerWidth < 580) {
      setScreenSize("small")
    } else {
      setScreenSize("large")
    }
  }

  useEffect(() => {
    getFeed().then(data => {
      setFeed(data);
    });

    handleScreenSize();
    window.addEventListener("resize", handleScreenSize);
    return () => window.removeEventListener("resize", handleScreenSize);
  }, []);


  
  return (
    <div className='section-container'>
      <div className={`section-container-bg`} style={{marginTop:'2.5rem'}}>
        <motion.div 
          whileInView={{y: [100,50,0],opacity: [0,0,1]}}
          transition={{duration: 0.5}}
          className='section-content blog'          
        >
          <h1>I USE MY INSTAGRAM FEED AS A 'MINI BLOG'</h1>
          {/* <img src={urlFor(section.image[0])}/>
          {section.largeText2 && <h1>{section.largeText2[0]}</h1>} 
          {section.desc2 && <p>{section.desc2[0]} <a style={{ textDecoration: 'underline',fontStyle: 'italic'}}> ...Read More</a></p>} */}
          <InstaFeed feed={feed} rows={2} columns={sliceNumber}/>

        </motion.div>
        
        {section.image.length && (
          <div key={currentIndex} className='section-content-2' style={{maxWidth:'25vw',maxHeight:'30rem'}}>
            <h1>{section.largeText1}</h1>
            <p>{section.desc1}</p>
            <div className='next'>
              <Link href={`/blogs`}>
                <img src='./next.svg'/>
              </Link>
            </div>
           
          </div>
        )}

      </div>
    </div>
  )
}

export default Section2