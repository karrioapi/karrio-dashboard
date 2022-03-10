const path = require('path');

module.exports = {
  swcMinify: false,
  basePath: process.env.BASE_PATH || '',
  reactStrictMode: true,
  sassOptions: {
    includePaths: [path.join(__dirname, 'src', 'styles')],
  },
  serverRuntimeConfig: {
    JWT_SECRET: process.env.JWT_SECRET,
    PURPLSHIP_HOSTNAME: process.env.PURPLSHIP_HOSTNAME || process.env.NEXT_PUBLIC_PURPLSHIP_API_URL,
  },
  publicRuntimeConfig: {
    BASE_PATH: process.env.BASE_PATH || '',
    DASHBOARD_VERSION: process.env.DASHBOARD_VERSION,
    PURPLSHIP_API_URL: process.env.NEXT_PUBLIC_PURPLSHIP_API_URL,
  }
}
