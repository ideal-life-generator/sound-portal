const path = require("path");
const webpack = require("webpack");

module.exports = {
  target: "web",
  entry: "mocha!./public/test/index.js",
  output: {
    filename: "test.js"
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
      }
    ]
  },
  resolve: {
    root: path.resolve(__dirname, "test"),
    alias: {
      store: path.resolve( __dirname, "public/store"),
      connection: path.resolve( __dirname, "public/connection"),
      constants: path.resolve( __dirname, "public/constants"),
      actions: path.resolve( __dirname, "public/actions"),
      reducers: path.resolve( __dirname, "public/reducers"),
      components: path.resolve( __dirname, "public/components"),
      containers: path.resolve( __dirname, "public/containers"),
      utils: path.resolve( __dirname, "public/utils"),
      styles: path.resolve( __dirname, "public/styles"),
      globals: path.resolve( __dirname, "globals")
    },
    extensions: [ "", ".js" ],
    modulesDirectories: [ "node_modules" ]
  },
  devServer: {
    port: 5005,
    // inline: true
  }
};