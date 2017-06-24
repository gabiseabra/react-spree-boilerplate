json.extract! taxon, :id, :parent_id, :taxonomy_id
json.extract! taxon, :name, :pretty_name
json.extract! taxon, :permalink, :position
json.taxons(taxon.children) do |t|
  json.partial! 'spree/taxons/taxon.json', taxon: t
end
