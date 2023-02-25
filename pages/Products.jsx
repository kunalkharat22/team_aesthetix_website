import React from 'react'
import styles from '../styles/Products.module.scss'
import Link from 'next/link'
import {client} from '../lib/client'
import { urlFor } from '../lib/client'
import Product from '../components/Product.jsx'
import back from '../public/back.jpg'
import Newsletter from '../components/Newsletter'
import { configQuery } from '../lib/queries'
import { NextSeo } from 'next-seo'
import ogimage from "../public/open_graph_default.jpg";

const Products = ({productdata,config}) => {
 
  return (
    <>
    <NextSeo 
      title={`Products - ebooks and programs by ${config?.title}`}
      description={config?.description || ""}
      canonical={`${config?.url}/Products`}
      openGraph={{
        url: `${config?.url}/Products`,
        title: `${config?.title} - Products`,
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
      {/* <img className={styles.bannerImage} src={urlFor(productdata[0].image[0])}/> */}
      {/* <div className={styles.bgFlair}></div> */}
      <div className={styles.title}>        
        <h1>SHOP FOR EBOOKS AND PROGRAMS</h1>
      </div>
      <div className={`${styles.productsContainer} ${styles.bgFlair}`}>
      {productdata.length ?
        productdata?.map((product,index) => (
        <Product key={index} product={product}/>
      )):(
        <h1> New products coming soon </h1>
      )}
      </div>
      <div className={styles.coachingCta}>
        <h1>Not sure what to get?</h1>
        <Link href={`/PersonalCoaching`}>
          <button className='btn'>Try Personal Coaching</button>
        </Link>
      </div>
      <div className={styles.newsletter}>
        {/* <Newsletter /> */}
      </div>
      
    </div>
    </>
  )
}

export const getServerSideProps = async () => {
  const productQuery = '*[_type == "products"]'
  const productdata = await client.fetch(productQuery)
  const config = await client.fetch(configQuery);

  return{
    props: {productdata,config}
  }
}


export default Products