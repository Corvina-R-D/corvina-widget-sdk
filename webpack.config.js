var path = require('path')
var webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const { ESBuildMinifyPlugin } = require('esbuild-loader')
const fs = require("fs");

function resolve (dir) {
  return path.join(__dirname, dir)
}

/*
 * Corvina runtime loaded by index.html: the released one, or with CORVINA_RUNTIME=local (yarn dev:local)
 * a local build of corvina-frontend copied into dist/corvina by scripts/use-local-corvina.js
 */
const localCorvina = process.env.CORVINA_RUNTIME === "local";
const corvinaRuntime = localCorvina ? "/dist/corvina/" : "https://app.corvina.io/dist/";

const VueLoaderPlugin = require('vue-loader/lib/plugin')
const manifest = require("./src/manifest.json");
const lib_name = `lib_${manifest.name}`;

class SourceMapfixPlugin
{
  apply(compiler) {
    compiler.hooks.thisCompilation.tap('Initializing Compilation', (compilation) => {


      const shouldSkipModule = function (module) {
        const { resource = '' } = module;
        if (!resource) return true;
        if (/node_modules/.test(resource)) return true;
        if (!/\.vue/.test(resource)) return true;
        if (!/type=script/.test(resource)) return true;
        if (!/lang=ts/.test(resource)) return true;
        if (isMissingSourceMap(module)) return true;
      
        return false;
      }
      
      const isMissingSourceMap = function(module) {
        return !extractSourceMap(module);
      }
      
      const extractSourceMap =  function(module) {
        if (!module['_source']) return null;
      
        return module['_source']['_sourceMap'] ||
          module['_source']['_sourceMapAsObject'] ||
          null;
      }

      compilation.hooks.finishModules.tapPromise('All Modules Built', async (modules) => {
        for (const module of modules) {
          if (shouldSkipModule(module)) continue;

          const pathWithoutQuery = module.resource.replace(/\?.*$/, '');
          const sourceFile = fs.readFileSync(pathWithoutQuery).toString('utf-8');
          const sourceMap = extractSourceMap(module);

          sourceMap.sources = [pathWithoutQuery];
          sourceMap.sourcesContent = [sourceFile];
        }
      });
    });
  }
}

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
    /*
     * The name of the package before it became @corvina/widget-sdk: it names the webpack globals, e.g.
     * webpackHotUpdatevuex_corvina_app dispatched by index.html to lib and init for the hot updates
     */
    uniqueName: "vuex-corvina-app"
  },
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
    extensions: ['.ts', '.js', '.vue', '.json', '*'],
    modules: [
      resolve('node_modules'),
      resolve("_corvina"),
      resolve("_corvina/src")
    ],

    alias: {
      'corvina': resolve("_corvina/src/corvina-module.ts"),
      'vue$': 'vue/dist/vue.esm.js',
      'assets': resolve('_corvina/src/assets'),
      'components': resolve('_corvina/src/components'),
      'src': resolve('src'),
      'BrandData': path.resolve(__dirname, './static/brands/index.ts'),
      'Buffer': require.resolve( "buffer/" ),
    },
    fallback: {
      buffer: require.resolve("buffer/"),
    }
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      },
      {
        test: /\.ts$/,
        exclude: [ /node_modules|vue\/_corvina/, /_corvina\/test/, /src\/test/ ],
        loader: 'ts-loader',
        options: {
          appendTsSuffixTo: [/\.vue$/]
        }
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: 'vue-style-loader'
          },
          {
            loader: 'css-loader'
          }
        ],
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        include: [resolve('src'), resolve('test'), resolve('./_corvina/main.js'), resolve('_corvina'), resolve('./src/index.ts')],
        exclude: [ /node_modules/, /src\/test/ ]
      },
      {
        test: /\.(png|jpg|babylon|obj|gif|woff|woff2|eot|ttf|svg)$/,
        loader: 'file-loader',
        options: {
          name: '[name].[ext]?[hash]'
        }
      },
      {
        test: /\.libs\.js$/,
        use: [ 'script-loader' ]
      },
      {
        test: /\.pug$/,
        loader: 'pug-plain-loader'
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
    new VueLoaderPlugin(),
    new HtmlWebpackPlugin({
      template: "index.html",
      inject: false,
      corvinaRuntime,
      // chunksSortMode: 'manual',
      // chunks: ["sdk_pre", "lib","init", "sdk_post"]
    }),
    new webpack.HotModuleReplacementPlugin(),
    new SourceMapfixPlugin()
   ]
}

if (process.env.NODE_ENV === 'production') {
  module.exports.optimization = {
    minimize: true,
    minimizer: [
      new ESBuildMinifyPlugin({
        target: 'es2018',  // Syntax to compile to (see options below for possible values)
        sourcemap: true
      })
    ],
    /*
     * With runtimeChunk false, the runtime code is inlined into the entry points
     * This is necessary for SDK widget isolation
     */
    runtimeChunk: false
  },

  module.exports.devtool = false

  module.exports.plugins = (module.exports.plugins || []).concat([


    new webpack.IgnorePlugin({resourceRegExp: /^\.\/locale$/, contextRegExp: /moment$/ }),
    
    new webpack.LoaderOptionsPlugin({
      minimize: false
    }),

    new SourceMapfixPlugin()
  ])
}
