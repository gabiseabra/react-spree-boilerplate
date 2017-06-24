json.extract! taxonomy, :id, :name
json.root do
  json.partial! 'spree/taxons/taxon.json', taxon: taxonomy.root
end
