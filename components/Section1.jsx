import Link from 'next/link'
import React, { useState } from 'react'
import { urlFor } from '../lib/client'
import { HiChevronDoubleLeft, HiChevronDoubleRight } from 'react-icons/hi'
import {motion} from 'framer-motion'


const Section1 = ({section}) => {

  const [currentIndex, setCurrentIndex] = useState(0)

  const handleClick = (index) => {
    setCurrentIndex(index)
  }

  // console.log('slide',section);
  
  return (
    <div className='section-container'>
      <div className='section-container-bg'>
        <div className='section-content'>
          <h1 className='p-text'>{section.largeText1}</h1>
          <p className='p-text'>{section.desc1}</p>
          <div className='next'>
            <Link href={`/PersonalCoaching`} as={`/PersonalCoaching`}>
              <img src='./next.svg' style={{display:'block'}}/>
            </Link>
          </div>  
        </div>
        <div className='section-content-2'>
        {section.image.length && (
          <motion.div 
            initial={{opacity:0}}
            whileInView={{x: [-100,-50,0],opacity: [0,0,1]}}
            transition={{duration: 0.75}}
            key={currentIndex}             
            >
            {section.midText1 && <h1>{section.midText1[currentIndex]}</h1>}
            <img className='section-content-2-img' src={urlFor(section.image[currentIndex])}/>
            <h1>{section.largeText2[currentIndex]}</h1>
            {section.desc2 && <p>{section.desc2[currentIndex]}</p>}
            
            
            <div className='section-content-2-btns'>
              <div onClick={() => handleClick(currentIndex === 0 ? section.image.length - 1 : currentIndex - 1)}>
                <HiChevronDoubleLeft />
              </div>
              <div onClick={() => handleClick(currentIndex === section.image.length - 1 ? 0 : currentIndex + 1)}>
                <HiChevronDoubleRight />
              </div>              
            </div>
          </motion.div>
        )}
        </div>


        {/* <div className='section-content-2'>
          <img src={urlFor(section.image[0])}/>
          <h1>{section.largeText2[0]}</h1>
          <p>{section.desc2[0]}</p>
        </div> */}



      </div>
    </div>
  )
}

export default Section1