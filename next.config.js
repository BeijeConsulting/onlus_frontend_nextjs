/** @type {import('next').NextConfig} */
const path = require('path')
const nextTranslate = require("next-translate");

const nextConfig = nextTranslate({
  reactStrictMode: false,
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')],
  },
  i18n: {
    ...nextTranslate(),
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "onlus-dev.s3.eu-south-1.amazonaws.com",
        port: "",
        pathname: "/**"
      }
    ]
  }
});

module.exports = nextConfig;
