import React from 'react'

const Newsletter = () => {
  return (
    <div className='footer-container'>
      <h1>SUBSCRIBE TO OUR NEWSLETTER</h1>
      <p>Subscribe to our newsletter for expanding your knowledge about fitness....</p>
      <div className="revue-embed">
        <form action="https://www.getrevue.co/profile/kunalkharat22/add_subscriber" method="post" id="revue-form" name="revue-form"  target="_blank">
          <div className="revue-form-group">
            <input className="revue-form-field" placeholder="Your email address..." type="email" name="member[email]" id="member_email"/>
            <input className="revue-action-field" type="submit" value="Subscribe" name="member[subscribe]" id="member_submit"/>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Newsletter