import webpack from "webpack"
import path from "path"
import merge from "webpack-merge"
import loadersFn from "./loaders"
import envConfig from "./env"

const outputDir = path.join(__dirname, "../../../app/assets/webpack")

const context = path.resolve(__dirname, "../..")

export default merge.smart({
  context,
  output: {
    path: outputDir
  },
  resolve: {
    extensions: [ ".js", ".jsx" ]
  },
  plugins: [
    new webpack.EnvironmentPlugin([
      "NODE_ENV",
      "REACT_ON_RAILS_ENV"
    ])
  ]
}, envConfig)

export const loaders = loadersFn.bind(undefined, context)
