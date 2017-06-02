import webpack from "webpack"

export default {
  plugins: [
    new webpack.HashedModuleIdsPlugin(),
    new webpack.optimize.UglifyJsPlugin({
      minimize: true,
      sourceMap: false
    })
  ]
}
