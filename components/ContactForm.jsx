import React, { useState } from 'react'
import styles from '../styles/PersonalCoaching.module.scss'
import Script from 'next/script'
import { sendContactForm } from '../lib/api'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {GrFormNextLink} from 'react-icons/gr'
import Link from 'next/link'

const initValues = {
  name: "",
  email: "",
  phone: "",
  message: ""
}

const initState = { values: initValues }

const ContactForm = ({page}) => {

  const [state, setstate] = useState(initState)
  const [touched, setTouched] = useState({})

  const { values, isLoading, error } = state

  const onBlur = ({target}) => setTouched((prev) => ({...prev,
    [target.name]:true
  }))

  const handleChange = ({ target }) => setstate((prev) => ({
    ...prev,
    values: {
      ...prev.values,
      [target.name]: target.value
    }
  }))

  const onSubmit = async() => {
    event.preventDefault()
    setstate((prev) => ({
      ...prev,
      isLoading:true
    }))
    
    try {
      await sendContactForm(values)
      setTouched({})
      setstate(initState)
      toast.success("Message sent", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    } catch (error) {
      setstate((prev) => ({
        ...prev,
        isLoading:false,
        error: error.message
      }))
      
    }
  }

  // let divToRender;

  // if (props.stringProp === 'option1') {
  //     divToRender = <div>This is div 1</div>;
  // } else if (props.stringProp === 'option2') {
  //     divToRender = <div>This is div 2</div>;
  // } else {
  //     divToRender = <div>This is the default div</div>;
  // }


  return (
    <div className={styles.containerForm}>
      <ToastContainer />
        {
          page === 'coaching' ? 
          <><h1>LOOKING TO KICKSTART YOUR FITNESS JOURNEY?</h1>
          <p>Fill out that form and I&apos;ll make sure one of my team members gets back to you pronto. Let&apos;s do this!</p></>:
          page === 'contact' ? 
          <><h1>TO GET IN TOUCH FILL THE FORM BELOW</h1>
          <p style={{color:'#fff'}}>I&apos;ll make sure to get back to you pronto!</p></>:
          <h1>Nothing</h1>
        }
        
        {/* <h1>LOOKING TO KICKSTART YOUR FITNESS JOURNEY?</h1>
        <p>Fill out that form and I'll make sure one of my team members gets back to you pronto. Let's do this!</p> */}
      {error && (
        <p style={{ fontSize: "lg", color: 'red',marginTop: '1rem' }}>{error}</p>
      )}
      <div className={styles.contactForm}>
        <form onSubmit={onSubmit}>

          <input 
            className={`${styles.formField} ${touched.name && !values.name ? styles.error : ""}`}
            placeholder="Your Name" 
            type="text" 
            name="name" 
            value={values.name} 
            onChange={handleChange}
            onBlur={onBlur}             
            required />
            {touched.name && !values.name ? <div className={styles.errorMessage}>Required</div> : null}

          <input 
            className={`${styles.formField} ${touched.email && !values.email ? styles.error : ""}`}
            placeholder="Your Email" 
            type="email" 
            name="email" 
            value={values.email} 
            onChange={handleChange}
            onBlur={onBlur} 
            required />
            {touched.email && !values.email ? <div className={styles.errorMessage}>Required</div> : null}


          <input 
            className={`${styles.formField} ${touched.phone && !values.phone ? styles.error : ""}`}
            placeholder="Your Phone Number" 
            type="text" 
            value={values.phone} 
            onChange={handleChange}
            onBlur={onBlur} 
            name="phone" />
            {touched.phone && !values.phone ? <div className={styles.errorMessage}>Required</div> : null}


          <textarea 
            className={`${styles.formField} ${touched.message && !values.message ? styles.error : ""}`}
            placeholder="Message" 
            type="text" 
            name="message" 
            value={values.message} 
            onChange={handleChange}
            onBlur={onBlur} 
            rows={4} 
            required />
            {touched.message && !values.message ? <div className={styles.errorMessage}>Required</div> : null}


            <button
              className={`${styles.button} ${
                !values.name || !values.email || !values.phone || !values.message
                  ? styles.disabled
                  : styles.enabled
              }`}        
              disabled={isLoading || !values.name || !values.email || !values.phone || !values.message}
              // onClick={onSubmit}
            >
              {isLoading ? "Loading..." : "Submit"}
            </button>
        </form>
      </div>
        
        {
          page === 'coaching' ? 
          <div>
            <Link href={`/Products`}>
              <div className={styles.exploreNext}>
                <h1>EXPLORE OUR PROGRAMS</h1>
                <GrFormNextLink />
              </div>
            </Link>
          </div>:
          page === 'contact' ? 
          <></>:
          <></>
        }
        
        
        {/* <div className={styles.exploreNext}>
          <h1>EXPLORE OUR PROGRAMS</h1>
            <Link href={`/Products`}>
              <GrFormNextLink />
            </Link>
        </div> */}
        
      
    </div>
  )
}

export default ContactForm