var webpack = require("webpack");
var path = require("path");

module.exports = [
  {
    target: "web",
    context: path.join(__dirname, "app"),
    entry: "./index.jsx",
    output: {
      path: path.join(__dirname, "app/build"),
      filename: "bundle.js"
    },
    module: {
      loaders: [
        {
          test: /\.html$/,
          loader: "file"
        },
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
          test: /\.json$/,
          loader: "json"
        }
      ]
    },
    resolve: {
      root: path.resolve("./app"),
      extensions: [ "", ".js", ".jsx", ".less" ]
    }
  }
];