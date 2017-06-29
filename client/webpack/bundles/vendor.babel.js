import path from "path"
import webpack from "webpack"

const outputDir = path.join(__dirname, "../../../app/assets/webpack/vendor")

export default {
  entry: {
    vendor: [
      "querystring",
      "universal-router",
      "isomorphic-fetch",
      "class-autobind",
      "es6-error",
      "classnames",
      "react",
      "react-dom",
      "react-intl",
      "react-redux",
      "react-on-rails",
      "react-ultimate-pagination",
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
