const path = require("path")
const variables = require("./app/styles/theme")

module.exports = {
  plugins: {
    "postcss-import": {
      path: [ path.join(__dirname, "app") ]
    },
    "postcss-url": {},
    "postcss-cssnext": {
      features: {
        customProperties: { variables }
      }
    }
  }
}
