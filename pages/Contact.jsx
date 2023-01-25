import React from 'react'
import ContactForm from '../components/ContactForm'
import Newsletter from '../components/Newsletter'
import {BsInstagram} from 'react-icons/bs'
import styles from '../styles/Contact.module.scss'
import Link from 'next/link'

const Contact = () => {
  return (
    <div>
      <ContactForm page={'contact'}/>

      <div className={styles.instagram}>
        <h1>Connect to us on Instagram:</h1>
        <a href='https://www.instagram.com/team.aesthetix/'>
          <BsInstagram />
        </a>
      </div>
      <div>
        <Newsletter />
      </div>
    </div>
  )
}

export default Contact