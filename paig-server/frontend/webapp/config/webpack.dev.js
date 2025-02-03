const commonPaths = require('./paths');
var webpack = require('webpack');
const autoprefixer = require('autoprefixer');
const url = require('url')

let env = process.env.NODE_ENV || '';
let outputPath = commonPaths.outputPath;

module.exports = {
  mode: 'development',
  //mode: 'production',
  output: {
    filename: '[name].js',
    path: outputPath,
    chunkFilename: '[name].js',
    //sourceMapFilename: '[name].map'
  },
  module: {
    rules: [{
      test: /\.(c|sa|sc)ss$/i,
      use: [
        'style-loader',
        {
          loader: 'css-loader',
          options: {
            sourceMap: true,
            modules: false
            // localIdentName: '[name]__[local]___[hash:base64:5]',
          }
        },
        {
          loader: 'postcss-loader',
          options: {
            sourceMap: true,
            postcssOptions: {
                plugins: [
                    require('autoprefixer')() // Correct placement
                ]
            }
          }
        },
        'resolve-url-loader',
        {
           loader: 'sass-loader',
           options: {
             sourceMap: true,
             implementation: require("sass"),
             /*sassOptions: {
                includePaths: ['node_modules']
             }*/
           }
        }
      ]
    }]
  },
  plugins: [
    new webpack.NoEmitOnErrorsPlugin()
  ],
  optimization: {
    minimize: false,
    splitChunks: {
      cacheGroups: {
        commons: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all'
        }
      }
    }
  },
  devServer: {
    client: {
      overlay: {
        errors: true,
        warnings: false
      }
    },
    port: commonPaths.port,
    host: commonPaths.host,
    hot: true,
    proxy: [{
        context: () => true,
        target: commonPaths.target,
        changeOrigin: true, // needed for virtual hosted sites
        ws: false, // proxy websockets
        secure: false,
        // auth: commonPaths.auth,
        router: {
          [commonPaths.host + ':' + commonPaths.port]: commonPaths.target
        },
        onProxyReq: proxyReq => {
          if (commonPaths.cookie) {
            proxyReq.setHeader('Cookie', commonPaths.cookie);
          }

          // console.log("path: ", proxyReq.path)
        },
        logLevel: 'info'
    }]
  },
  devtool: 'inline-source-map'
};
