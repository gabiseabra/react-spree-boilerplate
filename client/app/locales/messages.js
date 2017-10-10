import _ from "lodash"
import { defaultMessages } from "./rails/default"

const messages = {}
let ready = false

// Unflatten rails messages
Object.values(defaultMessages).forEach((descriptor) => {
  const path = descriptor.id
    .split(".")
    .map(_.camelCase)
    .join(".")
  if(process.env.NODE_ENV === "development") {
    // Rails translations need to be compiled every time a new message is
    // added. To avoid running into errors in development, use a proxy
    // to return a valid message descriptor when a missing translation is
    // requested.
    _.setWith(messages, path, descriptor, (value, key) => {
      if(!value) {
        return new Proxy({}, {
          get(target, name) {
            if(name in target) return target[name]
            if(ready) {
              const id = _.snakeCase(name)
              console.warn(`Missing rails translation ${key} > ${id}`)
              return { id: `${key}.${id}` }
            }
            return undefined
          }
        })
      }
      return undefined
    })
  } else {
    _.set(messages, path, descriptor)
  }
})

ready = true

module.exports = messages
