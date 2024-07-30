/** @type {import('next').NextConfig} */
const nextConfig = {
  serverRuntimeConfig: {
    mongodbUri: process.env.MONGO_URI,
  },
}

module.exports = nextConfig