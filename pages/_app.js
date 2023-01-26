import React from 'react'
import '../styles/globals.scss'
import "../styles/nprogress.scss";
import {Layout} from '../components'
import { StateContext } from '../context/StateContext'
import { Toaster } from 'react-hot-toast'
import Router from "next/router";
// import nProgress from "nprogress";

// Router.events.on("routeChangeStart", (nProgress.start));
// Router.events.on("routeChangeError", nProgress.done);
// Router.events.on("routeChangeComplete", nProgress.done);


function MyApp({ Component, pageProps }) {
  return (
    <StateContext>
      <Toaster />
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </StateContext>
  )
}

export default MyApp
