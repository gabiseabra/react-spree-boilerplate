const name = "images/[hash:5].[ext]"
const limit = 10000

export default function build() {
  return [
    {
      test: /\.(jpe?g|png|gifv?|ico)?$/,
      loader: "url-loader",
      options: { limit, name }
    },
    {
      test: /\.(ttf|eot|svg|woff2?)?$/,
      loader: "file-loader",
      options: { name }
    }
  ]
}
