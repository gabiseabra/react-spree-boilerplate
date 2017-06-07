import webpack from "webpack"
import merge from "webpack-merge"
import ExtractTextPlugin from "extract-text-webpack-plugin"
import config, { loaders } from "../config"
import vendorConfig, { outputDir as vendorDir } from "./vendor.babel"

const vendors = Object.keys(vendorConfig.entry).map(module => `${module}.manifest.json`)

export default merge.smart(config, {
  entry: {
    common: [
      "babel-polyfill",
      "./styles/app.css",
      "./styles/app.less"
    ],
    spree: "./app/bundles/Spree/startup/client"
  },
  output: {
    filename: "[name]-bundle.js"
  },
  module: {
    rules: loaders({
      styles: {
        extract: ExtractTextPlugin,
        fallback: "style-loader"
      }
    })
  },
  plugins: [
    new webpack.optimize.CommonsChunkPlugin("common"),
    new ExtractTextPlugin({
      filename: "[name]-bundle.css",
      disable: (process.env.NODE_ENV === "development")
    }),
    new webpack.DefinePlugin({
      __SSR__: false
    }),
    ...(vendors.map(fileName => (
      new webpack.DllReferencePlugin({
        // eslint-disable-next-line import/no-dynamic-require
        manifest: require(`${vendorDir}/${fileName}`)
      })
    )))
  ]
})
