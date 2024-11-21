const APP_ENV = process.env.APP_ENV ?? "dev";

module.exports = {
  // async redirects() {
  //   return [
  //     {
  //       source: '/', // automatically becomes /docs/with-basePath
  //       destination: '/:locale', // automatically becomes /docs/another
  //       permanent: false,
  //     },
  //   ]
  // },
  output: "standalone",
  env: {
    SITE_NAME: process.env.NEXT_PUBLIC_SITE_NAME,
    API_URL: process.env.NEXT_PUBLIC_API_URL
  },
  serverRuntimeConfig: {
    APP_ENV,
  },
};
