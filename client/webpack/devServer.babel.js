import url from "url"
import merge from "webpack-merge"
import config from "./bundles/app.babel"

const HOST = process.env.HOST || "localhost"
const PORT = process.env.DEV_PORT || 3500
const targetUrl = `http://${HOST}:${PORT}/`
const publicPath = url.resolve(targetUrl, config.output.publicPath)

export default merge(config, {
  output: {
    publicPath
  },
  devServer: {
    host: HOST,
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
