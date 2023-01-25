import React, { useState, useEffect } from 'react'
import styles from '../styles/PersonalCoaching.module.scss'
import {client} from '../lib/client'
import { urlFor } from '../lib/client'
import { HiChevronDoubleLeft, HiChevronDoubleRight } from 'react-icons/hi'
import {motion} from 'framer-motion'
import ContactForm from '../components/ContactForm'

const PersonalCoaching = ({coachingSections,testData,transformationsdata}) => {
  const [slideIndex, setSlideIndex] = useState(1)
  const [box, setBox] = useState('')
  const [currentIndex, setCurrentIndex] = useState(0);

  
  const nextSlide = () => {
    if(slideIndex !== transformationsdata.length){
        setSlideIndex(slideIndex + 1)
    } 
    else if (slideIndex === transformationsdata.length){
        setSlideIndex(1)
    }
}

const prevSlide = () => {
    if(slideIndex !== 1){
        setSlideIndex(slideIndex - 1)
    }
    else if (slideIndex === 1){
        setSlideIndex(transformationsdata.length)
    }
}

const moveDot = index => {
  setSlideIndex(index)
}

  return (
    <div className={styles.mainContainer}>
      <div className={`${styles.container1} ${styles.bannerContainer}`}>
        <motion.div
          whileInView={{y: [100,50,0],opacity: [0,0,1]}}
          transition={{duration: 0.8}}
        >
          <img src={urlFor(coachingSections[0].image)} alt="Banner Image"/>
        </motion.div>
        <motion.div 
          whileInView={{y: [-100,-50,0],opacity: [0,0,1]}}
          transition={{duration: 0.8}}
          className={styles.bannerTextContainer}
        >
          <h1>{coachingSections[0].title}</h1>
          <p>{coachingSections[0].desc}</p>
        </motion.div>
      </div>
      <div className={`${styles.container2} ${styles.bannerContainer}`}>
        <motion.div
          whileInView={{y: [-100,-50,0],opacity: [0,0,1]}}
          transition={{duration: 0.8}}
        >
          <img src={urlFor(coachingSections[1].image)} alt="Banner Image"/>
        </motion.div>
        <motion.div 
          whileInView={{y: [100,50,0],opacity: [0,0,1]}}
          transition={{duration: 0.8}}
          className={styles.bannerTextContainer}
        >
          <h1>{coachingSections[1].title}</h1>
          <p>{coachingSections[1].desc}</p>
        </motion.div>
      </div>

      <div className={styles.containerTransformation}>
        <h1>TRANSFORMATION DIARIES</h1>
        <div className={styles.bgFlair}></div>
        <div className={styles.containerSlider}>
            {transformationsdata.map((obj, index) => {
                return (
                    <div
                    key={obj._id}
                    className={slideIndex === index + 1 ? `${styles.slide} ${styles.activeAnim}` : styles.slide}
                    // className={styles.slide}
                    >  
                        <img 
                        src={urlFor(obj.image[0])} 
                        />
                        <p>{obj.desc}</p>
                    </div>
                )
            })}
            <button
              onClick={nextSlide}
              className={`${styles.btnSlide} ${styles.next}`}
            >
              <HiChevronDoubleRight />
            </button>

            <button
              onClick={prevSlide}
              className={`${styles.btnSlide} ${styles.prev}`}
            >
              <HiChevronDoubleLeft />
            </button>
                    
            {/* <div className={styles.containerDots}>
                {Array.from({length: 3}).map((item, index) => (
                    <div 
                    onClick={() => moveDot(index + 1)}
                    className={slideIndex === index + 1 ? `${styles.dot} ${styles.active}` : `${styles.dot}`}
                    ></div>
                ))}
            </div> */}
        </div>
      </div>
      <div className={styles.containerTestimonials}>
        <h1>TESTIMONIALS</h1>
        <div className={styles.bgFlair}></div>
        <div className={styles.bgFlair2}></div>
          <div className={styles.testimonialsSlider}>
            {testData.map((obj,index) => {
              return(
                <div 
                  key={obj._id}
                  className={slideIndex === index + 1 ? `${styles.slide} ${styles.activeAnim}` : styles.slide}
                >
                  <p>{obj.desc}</p>
                  <p>-{obj.name}</p>
                </div>
              )
            })}
            
          </div>
          <button
              onClick={nextSlide}
              className={`${styles.btnSlide} ${styles.next}`}
            >
              <HiChevronDoubleRight />
            </button>

            <button
              onClick={prevSlide}
              className={`${styles.btnSlide} ${styles.prev}`}
            >
              <HiChevronDoubleLeft />
            </button>

            {/* <div className={styles.containerDots}>
                {Array.from({length: 3}).map((item, index) => (
                    <div 
                    onClick={() => moveDot(index + 1)}
                    className={slideIndex === index + 1 ? `${styles.dot} ${styles.active}` : `${styles.dot}`}
                    ></div>
                ))}
            </div> */}
        
      </div>
      <ContactForm page={'coaching'} />
    </div>
  )
}



export const getServerSideProps = async () => {
  const query = '*[_type == "coaching"]'
  const coachingSections = await client.fetch(query)

  const testQuery = '*[_type == "testimonials"]'
  const testData = await client.fetch(testQuery)

  const transformationsQuery = '*[_type == "transformations"]'
  const transformationsdata = await client.fetch(transformationsQuery)

  return{
    props: {coachingSections,testData,transformationsdata}
  }
}


export default PersonalCoaching