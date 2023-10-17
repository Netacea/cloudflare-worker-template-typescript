const path = require('path')
const { ProvidePlugin } = require('webpack')

module.exports = {
  entry: './src/index.ts',
  target: 'web',
  experiments: {
    outputModule: true,
  },
  output: {
    filename: `worker.mjs`,
    library: {
      type: 'module',
    },
    path: path.join(__dirname, 'dist')
  },
  mode: 'production', // development mode breaks Cloudflare workers
  resolve: {
    extensions: ['.ts', '.tsx', '.js'],
    plugins: [],
    fallback: {
      crypto: require.resolve('crypto-browserify'),
      querystring: require.resolve('querystring-es3'),
      buffer: require.resolve('buffer/'),
      stream: require.resolve('stream-browserify'),
      url: require.resolve('url/')
    }
  },
  plugins: [
    new ProvidePlugin({
      Buffer: ['buffer', 'Buffer'],
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
