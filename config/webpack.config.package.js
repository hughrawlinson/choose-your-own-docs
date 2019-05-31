const path = require('path');
const autoprefixer = require('autoprefixer');
const paths = require('./paths');

module.exports = {
  // webpack folder’s entry js — excluded from jekll’s build process.
  plugins: [],
  entry: [
    require.resolve('./polyfills'),
    path.resolve('./src/App.js')
  ],
  output: {
    // we’re going to put the generated file in the assets folder so jekyll will grab it.
    path: path.resolve('build'),
    filename: '[name].bundle.js',
    libraryTarget: 'commonjs'
  },
  module: {
    loaders: [
      {
        test: /\.(js|jsx)$/,
        include: paths.appSrc,
        loader: require.resolve('babel-loader'),
        options: {
          // This is a feature of `babel-loader` for webpack (not Babel itself).
          // It enables caching results in ./node_modules/.cache/babel-loader/
          // directory for faster rebuilds.
          presets: ['react-app'],
          cacheDirectory: true,
        },
      },{
        test: /\.css$/,
        use: [
          require.resolve('style-loader'),
          {
            loader: require.resolve('css-loader'),
            options: {
              importLoaders: 1,
            },
          },
          {
            loader: require.resolve('postcss-loader'),
            options: {
              // Necessary for external CSS imports to work
              // https://github.com/facebookincubator/create-react-app/issues/2677
              ident: 'postcss',
              plugins: () => [
                require('postcss-flexbugs-fixes'),
                autoprefixer({
                  browsers: [
                    '>1%',
                    'last 4 versions',
                    'Firefox ESR',
                    'not ie < 9', // React doesn't support IE8 anyway
                  ],
                  flexbox: 'no-2009',
                }),
              ],
            },
          },
        ],
      }
    ]
  }
};
