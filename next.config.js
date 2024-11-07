const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.BUNDLE_ANALYZER === 'true',
});

const withRoutes = require('nextjs-routes/config')({
  outDir: 'nextjs',
});

const moduleExports = {
  reactStrictMode: true,
  webpack(config, { webpack }) {
    config.plugins.push(
      new webpack.DefinePlugin({
        __SENTRY_DEBUG__: false,
        __SENTRY_TRACING__: false,
      }),
    );
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    });
    config.resolve.fallback = { fs: false, net: false, tls: false };
    config.externals.push('pino-pretty', 'lokijs', 'encoding');

    return config;
  },

  output: 'standalone',
  productionBrowserSourceMaps: true,

  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'Content-Security-Policy',
            value: [
              "default-src 'self'",
              "connect-src 'self' https://wss:// raw.githubusercontent.com",
              "coinzilla.com *.coinzilla.com https://request-global.czilladx.com",
              "servedbyadbutler.com *.slise.xyz api.hypelab.com",
              "*.ixncdn.com *.cloudfront.net v1.getittech.io ipapi.co",
              "fonts.gstatic.com sentry.io *.sentry.io;",
              "script-src 'self' 'unsafe-eval' 'unsafe-inline' *.undefined ... ;",
              "style-src 'self' 'unsafe-inline' data: fonts.googleapis.com ...; ...",
            ].join(' '),
          },
        ],
      },
    ];
  },
 typescript: {
    ignoreBuildErrors: true,
  },
  // Disable ESLint during build
  eslint: {
    ignoreDuringBuilds: true,
  },
};

module.exports = withBundleAnalyzer(withRoutes(moduleExports));
