import React from 'react'
import {Banner, Section1, Section2, Section3, Newsletter} from '../components'
import axios from 'axios';
import localStorage from 'localstorage-memory'
import {NextSeo} from 'next-seo'
import defaultOG from "../public/open_graph_default.jpg";
import GetImage from '../utils/getImage';

import {client} from '../lib/client'

const Home = ({sections, bannerData, productdata, postData, config}) => {

  // console.log('postdata',config);
  const ogimage = config?.openGraphImage
  ? GetImage(config?.openGraphImage).src
  : defaultOG.src;
  return (
    <>
      
      <NextSeo 
        title={`${config?.title}`}
        description={config?.description || ""}
        canonical={config?.url}
        openGraph={{
          url: config?.url,
          title: `${config?.title}`,
          description: config?.description || "",
              images: [
                {
                  url: ogimage,
                  width: 800,
                  height: 600,
                  alt: ""
                }
              ],
              site_name: "Team Aesthetix"
            }}
            twitter={{
              cardType: "summary_large_image"
            }}
      />

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

  const configQuery = `
  *[_type == "siteconfig"][0] {
    ...,
  }
  `
  const config = await client.fetch(configQuery)


  return{
    props: {sections,bannerData,productdata, postData, config}
  }
}

export default Home