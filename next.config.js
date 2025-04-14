/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  basePath: '/saas-maps-v3',
  assetPrefix: '/saas-maps-v3/',
  trailingSlash: true,
}

module.exports = nextConfig 