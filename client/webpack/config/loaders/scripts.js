export default function build() {
  return [
    {
      test: /\.jsx?$/,
      exclude: /node_modules/,
      loader: "babel-loader"
    }
  ]
}
