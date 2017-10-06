import path from "path"
import webpack from "webpack"

const outputDir = path.join(__dirname, "../../../app/assets/webpack/vendor")

export default {
  entry: {
    vendor: [
      "universal-router",
      "isomorphic-fetch",
      "class-autobind",
      "es6-error",
      "classnames"
    ],
    react: [
      "react",
      "react-dom",
      "react-router-dom",
      "react-router-redux",
      "react-redux",
      "react-intl",
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
    }),
    new webpack.EnvironmentPlugin({
      NODE_ENV: ""
    })
  ]
}

export { outputDir }
