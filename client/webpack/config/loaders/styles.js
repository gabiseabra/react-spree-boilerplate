import path from "path"
import variables from "../../../styles/variables"

const defaults = {
  mcss: {
    modules: true,
    importLoaders: 2,
    localIdentName: "[hash:base64:5]"
  },
  less: {
    modifyVars: variables
  },
  url: {
    silent: true
  }
}

if(process.env.NODE_ENV === "development") {
  defaults.mcss.localIdentName = "[name]_[local]--[hash:base64:5]"
}

export default function build(context, opts) {
  const {
    modules,
    extract,
    fallback,
    ...options
  } = Object.assign({
    modules: [
      path.join(context, "styles"),
      path.join(context, "app")
    ]
  }, opts, defaults)
  const condition = {
    include: modules,
    exclude: /global\.\w+$/
  }
  const loaders = [
    {
      test: /\.css$/,
      use: [ { loader: "postcss-loader", options: options.postcss } ]
    },
    {
      test: /\.less$/,
      use: [ { loader: "less-loader", options: options.less } ]
    },
    {
      test: /\.s[ac]ss$/,
      use: [ { loader: "sass-loader", options: options.sass } ]
    }
  ].reduce((arr, { test, use }) => arr.concat(
    {
      test,
      exclude: condition,
      use: [ { loader: "css-loader", options: options.css }, ...use ]
    },
    {
      test,
      include: condition,
      use: [ { loader: "css-loader", options: options.mcss }, ...use ]
    }
  ), [])
  if(extract) {
    return loaders.map(loader => ({
      ...loader,
      use: extract.extract({
        use: loader.use,
        fallback
      })
    }))
  }
  return loaders
}
