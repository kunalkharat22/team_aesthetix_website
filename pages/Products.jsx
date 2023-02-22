import React from 'react'
import styles from '../styles/Products.module.scss'
import Link from 'next/link'
import {client} from '../lib/client'
import { urlFor } from '../lib/client'
import Product from '../components/Product.jsx'
import back from '../public/back.jpg'
import Newsletter from '../components/Newsletter'

const Products = ({productdata}) => {
 
  return (
    <div className={styles.mainContainer}>
      {/* <img className={styles.bannerImage} src={urlFor(productdata[0].image[0])}/> */}
      <div className={styles.bgFlair}></div>
      <div className={styles.title}>        
        <h1>SHOP FOR EBOOKS AND PROGRAMS</h1>
      </div>
      <div className={styles.productsContainer}>
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
        <Newsletter />
      </div>
      
    </div>
  )
}

export const getServerSideProps = async () => {
  const productQuery = '*[_type == "products"]'
  const productdata = await client.fetch(productQuery)

  return{
    props: {productdata}
  }
}


export default Products