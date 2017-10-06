import _ from "lodash"

const merge = (obj, src) => {
  if(!obj) return src
  if(!src) return obj
  return [ ...obj, ...src ]
}

export default function extract(resources) {
  return _.assignWith(...resources.map(value => value.collection), merge)
}
