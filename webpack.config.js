const path = require("path");
const webpack = require("webpack");

module.exports = [
  {
    target: "web",
    context: path.join(__dirname, "app"),
    entry: "./index.jsx",
    output: {
      path: path.join(__dirname, "app/build"),
      publicPath: "build/",
      filename: "bundle.js"
    },
    module: {
      loaders: [
        {
          test: /\.css$/,
          loader: "style!css"
        },
        {
          test: /\.less$/,
          loader: "style!css!less"
        },
        {
          test: /\.js$/,
          exclude: /node_modules/,
          loader: "babel",
          query: {
            presets: [ "es2015", "stage-2" ]
          }
        },
        {
          test: /\.jsx$/,
          exclude: /node_modules/,
          loader: "babel",
          query: {
            presets: [ "es2015", "stage-2", "react" ]
          }
        },
        {
          test: /\.woff$/,
          loader: "file"
        },
        {
          test: /\.json$/,
          loader: "json"
        }
      ]
    },
    resolve: {
      root: path.resolve(__dirname, "app"),
      extensions: [ "", ".js", ".jsx", ".less" ],
      modulesDirectories: [ "node_modules" ]
    },
  },
  {
    target: "web",
    context: path.join(__dirname, "app/test"),
    entry: "mocha!./index.js",
    output: {
      path: path.join(__dirname, "app/test/build"),
      publicPath: "build/",
      filename: "bundle.js"
    },
    module: {
      loaders: [,
        {
          test: /\.css$/,
          loader: "style!css"
        },
        {
          test: /\.less$/,
          loader: "style!css!less"
        },
        {
          test: /\.js$/,
          exclude: /node_modules/,
          loader: "babel",
          query: {
            presets: [ "es2015", "stage-2" ]
          }
        },
        {
          test: /\.jsx$/,
          exclude: /node_modules/,
          loader: "babel",
          query: {
            presets: [ "es2015", "stage-2", "react" ]
          }
        }
      ]
    },
    resolve: {
      root: path.resolve(__dirname, "app/test"),
      alias:{
        connection: path.resolve( __dirname, "app/connection"),
        constants: path.resolve( __dirname, "app/constants"),
        actions: path.resolve( __dirname, "app/actions"),
        reducers: path.resolve( __dirname, "app/reducers"),
        components: path.resolve( __dirname, "app/components"),
        containers: path.resolve( __dirname, "app/containers"),
        utils: path.resolve( __dirname, "app/utils"),
        styles: path.resolve( __dirname, "app/styles")
      },
      extensions: [ "", ".js" ],
      modulesDirectories: [ "node_modules" ]
    }
  }
];