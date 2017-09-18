import _ from "lodash"

export const search = (predicates) => {
  const query = {}
  Object.keys(predicates).forEach((key) => {
    query[`q[${key}]`] = predicates[key]
  })
  return query
}

export const pagination = ({ page, perPage }) => _.pickBy({
  page,
  per_page: perPage
}, val => val !== undefined)
