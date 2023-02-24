import React, { useState } from 'react'
import styles from '../../styles/ProductDetails.module.scss'
import { client, urlFor } from '../../lib/client'
import { AiOutlineMinus, AiOutlinePlus, AiFillStar, AiOutlineStar } from 'react-icons/ai'
import {BsFillCartFill} from 'react-icons/bs'
import Product from '../../components/Product'
import Newsletter from '../../components/Newsletter'
import {motion} from 'framer-motion'
import {useStateContext} from '../../context/StateContext'
import ImageModal from '../../components/ImageModal'

const ProductDetails = ({product,productData}) => {

  const {desc, image, subtitle, price, title} = product

  const [index, setIndex] = useState(0)
  const [showModal, setShowModal] = useState(false)
  const [imageUrl, setImageUrl] = useState(null)

  const {decQty, incQty, qty, onAdd, setShowCart} = useStateContext();

  const handleOpenModal = (url) => {
    setImageUrl(url)
    setShowModal(true)
  }

  const handleCloseModal = () => {
    setShowModal(false)
  }

  const handleBuyNow = () => {
    onAdd(product, qty)

    setShowCart(true)
  }
  
  return (
    <div className={styles.mainContainer}>
      <div className={styles.productDetailContainer}>
        <div className={styles.imageContainer}>
          <motion.div 
            key={index}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className={styles.mainImageContainer}
          >
            <img 
              src={urlFor(image && image[index])} 
              className={styles.productDetailImage}
              onClick={() => handleOpenModal(urlFor(image[index]))}
            />
          </motion.div>
          <div className={styles.smallImagesContainer}>
            {image.map((item,i) => (
              <motion.img 
                src={urlFor(item)}
                className={i === index ? `${styles.smallImage} ${styles.selectedImage}` : `${styles.smallImage}`}
                onClick={() => setIndex(i)}
                whileHover={{ scale: 1.1}}
                whileTap={{ scale: 0.9 }}
                key={i}
              />
              ))}
          </div>
        </div>

        <div className={styles.productDetailsDesc}>
            <h1>{title}</h1>
            <h1 style={{fontSize:'20px'}}>{subtitle}</h1>
          <div className={styles.reviews}>
            <div>
              <AiFillStar />
              <AiFillStar />
              <AiFillStar />
              <AiFillStar />
              <AiOutlineStar />
            </div>
            <p>
              (20)
            </p>
          </div>
          <p>{desc}</p>
          <p className={styles.price}><p style={{fontSize:'15px',marginTop:'0'}}>INR</p>{product.price}</p>
          {/* <div className={styles.quantity}>
            <h1>Quantity:</h1>
            <p className={styles.quantityDesc}>
              <span className={styles.minus} onClick={decQty}><AiOutlineMinus /></span>
              <span className={styles.num}>{qty}</span>
              <span className={styles.plus} onClick={incQty}><AiOutlinePlus /></span>
            </p>
          </div> */}
          <div className={styles.buttons}>
            <button type='button' className={styles.addToCart} onClick={() => onAdd(product,qty)}><BsFillCartFill />Add to Cart</button>
            <button type='button' className={styles.buyNow} onClick={handleBuyNow}>Buy Now</button>
          </div>
        </div>
      </div>

      <div className={styles.maylikeProductsWrapper}>
        <h1>You may also like</h1>
        <div className={styles.maylikeProductsContainer}>
          {productData.map((item) => (            
          <Product key={item._id} product={item}/>
          ))}
        </div>
      </div>
      {/* <Newsletter /> */}
      { showModal ? <ImageModal imageUrl={imageUrl} onClose={handleCloseModal} /> : null }
    </div>
  )
}

export const getStaticPaths = async () => {
  const query = `*[_type== "product"] {
    slug {
      current
    }
  }  
  `

  const products = await client.fetch(query)

  const paths = products.map((product) => ({
    params: {
      slug: product.slug.current
    }
  }))

  return {
    paths,
    fallback: 'blocking'
  }
}

export const getStaticProps = async ({params:
{slug}}) => {
  const query = `*[_type == "products" && slug.current == '${slug}'][0]`
  const product = await client.fetch(query)

  const productQuery = '*[_type == "products"]'
  const productData = await client.fetch(productQuery)


  return{
    props: {product,productData}
  }
}

export default ProductDetails