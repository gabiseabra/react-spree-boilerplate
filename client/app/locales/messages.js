import _ from "lodash"
import { defaultMessages } from "./rails/default"

const messages = {}

// Unflatten rails messages
Object.values(defaultMessages).forEach((descriptor) => {
  const path = descriptor.id
    .split(".")
    .map(_.camelCase)
    .join(".")
  _.set(messages, path, descriptor)
})

module.exports = messages
