const path = require('path')
const { VueLoaderPlugin } = require('vue-loader')
const { resolve } = require('path')
const webpack = require('webpack')
const fs = require("fs")
// const MiniCssExtractPlugin = require('mini-css-extract-plugin')

module.exports = (env = {}) => ({
  mode: env.prod ? 'production' : 'development',
  devtool: env.prod ? 'source-map' : 'cheap-module-eval-source-map',
  entry: path.resolve(__dirname, './src/main.js'),
  output: {
    path: path.resolve(__dirname, './dist'),
    publicPath: '/dist/'
  },
  resolve: {
    alias: {
      // this isn't technically needed, since the default `vue` entry for bundlers
      // is a simple `export * from '@vue/runtime-dom`. However having this
      // extra re-export somehow causes webpack to always invalidate the module
      // on the first HMR update and causes the page to reload.
      'vue': '@vue/runtime-dom',
      '@': resolve('./')
    }
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        use: 'vue-loader'
      },
      {
        test: /\.png$/,
        use: {
          loader: 'url-loader',
          options: { limit: 8192 }
        }
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      }
    ]
  },
  plugins: [
    new VueLoaderPlugin(),
    // new MiniCssExtractPlugin({
    //   filename: '[name].css'
    // })
    new webpack.BannerPlugin({
      entryOnly: true, // 是否仅在入口包中输出 banner 信息
      raw: true,
      banner: () => {
        return String(fs.readFileSync("./header.js"))
      }
    }),
  ],
  devServer: {
    inline: true,
    hot: true,
    stats: 'minimal',
    contentBase: __dirname,
    overlay: true
  },
  externals: {
    vue: 'Vue',
    '@vueform/slider': 'VueformSlider',
  },
  optimization: {
    minimize: false
  }
})
