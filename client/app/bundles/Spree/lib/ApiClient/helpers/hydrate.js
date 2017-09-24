import { parse as pagination } from "./pagination"
import { parse as search } from "./search"

export default function hydrate(data) {
  const result = {}
  if(data.pagination) {
    result.pagination = pagination(data.pagination)
  }
  if(data.search) {
    result.search = search(data.search)
  }
  return result
}
