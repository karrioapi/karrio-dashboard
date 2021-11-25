const path = require('path')

module.exports = {
  reactStrictMode: true,
  sassOptions: {
    includePaths: [path.join(__dirname, 'src', 'styles')],
  },
  serverRuntimeConfig: {
    JWT_SECRET: process.env.JWT_SECRET,
    PURPLSHIP_HOSTNAME: process.env.PURPLSHIP_HOSTNAME || process.env.NEXT_PUBLIC_PURPLSHIP_API_URL,
  },
  publicRuntimeConfig: {
    PURPLSHIP_API_URL: process.env.NEXT_PUBLIC_PURPLSHIP_API_URL
  }
}
