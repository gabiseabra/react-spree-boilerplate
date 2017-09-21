import { parse as pagination } from "./pagination"
import { parse as search } from "./search"

export default function hydrate(data) {
  const result = {}
  if("pagination" in data) {
    result.pagination = pagination(data.pagination)
  }
  if("search" in data) {
    result.search = search(data.search)
  }
  return result
}
