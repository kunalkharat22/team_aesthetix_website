import React, { useState } from 'react'
import logo from './logo.png'
import Link from 'next/link'
import {HiMenuAlt4, HiX} from 'react-icons/hi'
import {motion} from 'framer-motion'
import styles from './Navbar.module.scss'
import {BsFillCartFill} from 'react-icons/bs'
import { useStateContext } from '../context/StateContext'
import Cart from './Cart'
import { useRouter } from 'next/router';


const Navbar = () => {

  const [toggle, setToggle] = useState(false)
  const {showCart, setShowCart, totalQuantities} = useStateContext()
  const router = useRouter();

  return (
    <div className='navbar-container'>
      <img src='/logo.jpg' alt='logo'/>
      <Link href={'/'}>
        <h1>TEAM AESTHETIX</h1>
      </Link>
      <ul className='navbar-links'>
        {/* {['Personal coaching','Blogs','Products','Contact us'].map((item)=> ( */}
          {/* <li>
            <Link href={`/`}>
              <h1>Home</h1>
            </Link>
          </li> */}
          <li className={router.pathname === '/PersonalCoaching' ? 'active' : ''}>
            <Link href={`/PersonalCoaching`} as={`/PersonalCoaching`}>
              <h1>Online coaching</h1>
            </Link>
          </li>        
          <li className={router.pathname === '/Blogs' ? 'active' : ''}>
            <Link href={`/Blogs`}>
              <h1>Blogs</h1>
            </Link>
          </li>
          <li className={router.pathname === '/Products' ? 'active' : ''}>
            <Link href={`/Products`}>
              <h1>Products</h1>
            </Link>
          </li>
          <li className={router.pathname === '/Contact' ? 'active' : ''}>
            <Link href={`/Contact`}>
              <h1>Contact</h1>
            </Link>
          </li>        
      </ul>

      {totalQuantities>=1 ? 
      <div className='cartContainer'>
        <button type='button' className='cart-icon' onClick={() => setShowCart(true)}>
          <BsFillCartFill />
          <span className='cart-item-qty'>{totalQuantities}</span>
        </button>
        {showCart && <Cart />}
      </div>
      :
      <></>}
      {/* <div className='cartContainer'>
        <button type='button' className='cart-icon' onClick={() => setShowCart(true)}>
          <BsFillCartFill />
          <span className='cart-item-qty'>{totalQuantities}</span>
        </button>
        {showCart && <Cart />}
      </div> */}


      <div className='navbar-menu'>
        <HiMenuAlt4 className='navbar-svg' onClick={() => setToggle(true)}/>

        {
          toggle && (
            <motion.div
              initial={{ x: 300 }}
              whileInView={{x: [300, 0]}}
              transition={{ duration: 0.85, ease: 'easeOut'}}  
            >
              <HiX  onClick={() => setToggle(false)}/>
              <ul>
              {/* {['personal coaching','blogs','products','contact us'].map((item)=> ( */}
                {/* <li key={item}>
                  <Link href={`/${item}`}>
                    <a href={`#${item}`} onClick={() => setToggle(false)}>{item}</a>
                  </Link>
                </li> */}

                <li>
                  <Link href={`/`}>
                    <a onClick={() => setToggle(false)}>Home</a>
                  </Link>
                </li>
                
                <li>
                  <Link href={`/PersonalCoaching`}>
                    <a onClick={() => setToggle(false)}>Online coaching</a>
                  </Link>
                </li>
                {/* <li>
                  <Link href={`/Army`}>
                    <a onClick={() => setToggle(false)}>Our Army</a>
                  </Link>
                </li> */}
                <li>
                  <Link href={`/Blogs`}>
                    <a onClick={() => setToggle(false)}>Blogs</a>
                  </Link>
                </li>
                <li>
                  <Link href={`/Products`}>
                    <a onClick={() => setToggle(false)}>Products</a>
                  </Link>
                </li>
                <li>
                  <Link href={`/Contact`}>
                    <a onClick={() => setToggle(false)}>Contact</a>
                  </Link>
                </li>

              {/* ))} */}
              </ul>
            </motion.div>
          )
        }
      </div>
    </div>
  )
}

export default Navbar