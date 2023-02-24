import React from 'react'
import ContactForm from '../components/ContactForm'
import Newsletter from '../components/Newsletter'
import {BsInstagram} from 'react-icons/bs'
import styles from '../styles/Contact.module.scss'
import Link from 'next/link'
import { client } from '../lib/client'

const Contact = ({config}) => {

  return (
    <div>
      <ContactForm page={'contact'}/>

      <div className={styles.instagram}>
        <h1>Connect to me on any of the below links</h1>
        {/* <a href={config?.social[0]?.url} target='_blank' rel="noreferrer noopener">
          <BsInstagram />
        </a> */}
      </div>
      <div className={styles.newsletter}>
        {/* <Newsletter /> */}
      </div>
    </div>
  )
}

export const getServerSideProps = async () => {
  const configQuery = `
  *[_type == "siteconfig"][0] {
    ...,
  }
  `
  const config = await client.fetch(configQuery)

  return{
    props: {config}
  }
}

export default Contact