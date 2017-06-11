import path from "path"
import webpack from "webpack"

const outputDir = path.join(__dirname, "../../../app/assets/webpack/vendor")

export default {
  entry: {
    vendor: [
      "isomorphic-fetch",
      "es6-error",
      "crossroads",
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
  resolve: {
    extensions: [ ".js", ".jsx" ]
  },
  plugins: [
    new webpack.DllPlugin({
      path: path.join(outputDir, "[name].manifest.json"),
      name: "[name]_dll"
    })
  ]
}

export { outputDir }
