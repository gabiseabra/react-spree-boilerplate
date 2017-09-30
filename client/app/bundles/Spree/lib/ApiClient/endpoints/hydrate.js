import _ from "lodash/fp"
import * as entities from "../resources/entities"
import { pagination, search } from "../helpers"

const methods = _.flow(
  _.values,
  _.map(Entity => Entity.hydrate),
  _.compact
)(entities)

export default function hydrate(props) {
  return Object.assign(
    props,
    pagination.hydrate(props),
    search.hydrate(props),
    ...methods.map(fun => fun(props))
  )
}
