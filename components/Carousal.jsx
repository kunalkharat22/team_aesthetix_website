import React, {useRef, useState} from 'react'
import { PortableText } from '../lib/client';
import styles from '../styles/PersonalCoaching.module.scss'
import {motion} from 'framer-motion'
import { urlFor } from '../lib/client'


const Carousal = ({sections, index, setIndex}) => {
  const slideshowRef = useRef(null);
  const [touchStartX, setTouchStartX] = useState(null);
  const [touchEndX, setTouchEndX] = useState(null);


  const handleTouchStart = (event) => {
    setTouchStartX(event.touches[0].clientX);
  };

  const handleTouchMove = (event) => {
    setTouchEndX(event.touches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (touchStartX && touchEndX) {
      if (touchStartX > touchEndX) {
        // Swipe left, move to next slide
        setIndex((prevIndex) => {
          if (prevIndex < 4 - 1) {
            return prevIndex + 1;
          } else {
            return 0;
          }
        });
      } else if (touchStartX < touchEndX) {
        // Swipe right, move to previous slide
        setIndex((prevIndex) => {
          if (prevIndex > 0) {
            return prevIndex - 1;
          } else {
            return 4 - 1;
          }
        });
      }
    }

    // Reset touch coordinates
    setTouchStartX(null);
    setTouchEndX(null);
  };

  // console.log(bg);

  return (
    <div className={styles.slideshow} 
    onTouchStart={handleTouchStart}
    onTouchMove={handleTouchMove}
    onTouchEnd={handleTouchEnd}>
      <motion.div
        className={styles.slideshowSlider}
        style={{ transform: `translate3d(${-index * 100}%, 0, 0)` }}
      >
        {sections.slice(2,).map((section, index) => (
          <div
            className={styles.carousalSlide}
            key={index}
            // style={{ backgroundImage: `url(${urlFor(section.image)})` }}
          >
            {/* <img src={urlFor(section.image)} alt="Banner Image"/> */}
            <div className={styles.content}>
              <h1>{section.title}</h1>
              <div className={styles.textBody1}>{section.desc && <PortableText value={section.desc} />}</div>
            </div>
          </div>
        ))}
      </motion.div>

      <div className={styles.slideshowDots}>
        {sections.slice(2,).map((_, idx) => (
          <div
            key={idx}
            className={`${styles.slideshowDot}${index === idx ? ` ${styles.active}` : ''}`}
            onClick={() => {
              setIndex(idx);
            }}
          ></div>
        ))}
      </div>
    </div>
  )
}

export default Carousal

