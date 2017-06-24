import webpack from "webpack"
import path from "path"
import merge from "webpack-merge"
import loadersFn from "./loaders"
import envConfig from "./env"

const outputDir = path.join(__dirname, "../../../public/webpack")

const context = path.resolve(__dirname, "../..")

export default merge.smart({
  context,
  output: {
    path: outputDir,
    publicPath: "/webpack/"
  },
  resolve: {
    extensions: [ ".js", ".jsx" ],
    alias: {
      images: path.join(__dirname, "../../../app/assets/images"),
      app: path.join(context, "app")
    }
  },
  plugins: [
    new webpack.EnvironmentPlugin({
      NODE_ENV: ""
    })
  ]
}, envConfig)

export const loaders = loadersFn.bind(undefined, context)
