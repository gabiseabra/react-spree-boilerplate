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

  ]
}, envConfig)

export const loaders = loadersFn.bind(undefined, context)
