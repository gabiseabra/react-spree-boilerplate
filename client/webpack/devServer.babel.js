import url from "url"
import merge from "webpack-merge"
import config from "./bundles/app.babel"

const PORT = process.env.REACT_ON_RAILS_PORT || 3500
const targetUrl = `http://localhost:${PORT}/`
const publicPath = url.resolve(targetUrl, config.output.publicPath)

export default merge(config, {
  output: {
    publicPath
  },
  devServer: {
    port: PORT,
    publicPath,
    quiet: true,
    // noInfo: true,
    compress: true,
    headers: {
      "Access-Control-Allow-Origin": "*"
    },
    stats: {
      colors: true
    }
  }
})
