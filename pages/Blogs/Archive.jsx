import React from 'react'
import styles from '../../styles/Blogs.module.scss'
import { client } from '../../lib/client'
import PostList from '../../components/postList'
import { configQuery } from '../../lib/queries'
import { NextSeo } from 'next-seo'
import ogimage from "../../public/open_graph_default.jpg";

const Archive = ({postData, config}) => {
  return (
    <div className='blog-container'>
      <NextSeo 
        title={config?.title}
        description={config?.description || ""}
        canonical={config?.url}
        openGraph={{
          url: config?.url,
          title: config?.title,
          description: config?.description || "",
              images: [
                {
                  url: ogimage,
                  width: 800,
                  height: 600,
                  alt: config.title
                }
              ],
              site_name: "Team Aesthetix"
            }}
            twitter={{
              handle: "@kunal010_cule",
              site: "@kunal010_cule",
              cardType: "summary_large_image"
            }}
      />
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

  const config = await client.fetch(configQuery)

  return{
    props: {postData, config}
  }
}

export default Archive