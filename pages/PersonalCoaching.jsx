import React, { useState, useEffect, useRef } from 'react'
import styles from '../styles/PersonalCoaching.module.scss'
import {client} from '../lib/client'
import { urlFor } from '../lib/client'
import { HiChevronDoubleLeft, HiChevronDoubleRight } from 'react-icons/hi'
import {motion} from 'framer-motion'
import ContactForm from '../components/ContactForm'
import { PortableText } from '../lib/client'
import Carousal from '../components/Carousal'
import {configQuery} from '../lib/queries'
import { NextSeo } from 'next-seo'
import ogimage from "../public/open_graph_default.jpg";

const delay = 20000;

const PersonalCoaching = ({coachingSections,testData,transformationsdata,config}) => {
  const [slideIndex, setSlideIndex] = useState(1)
  const [slideIndex1, setSlideIndex1] = useState(1)
  const [box, setBox] = useState('')
  const [currentIndex, setCurrentIndex] = useState(0);

  const [carousalIndex, setCarousalIndex] = useState(0);
  const timeoutRef = useRef(null);
  
  const resetTimeout = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  }

  useEffect(() => {
    resetTimeout();
    timeoutRef.current = setTimeout(
      () =>
        setCarousalIndex((prevIndex) =>
          prevIndex === 4 - 1 ? 0 : prevIndex + 1
        ),
      delay
    );

    return () => {
      resetTimeout();
    };
  }, [carousalIndex]);
   
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

const nextSlide1 = () => {
  if(slideIndex1 !== testData.length){
      setSlideIndex1(slideIndex1 + 1)
  } 
  else if (slideIndex1 === testData.length){
      setSlideIndex1(1)
  }
}

const prevSlide1 = () => {
  if(slideIndex1 !== 1){
      setSlideIndex1(slideIndex1 - 1)
  }
  else if (slideIndex1 === 1){
      setSlideIndex1(testData.length)
  }
}

const moveDot = index => {
  setSlideIndex(index)
}

const scrollToSection = () => {
  const section = document.getElementById('contact');
  window.scrollTo({
    top: section.offsetTop,
    behavior: 'smooth'
  });
};

// console.log(coachingSections);

  return (
    <>
    <NextSeo 
      title={`Online Personal Coaching - ${config?.title}`}
      description={config?.description || ""}
      canonical={`${config?.url}/PersonalCoaching`}
      openGraph={{
        url: `${config?.url}/PersonalCoaching`,
        title: `${config?.title} - Online Coaching`,
        description: config?.description || "",
            images: [
              {
                url: ogimage,
                width: 800,
                height: 600,
                alt: config?.title
              }
            ],
            site_name: "Team Aesthetix"
          }}
          twitter={{
            cardType: "summary_large_image"
          }}
    />
    <div className={styles.mainContainer}>
      
      <div className={`${styles.container1} ${styles.bannerContainer}`}>
        <motion.div
          whileInView={{y: [100,50,0],opacity: [0,0,1]}}
          transition={{duration: 0.8}}
        >
          <img style={{width:'30vw'}} src={urlFor(coachingSections[0].image)} alt="Banner Image"/>
        </motion.div>
        <motion.div 
          whileInView={{y: [-100,-50,0],opacity: [0,0,1]}}
          transition={{duration: 0.8}}
          className={styles.bannerTextContainer}
        >
          <h1>{coachingSections[0].title}</h1>
          <div className={styles.textBody}>{coachingSections[0].desc && <PortableText value={coachingSections[0].desc} />}</div>
          <button className='btn' onClick={scrollToSection}>Start now</button>
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
          <div className={styles.textBody}>{coachingSections[1].desc && <PortableText value={coachingSections[1].desc} />}</div>
        </motion.div>
      </div>
      
      
      
        <motion.div
          whileInView={{y: [-100,-50,0],opacity: [0,0,1]}}
          transition={{duration: 0.8}}
          className={`${styles.container3}`}
        >
          {/* {coachingSections.slice(2,).map((section,index)=>( */}
            <Carousal sections={coachingSections} index={carousalIndex} setIndex={setCarousalIndex}/>
            {/* <img src={urlFor(section.image)} alt="Banner Image"/> */}
          {/* ))} */}
          
        </motion.div>      
      


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
                        alt='transformation-img' 
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
                  className={slideIndex1 === index + 1 ? `${styles.slide} ${styles.activeAnim}` : styles.slide}
                >
                  <p>{obj.desc}</p>
                  <p>-{obj.name}</p>
                </div>
              )
            })}
            <button
              onClick={nextSlide1}
              className={`${styles.btnSlide} ${styles.next}`}
            >
              <HiChevronDoubleRight />
            </button>

            <button
              onClick={prevSlide1}
              className={`${styles.btnSlide} ${styles.prev}`}
            >
              <HiChevronDoubleLeft />
            </button>
          </div>
          

            {/* <div className={styles.containerDots}>
                {Array.from({length: 3}).map((item, index) => (
                    <div 
                    onClick={() => moveDot(index + 1)}
                    className={slideIndex === index + 1 ? `${styles.dot} ${styles.active}` : `${styles.dot}`}
                    ></div>
                ))}
            </div> */}
        
      </div>
      <div id='contact'>
        <ContactForm page={'coaching'} />
      </div>
    </div>
    </>
  )
}



export const getServerSideProps = async () => {
  const query = '*[_type == "coaching"] | order(index asc)'
  const coachingSections = await client.fetch(query)

  const testQuery = '*[_type == "testimonials"]'
  const testData = await client.fetch(testQuery)

  const transformationsQuery = '*[_type == "transformations"]'
  const transformationsdata = await client.fetch(transformationsQuery)

  const config = await client.fetch(configQuery)

  return{
    props: {coachingSections,testData,transformationsdata,config}
  }
}


export default PersonalCoaching