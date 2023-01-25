import React from 'react'
import styles from '../styles/Products.module.scss'
import Link from 'next/link'
import {client} from '../lib/client'
import { urlFor } from '../lib/client'
import Product from '../components/Product.jsx'
import back from '../public/back.jpg'

const Products = ({productdata}) => {
 
  return (
    <div className={styles.mainContainer}>
      {/* <img className={styles.bannerImage} src={urlFor(productdata[0].image[0])}/> */}
      <div className={styles.bgFlair}></div>
      <div className={styles.title}>        
        <h1>SHOP FOR EBOOKS AND PROGRAMS</h1>
      </div>
      <div className={styles.productsContainer}>
      {productdata?.map((product,index) => (
        <Product key={index} product={product}/>
      ))}
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