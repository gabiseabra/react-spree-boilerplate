import path from "path"

const localIdentName = (
  process.env.NODE_ENV === "development" ?
  "[name]_[local]--[hash:base64:5]" :
  "[hash:base64:5]"
)

const defaults = context => ({
  mcss: {
    localIdentName,
    modules: true,
    importLoaders: 2
  },
  sass: {
    includePaths: [
      path.join(context, "app")
    ]
  },
  url: {
    silent: true
  },
  modules: {
    include: [
      path.join(context, "app")
    ],
    exclude: [
      /global\.\w+$/,
      path.join(context, "app/styles")
    ]
  }
})

export default function build(context, opts) {
  const {
    modules: condition,
    extract,
    fallback,
    ...options
  } = Object.assign(opts, defaults(context))
  const loaders = [
    {
      test: /\.css$/,
      use: [ /* { loader: "postcss-loader", options: options.postcss } */ ]
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
