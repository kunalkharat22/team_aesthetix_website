import React from 'react'
import {client} from '../lib/client'

const Army = () => {
  return (
    <div className=''>

    </div>
  )
}

export const getServerSideProps = async () => {
  const query = '*[_type == "section"]'
  const sections = await client.fetch(query)

  // const bannerQuery = '*[_type == "banner"]'
  // const bannerData = await client.fetch(bannerQuery)

  // const productQuery = '*[_type == "products"]'
  // const productdata = await client.fetch(productQuery)

  return{
    props: {sections}
  }
}

export default Army