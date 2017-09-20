import url from "url"
import qs from "querystring"

// route() endpoint
export default (api, router) => (target, context = {}) => {
  const { pathname, query: queryString } = url.parse(target)
  const query = qs.parse(queryString)
  return router.resolve({
    ...context,
    path: pathname,
    queryString,
    query
  })
}
