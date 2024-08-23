const path = require('path')
const { ProvidePlugin } = require('webpack')

module.exports = {
  target: 'webworker',
  output: {
    filename: `worker.js`,
    path: path.join(__dirname, 'dist')
  },
  mode: 'production', // development mode breaks Cloudflare workers
  performance: {
    hints: false,
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js'],
    plugins: [],
    fallback: {
      crypto: require.resolve('crypto-browserify'),
      querystring: require.resolve('querystring-es3'),
      buffer: require.resolve('buffer/'),
      stream: require.resolve('stream-browserify'),
      url: require.resolve('url/'),
      url: require.resolve("url/"),
      vm: require.resolve("vm-browserify")
    }
  },
  plugins: [
    new ProvidePlugin({
      Buffer: ['buffer', 'Buffer']
    }),
    new ProvidePlugin({
      process: 'process/browser'
   })
  ],
  optimization: {
    minimize: false
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: 'ts-loader',
        options: {
          transpileOnly: true
        }
      }
    ]
  }
}
