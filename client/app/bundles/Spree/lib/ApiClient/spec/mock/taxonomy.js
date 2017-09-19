import taxon from "./taxon"

export default (id = 1, opts = {}) => {
  const root = taxon(id, {
    ...opts,
    taxonomy: id
  })
  return {
    id,
    name: root.name,
    root
  }
}
