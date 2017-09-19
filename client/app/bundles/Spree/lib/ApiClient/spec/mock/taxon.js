const taxon = (id = 1, { name, permalink, parent, taxonomy, taxons } = {}) => ({
  name: name || "Taxon name",
  pretty_name: name || "Taxon name",
  permalink: permalink || "t/taxon_name",
  parent_id: parent || null,
  taxonomy_id: taxonomy || null,
  meta_title: null,
  meta_description: null,
  taxons: (taxons || []).map((opts, i) => taxon(id + i + 1, {
    ...opts,
    taxonomy,
    parent: id
  }))
})

export default taxon
