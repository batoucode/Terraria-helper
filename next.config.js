/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'terraria.wiki.gg',
      },
    ],
  },
}

module.exports = nextConfig
