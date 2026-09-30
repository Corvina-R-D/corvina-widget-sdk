/*
 * Build of the widget package, created by corvina-sdk create project.
 *   lib:  the widgets (src/main.ts), uploaded to Corvina
 *   init: the bootstrap of the dev server (index.ts), not uploaded
 * `yarn corvina-sdk create widget <tech>` adds here what the technology needs (e.g. .tsx files).
 */
var path = require('path')
var webpack = require('webpack')
const fs = require("fs");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { ESBuildMinifyPlugin } = require('esbuild-loader')

function resolve (dir) {
  return path.join(__dirname, dir)
}

/*
 * Corvina runtime loaded by index.html: the released one, or with CORVINA_RUNTIME=local (yarn dev:local)
 * a local build of corvina-frontend copied into dist/corvina by scripts/use-local-corvina.js
 */
const localCorvina = process.env.CORVINA_RUNTIME === "local";
const corvinaRuntime = localCorvina ? "/dist/corvina/" : "https://app.corvina.io/dist/";

module.exports = {
  mode: "development",
  entry: {
    lib: path.resolve(__dirname, './src/main'),
    init: path.resolve(__dirname, './index'),
  },
  output: {
    path: path.resolve(__dirname, './dist/org'),
    publicPath: '/dist/org/',
    filename: '[name].js',
    library: `[name]`,
    libraryTarget: "umd",
    // index.html dispatches the hot updates of lib and init by this name (window.webpackHotUpdate__hmrName__)
    uniqueName: "__hmrName__"
  },
  // Provided by Corvina at runtime: "vue" is its Vue 2, used only by widgets rendered by a Vue 2 component
  externals: {
    corvina: {
      commonjs: 'corvina',
      commonjs2: 'corvina',
      amd: 'corvina',
      root: 'corvina'
    },
    vue: {
      commonjs: 'vue',
      commonjs2: 'vue',
      amd: 'vue',
      root: 'vue'
    }
  },
  resolve: {
    extensions: ['.ts', '.js', '.json', '*'],
    modules: [
      resolve('node_modules'),
      resolve("_corvina"),
      resolve("_corvina/src")
    ],
    alias: {
      'corvina': resolve("_corvina/src/corvina-module.ts"),
      'src': resolve('src'),
    }
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        exclude: [ /node_modules/ ],
        loader: 'ts-loader',
        options: {
          appendTsSuffixTo: [/\.vue$/]
        }
      },
      {
        test: /\.css$/,
        use: [ 'style-loader', 'css-loader' ]
      },
      {
        test: /\.(png|jpg|gif|woff|woff2|eot|ttf|svg)$/,
        loader: 'file-loader',
        options: {
          name: '[name].[ext]?[hash]'
        }
      }
    ]
  },
  devServer: {
    host: '0.0.0.0',
    allowedHosts: [ 'all' ],
    devMiddleware: {
      publicPath: '/dist/org/',
    },
    headers: {
      "Access-Control-Allow-Origin": "*",
    },
    static: [
      // Static files of the local build of corvina-frontend (scripts/use-local-corvina.js), before the SDK ones
      ...( localCorvina && fs.existsSync( resolve( 'dist/corvina/static' ) ) ? [ {
        publicPath: '/static/',
        directory: resolve( 'dist/corvina/static' ),
      } ] : [] ),
      {
        publicPath: '/static/',
        directory: path.resolve(__dirname, 'static'),
      },
      {
        publicPath: '/dist/',
        directory: path.resolve(__dirname, 'dist'),
      }
    ],
    historyApiFallback: {
      rewrites: [
      { from: /^\/$/, to: '/dist/org/index.html' }
      ]
    }
  },
  /*
   * Variables of the dev server from .env (see .env.example), .env.local, .env.[mode], .env.[mode].local:
   * only those starting with CORVINA_, replaced at build time in process.env.CORVINA_<name> (index.ts).
   * The variables of the shell win over the files.
   */
  dotenv: {
    prefix: "CORVINA_"
  },
  performance: {
    hints: false
  },
  optimization: {
    /*
     * With runtimeChunk false, the runtime code is inlined into the entry points
     * This is necessary for SDK widget isolation
     */
    runtimeChunk: false
  },
  devtool: 'eval-source-map',
  plugins: [
    // One file per package: Corvina runs only lib.js, the chunks of dynamic imports would never be loaded
    new webpack.optimize.LimitChunkCountPlugin({ maxChunks: 1 }),
    new HtmlWebpackPlugin({
      template: "index.html",
      inject: false,
      corvinaRuntime,
    }),
    new webpack.HotModuleReplacementPlugin()
  ]
}

if (process.env.NODE_ENV === 'production') {
  module.exports.optimization = {
    minimize: true,
    minimizer: [
      new ESBuildMinifyPlugin({
        target: 'es2018',
        sourcemap: true
      })
    ],
    runtimeChunk: false
  }

  module.exports.devtool = false
}
