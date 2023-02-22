import React from 'react'
import {Banner, Section1, Section2, Section3, Newsletter} from '../components'
import axios from 'axios';
import localStorage from 'localstorage-memory'

import {client} from '../lib/client'

const Home = ({sections, bannerData, productdata, postData}) => {

  // console.log('postdata',postData);

  return (
    <>
      <Banner bannerData={bannerData.length && bannerData[0]}/>
            
      <Section1 section={sections.length && sections[0]}/>

      <Section2 section={sections.length && sections[1]} postData={postData.length && postData[0]}/>

      <Section3 section={sections.length && sections[2]} products={productdata}/>
      
      <Newsletter />
    </>
  )
}

export const getServerSideProps = async () => {
  const query = '*[_type == "section"]'
  const sections = await client.fetch(query)

  const bannerQuery = '*[_type == "banner"]'
  const bannerData = await client.fetch(bannerQuery)

  const productQuery = '*[_type == "products"]'
  const productdata = await client.fetch(productQuery)

  const postQuery = `*[_type == "post"]| order(publishedAt desc, _createdAt desc) {
    ...,
    author->,
    categories[]->
  }
  `
  const postData = await client.fetch(postQuery)

  return{
    props: {sections,bannerData,productdata, postData}
  }
}

export default Home