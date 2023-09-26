const nextConfig = {
  reactStrictMode: false,
  pageExtensions: ['ts', 'tsx', 'js', 'jsx', 'md', 'mdx'],
  compiler: {
    removeConsole: false,
  },
  eslint: {
    dirs: ['app', 'pages', 'components', 'lib', 'layouts', 'scripts'],
  },
  // experimental: {
  //   appDir: true,
  // },
  webpack: (config) => {
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    })
    return config
  },
}

module.exports = nextConfig

// module.exports = {
//   reactStrictMode: false,
//   pageExtensions: ['ts', 'tsx', 'js', 'jsx', 'md', 'mdx'],
//   eslint: {
//     dirs: ['app', 'pages', 'components', 'lib', 'layouts', 'scripts'],
//   },
//   experimental: {
//     appDir: true,
//   },
//   webpack: (config, { dev, isServer }) => {
//     config.module.rules.push({
//       test: /\.svg$/,
//       use: ['@svgr/webpack'],
//     })

//     // if (!dev && !isServer) {
//     //   // Replace React with Preact only in client production build
//     //   Object.assign(config.resolve.alias, {
//     //     'react/jsx-runtime.js': 'preact/compat/jsx-runtime',
//     //     react: 'preact/compat',
//     //     'react-dom/test-utils': 'preact/test-utils',
//     //     'react-dom': 'preact/compat',
//     //   })
//     // }

//     return config
//   },
// }
