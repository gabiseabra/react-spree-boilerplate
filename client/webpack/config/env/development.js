import webpack from "webpack"

export default {
  devtool: "inline-source-map",
  plugins: [ new webpack.NamedModulesPlugin() ]
}
