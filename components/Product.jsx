import React from 'react'
import styles from '../styles/Products.module.scss'
import Link from 'next/link'
import { urlFor } from '../lib/client'


const Product = ({product}) => {
  
   
  return (
    <Link href={`/Products/${product.slug.current}`}>
      <div className={styles.productCard}>
        <img src={urlFor(product.image[0])} className={styles.productImage} alt={`${product.title}-img`}/>
          <h1 className={styles.productName}>{product.title}</h1>
          <p className={styles.productPrice}><p style={{fontSize:'15px'}}>INR</p>{product.price}</p>
      </div>
    </Link>
  )
}

export default Product