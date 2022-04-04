// This file sets a custom webpack configuration to use your Next.js app
// with Sentry.
// https://nextjs.org/docs/api-reference/next.config.js/introduction
// https://docs.sentry.io/platforms/javascript/guides/nextjs/

const path = require('path');
const { withSentryConfig } = require('@sentry/nextjs');

const moduleExports = {
  swcMinify: false,
  basePath: process.env.BASE_PATH || '',
  reactStrictMode: true,
  sassOptions: {
    includePaths: [path.join(__dirname, 'src', 'styles')],
  },
  serverRuntimeConfig: {
    JWT_SECRET: process.env.JWT_SECRET,
    KARRIO_HOSTNAME: process.env.KARRIO_HOSTNAME || process.env.NEXT_PUBLIC_KARRIO_API_URL,
  },
  publicRuntimeConfig: {
    BASE_PATH: process.env.BASE_PATH || '',
    DASHBOARD_VERSION: process.env.DASHBOARD_VERSION,
    KARRIO_API_URL: process.env.NEXT_PUBLIC_KARRIO_API_URL,
  },
  sentry: {
    disableServerWebpackPlugin: true,
    disableClientWebpackPlugin: true,
  },
};

const sentryWebpackPluginOptions = {
  // Additional config options for the Sentry Webpack plugin. Keep in mind that
  // the following options are set automatically, and overriding them is not
  // recommended:
  //   release, url, org, project, authToken, configFile, stripPrefix,
  //   urlPrefix, include, ignore

  silent: true, // Suppresses all logs
  // For all available options, see:
  // https://github.com/getsentry/sentry-webpack-plugin#options.
};

// Make sure adding Sentry options is the last code to run before exporting, to
// ensure that your source maps include changes from all other Webpack plugins
module.exports = withSentryConfig(moduleExports, sentryWebpackPluginOptions);
