json.cache! taxon do
  json.extract! taxon, :id, :parent_id, :taxonomy_id
  json.extract! taxon, :name, :pretty_name
  json.extract! taxon, :permalink, :position
  json.extract! taxon, :meta_title, :meta_description
  json.taxons(taxon.children) do |t|
    json.partial! 'spree/taxons/taxon.json', taxon: t
  end
end
