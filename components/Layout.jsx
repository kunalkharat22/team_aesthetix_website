import React from 'react'
import Head from 'next/head'
import Navbar from './Navbar'
import Footer from './Footer'
import { NextSeo } from 'next-seo'
import GetImage from '../utils/getImage'
import defaultOG from "../public/open_graph_default.jpg";

const Layout = ({children}) => {

  // const {config} = children?.props
  // console.log('config',children.props);
  // const ogimage = config?.openGraphImage
  // ? GetImage(config?.openGraphImage).src
  // : defaultOG.src;

  return (
    <div className='layout'>
      <Head>
        <title>TeamX</title>
      </Head>
      {/* <NextSeo 
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
                  alt: 'config.title'
                }
              ],
              site_name: "Team Aesthetix"
            }}
            twitter={{
              handle: "@kunal010_cule",
              site: "@kunal010_cule",
              cardType: "summary_large_image"
            }}
      /> */}
      <header>
        <Navbar />
      </header>
      <main className='main-container'>
        {children}
      </main>
      <footer>
        <Footer />
      </footer>
    </div>
  )
}

export default Layout