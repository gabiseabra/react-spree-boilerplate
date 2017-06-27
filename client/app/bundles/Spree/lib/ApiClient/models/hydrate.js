import _ from "lodash/fp"
import * as models from "./index"

// Collection names => Model
const collections = _.flow(
  _.values,
  _.remove(m => !m.collection),
  _.keyBy(m => m.collection)
)(models)

export default function hydrate(props) {
  const finalProps = _.assign({}, props)
  _.keys(collections).forEach((key) => {
    if(key in props) {
      const model = collections[key]
      const data = props[key]
      finalProps[key] = model.hydrate(data)
    }
  })
  return finalProps
}
