const path = require("path")
const fs = require("fs")
const yaml = require("js-yaml")

const config = fs.readFileSync(path.join(__dirname, "theme.yml"), "utf8")

module.exports = yaml.safeLoad(config)
