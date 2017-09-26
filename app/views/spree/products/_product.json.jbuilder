variants = false if local_assigns[:variants].nil?

json.extract! product, :id, :slug, :name, :description
json.has_variants product.has_variants?

json.taxon_ids do
  json.array! product.taxons.map(&:id.to_proc)
end

json.master do
  json.partial! 'spree/products/variant.json', locals: { variant: product.master }
end

json.variants(variants ? product.variants : []) do |variant|
  json.partial! 'spree/products/variant.json', locals: { variant: variant }
end

json.product_properties(product.product_properties) do |prop|
  json.extract! prop, :id, :property_id, :value, :property_name
end

json.option_types(product.option_types) do |prop|
  json.extract! prop, :id, :name, :presentation, :position
end
