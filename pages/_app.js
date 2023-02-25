import React from 'react'
import '../styles/globals.scss'
import "../styles/nprogress.scss";
import {Layout} from '../components'
import { StateContext } from '../context/StateContext'
import { Toaster } from 'react-hot-toast'
import Router from "next/router";
import nProgress from "nprogress";
import { DefaultSeo } from 'next-seo';
import App from 'next/app';
import {client} from '../lib/client'
import ogimage from "../public/open_graph_default.jpg";


Router.events.on("routeChangeStart", (nProgress.start));
Router.events.on("routeChangeError", nProgress.done);
Router.events.on("routeChangeComplete", nProgress.done);


function MyApp({ Component, pageProps, config }) {

  // console.log('config',config);

  return (
    <StateContext>
      {/* <DefaultSeo 
        title={config?.title}
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
      /> */}
      <Toaster />
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </StateContext>
  )
}

// MyApp.getInitialProps = async (appContext) => {
//   const appProps = await App.getInitialProps(appContext);
//   const configQuery = `
//     *[_type == "siteconfig"][0] {
//       ...
//     }
//   `;
//   const config = await client.fetch(configQuery);
//   return { ...appProps, config };
// };

export default MyApp
