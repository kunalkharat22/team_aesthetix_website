/** @type {import('next').NextConfig} */

require('dotenv').config();


const nextConfig = {
  reactStrictMode: true,
  env: {
    REACT_APP_INSTAGRAM_ACCESS_TOKEN : process.env.REACT_APP_INSTAGRAM_ACCESS_TOKEN,
    REACT_APP_INSTAGRAM_APP_SECRET: process.env.REACT_APP_INSTAGRAM_APP_SECRET,
  }
}

module.exports = nextConfig
