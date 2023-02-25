import React from 'react'
import ContactForm from '../components/ContactForm'
import Newsletter from '../components/Newsletter'
import {BsInstagram} from 'react-icons/bs'
import styles from '../styles/Contact.module.scss'
import Link from 'next/link'
import { client } from '../lib/client'
import {configQuery} from '../lib/queries'
import { NextSeo } from 'next-seo'
import ogimage from "../public/open_graph_default.jpg";

const Contact = ({config}) => {

  return (
    <>
    <NextSeo 
        title={`${config?.title} - Fitness Aesthetics Redefined`}
        description={config?.description || ""}
        canonical={config?.url}
        openGraph={{
          url: config?.url,
          title: `${config?.title}`,
          description: config?.description || "",
              images: [
                {
                  url: ogimage,
                  width: 800,
                  height: 600,
                  alt: ""
                }
              ],
              site_name: "Team Aesthetix"
            }}
            twitter={{
              cardType: "summary_large_image"
            }}
      />
    <div>
      <ContactForm page={'contact'}/>

      <div className={styles.instagram}>
        {/* <h1>Connect to me on any of the below links</h1> */}
        {/* <a href={config?.social[0]?.url} target='_blank' rel="noreferrer noopener">
          <BsInstagram />
        </a> */}
      </div>
      <div className={styles.newsletter}>
        {/* <Newsletter /> */}
      </div>
    </div>
    </>
  )
}

export const getServerSideProps = async () => {
  const config = await client.fetch(configQuery)

  return{
    props: {config}
  }
}

export default Contact