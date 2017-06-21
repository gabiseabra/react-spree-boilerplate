const path = require("path")
const variables = require("./app/styles/theme")

module.exports = {
  plugins: {
    "postcss-import": {
      path: [ path.join(__dirname, "styles") ]
    },
    "postcss-url": {},
    "postcss-cssnext": {
      features: {
        customProperties: { variables }
      }
    }
  }
}
