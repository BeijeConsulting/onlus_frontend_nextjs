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
});

module.exports = nextConfig;
