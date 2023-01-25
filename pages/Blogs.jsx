import React, { useEffect, useState } from 'react'
import { BsInstagram } from 'react-icons/bs';
import InstaFeed from '../components/InstaFeed'
import { getFeed } from '../lib/instagram'

const Blogs = () => {

  const [feed, setFeed] = useState([]);
  useEffect(() => {
    getFeed().then(data => {
      setFeed(data);
    });
  }, []);

  return (
    <div className='blog-container' >
      <p> I like to use my Instagram page as a little digital diary where I share my daily musings on training and nutrition. I like to keep it real, so all my posts are either backed by science or come from my own personal experiences in the gym and working with clients.
I'm all about spreading the wealth of knowledge and giving people access to information that can help them make progress and achieve their fitness goals. That's why I post about everything fitness-related that I find relevant, important and worth sharing. I also love busting fitness myths and using science to separate facts from the BS that's out there.
So, if you wanna stay up to date with my latest posts, hit me up on Instagram and check out my page. And don't forget, one click is all it takes to access all the relevant information you need to take your training to the next level. Let's get after it!</p>
      <a href='https://www.instagram.com/team.aesthetix/'>
        <BsInstagram />
      </a>
      <InstaFeed feed={feed} rows={5} columns={3}/>
    </div>
  )
}

export default Blogs