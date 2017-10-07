import _ from "lodash/fp"
import * as entities from "../resources/entities"
import { pagination } from "../helpers"

const methods = _.flow(
  _.values,
  _.map(Entity => Entity.hydrate.bind(Entity)),
  _.compact
)(entities)

export default function hydrate(props) {
  return Object.assign(
    props,
    pagination.hydrate(props),
    ...methods.map(fun => fun(props))
  )
}
