import webpack from "webpack"
import merge from "webpack-merge"
import ManifestPlugin from "webpack-manifest-plugin"
import ExtractTextPlugin from "extract-text-webpack-plugin"
import config, { loaders } from "../config"
import vendorConfig, { outputDir as vendorDir } from "./vendor.babel"

const vendors = Object.keys(vendorConfig.entry).map(module => `${module}.manifest.json`)

export default merge.smart(config, {
  entry: {
    common: [
      "babel-polyfill",
      "./app/styles/app.global.scss"
    ],
    spree: "./app/bundles/Spree/startup/client"
  },
  output: {
    filename: (
      process.env.NODE_ENV === "production" ?
      "[name]-bundle.[chunkhash:5].js" :
      "[name]-bundle.js"
    )
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
      filename: "[name]-bundle.[chunkhash:5].css",
      // Disable css files in hot mode, stylesheets are
      // added to the document with javascript instead
      disable: (process.argv.indexOf("--hot") !== -1)
    }),
    new webpack.DefinePlugin({
      __SSR__: false
    }),
    new ManifestPlugin({
      writeToFileEmit: true
    }),
    ...(vendors.map(fileName => (
      new webpack.DllReferencePlugin({
        // eslint-disable-next-line import/no-dynamic-require
        manifest: require(`${vendorDir}/${fileName}`)
      })
    )))
  ]
})
