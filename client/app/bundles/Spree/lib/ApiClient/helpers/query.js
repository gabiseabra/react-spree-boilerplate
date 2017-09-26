import _ from "lodash"
import { query as pagination } from "./pagination"
import { query as search } from "./search"

export { pagination, search }

export default function buildQuery(props) {
  return Object.assign(
    search(props.search || {}),
    pagination(_.pick(props, [ "page", "perPage" ]))
  )
}
