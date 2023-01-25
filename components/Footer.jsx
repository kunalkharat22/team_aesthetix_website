import React from 'react'
import {BsWhatsapp,BsInstagram} from 'react-icons/bs'
import {SiGmail} from 'react-icons/si'
import Link from 'next/link'


const Footer = () => {
  return (
    <div className='site-container'>
      {/* <h1>SUBSCRIBE TO OUR NEWSLETTER</h1>
      <p>Subscribe to our newsletter for expanding your knowledge about fitness....</p>
      <div className="revue-embed">
        <form action="https://www.getrevue.co/profile/kunalkharat22/add_subscriber" method="post" id="revue-form" name="revue-form"  target="_blank">
          <div className="revue-form-group">
            <input className="revue-form-field" placeholder="Your email address..." type="email" name="member[email]" id="member_email"/>
            <input className="revue-action-field" type="submit" value="Subscribe" name="member[subscribe]" id="member_submit"/>
          </div>
        </form>
      </div> */}

      <div className='socials-nav'>
        <div className='socials-embed'>
          <a href='https://wa.me/9552509634' target='_blank' rel="noreferrer noopener"><BsWhatsapp /></a>
          <a href='https://www.instagram.com/team.aesthetix/' target='_blank' rel="noreferrer noopener"><BsInstagram /></a>
          <a href='mailto:team.aesthetix@gmail.com' target='_blank' rel="noreferrer noopener"><SiGmail/></a>
        </div>

        <div className='footer-nav'>
            {['Personal Coaching','Blogs','Products','Contact us'].map((item,index)=> (
              // <li key={`link-${item}`}>
            
                <Link key={index} href={`/${item}`}>
                  <p>{item}</p>
                </Link>
              
            ))}
        </div>
      </div>
    </div>
  )
}

export default Footer