import React, { useEffect, useState } from 'react'
import { BsInstagram } from 'react-icons/bs'
import InstaFeed from '../components/InstaFeed'
import { getFeed } from '../lib/instagram'
import styles from '../styles/Blogs.module.scss'
import {client} from '../lib/client'
import PostList from '../components/postList'
import Newsletter from '../components/Newsletter'
import Link from 'next/link'

const Blogs = ({postData}) => {

  // console.log(postData);

  const [feed, setFeed] = useState([]);
  useEffect(() => {
    getFeed().then(data => {
      setFeed(data);
    });
  }, []);

  return (
    <div className='blog-container'>
      
      <div className={styles.blogPostContainer}>
        <div className={styles.postContainer1}>
          {postData.length ?
          postData.slice(0,2).map(post =>(
            <PostList
              key={post._id}
              post={post}
              aspect="landscape"
              preloadImage={true}
            />
          )) :
          <div className={styles.blogPostContainer}>
            <p>No blogs to show yet</p>
          </div>
          }
        </div>
        <div className={styles.postContainer2}>
          {postData.length ?
          postData.slice(2).map(post => (
            <PostList 
              key={post._id}
              post={post}
              aspect="square"
            />
          )) :
          <div className={styles.blogPostContainer}>
            <p>No blogs to show yet</p>
          </div>
          }
        </div>
        <div className={styles.btn}>
          <Link href='/Blogs/Archive'>
            <button>View all previous posts</button>
          </Link>
        </div>
      </div>

      
      {feed.length ?  
      <div className={styles.igEmbed}>
        <p className={styles.igText}> I like to use my Instagram page as a little digital diary where I share my daily musings on training and nutrition. I like to keep it real, so all my posts are either backed by science or come from my own personal experiences in the gym and working with clients.
I&apos;m all about spreading the wealth of knowledge and giving people access to information that can help them make progress and achieve their fitness goals. That&apos;s why I post about everything fitness-related that I find relevant, important and worth sharing. I also love busting fitness myths and using science to separate facts from the BS that&apos;s out there.
So, if you wanna stay up to date with my latest posts, hit me up on Instagram and check out my page. And don&apos;t forget, one click is all it takes to access all the relevant information you need to take your training to the next level. Let&apos;s get after it!</p>

        <a href='https://www.instagram.com/team.aesthetix/'>
          <BsInstagram />
        </a>
         
        <InstaFeed feed={feed} rows={3} columns={4}/>
      </div>
      :
      <></>
      }
      {/* <Newsletter /> */}
    </div>
  )
}

export const getServerSideProps = async () => {
  const postQuery = `*[_type == "post"]| order(publishedAt desc, _createdAt desc) {
    ...,
    author->,
    categories[]->
  }
  `
  const postData = await client.fetch(postQuery)

  // const bannerQuery = '*[_type == "banner"]'
  // const bannerData = await client.fetch(bannerQuery)

  // const productQuery = '*[_type == "products"]'
  // const productdata = await client.fetch(productQuery)

  return{
    props: {postData}
  }
}

export default Blogs