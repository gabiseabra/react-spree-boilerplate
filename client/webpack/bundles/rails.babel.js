import webpack from "webpack"
import merge from "webpack-merge"
import { loaders } from "../config"
import config from "./app.babel"

export default merge.smart(config, {
  entry: [ /* ... */ ],
  output: {
    filename: "server-bundle.js"
  },
  module: {
    rules: loaders()
  },
  plugins: [
    new webpack.DefinePlugin({
      __SSR__: true
    })
  ]
})
