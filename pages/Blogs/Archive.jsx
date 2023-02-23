import React from 'react'
import styles from '../../styles/Blogs.module.scss'
import { client } from '../../lib/client'
import PostList from '../../components/postList'

const Archive = ({postData}) => {
  return (
    <div className='blog-container'>
      <div className={styles.blogPostContainer}>
        <div className={styles.title}>
          <h1>All blogs</h1>
        </div>
      <div className={styles.postContainer2}>
          {postData.length ?
           postData.map(post => (
            <PostList 
              key={post._id}
              post={post}
              aspect="square"
            />
          )):
            <div className={styles.blogPostContainer}>
              <p>No blogs to show yet</p>
            </div>
          }
        </div>
      </div>
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

  return{
    props: {postData}
  }
}

export default Archive