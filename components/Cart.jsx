import React, {useRef} from 'react'
import Link from 'next/link'
import { AiOutlineMinus, AiOutlinePlus, AiOutlineLeft, AiOutlineShopping } from 'react-icons/ai'
import { TiDeleteOutline} from 'react-icons/ti'
import toast from 'react-hot-toast'
import { useStateContext } from '../context/StateContext'
import { urlFor } from '../lib/client'
import getStripe from '../lib/getStripe'
import {motion} from 'framer-motion'


const Cart = () => {

  const cartRef = useRef()

  const { totalPrice, totalQuantities, cartItems, setShowCart, toggleCartItemQuantity, onRemove} = useStateContext()
  
  const handleCheckout = async () => {
    const stripe = await getStripe();

    const response = await fetch('/api/stripe', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(cartItems),
    })

    if(response.statusCode === 500) return

    const data = await response.json()

    toast.loading('Redirecting...')

    stripe.redirectToCheckout({sessionId: data.id})
  }

  return (
    <div className='cart-wrapper' ref={cartRef}>
      <motion.div initial={{ x: 300 }}
              whileInView={{x: [300, 0]}}
              transition={{ duration: 0.85, ease: 'easeOut'}}   className='cart-container'>
        <button 
          type='button' 
          className='cart-heading' 
          onClick={()=> setShowCart(false)}>
            <AiOutlineLeft />
            <span className='heading'>Your Cart</span>
            <span className='cart-num-items'>({totalQuantities} items)</span>
        </button>

        {cartItems.length < 1 && (
          <div className='empty-cart'>
            <AiOutlineShopping size={150}/>
            <h3>Your shopping bag is empty</h3>
            <Link href='/Products'>
              <button type='button' onClick={() => setShowCart(false)}  className='btn'>
                Continue looking...
              </button>
            </Link>
          </div>
        )}

        <div className='cart-product-container'>
          {cartItems.length >= 1 && cartItems.map((item) => (
            <div className='cart-product' key={item._id}>
              <img src={urlFor(item?.image[0])} className='cart-product-image'/>
              <div className='item-desc'>
                <div className='flex top'>
                  <h5>{item.title}</h5>
                  {/* <h4>???{item.price}</h4> */}
                  <h4>x{item.quantity}</h4>
                </div>

                <div className='flex bottom'>
                  {/* <div>
                    <p className='quantityDesc'>
                      <span className='minus' onClick={()=>toggleCartItemQuantity(item._id,'dec')}><AiOutlineMinus /></span>
                      <span className='num' onClick=''>{item.quantity}</span>
                      <span className='plus' onClick={()=>toggleCartItemQuantity(item._id,'inc')}><AiOutlinePlus /></span>
                    </p>
                  </div> */}

                  <button type='button' className='remove-item' onClick={() => onRemove(item)}>
                    <TiDeleteOutline />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
        {cartItems.length >=1 && (
          <div className='cart-bottom'>
            <div className='total'>
              <h3>Subtotal:</h3>
              <h3>???{totalPrice}</h3>
            </div>
            <div className='btn-container'>
              <button type='button' className='btn' onClick={handleCheckout}>Proceed to Checkout</button>
            </div>
          </div>
        )}
      </motion.div>
    </div>
  )
}

export default Cart