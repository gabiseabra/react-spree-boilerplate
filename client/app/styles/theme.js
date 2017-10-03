const flatten = require("flat")
const path = require("path")
const fs = require("fs")
const yaml = require("js-yaml")

const file = fs.readFileSync(path.join(__dirname, "theme.yml"), "utf8")
const config = yaml.safeLoad(file)

module.exports = flatten(config, { delimiter: "-" })
