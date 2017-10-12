import autoprefixer from "autoprefixer"

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
      context
    ]
  },
  postcss: {
    plugins: [
      autoprefixer
    ]
  },
  url: {
    silent: true
  },
  modules: {
    include: [
      context
    ],
    exclude: [
      /global\.\w+$/
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
      use: []
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
      use: [
        { loader: "css-loader", options: options.css },
        { loader: "postcss-loader", options: options.postcss },
        ...use
      ]
    },
    {
      test,
      include: condition,
      use: [
        { loader: "css-loader", options: options.mcss },
        { loader: "postcss-loader", options: options.postcss },
        ...use
      ]
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
