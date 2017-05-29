import path from "path"
import webpack from "webpack"
import merge from "webpack-merge"
import config, { loaders } from "../config"

const outputDir = path.join(config.output.path, "vendor")

export default merge.smart(config, {
  entry: {
    // vendor: [],
    react: [
      "react",
      "react-dom",
      "react-redux",
      "react-on-rails",
      "redux",
      "redux-saga"
    ]
  },
  output: {
    path: outputDir,
    filename: "[name].dll.js",
    library: "[name]_dll"
  },
  module: {
    rules: loaders({ styles: false })
  },
  plugins: [
    new webpack.DllPlugin({
      path: path.join(outputDir, "[name].manifest.json"),
      name: "[name]_dll"
    })
  ]
})

export { outputDir }
