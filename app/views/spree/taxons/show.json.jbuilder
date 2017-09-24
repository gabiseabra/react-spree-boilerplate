json.taxon do
  json.partial! 'spree/taxons/taxon.json', taxon: @taxon
end

json.products do
  json.array!(@products) do |product|
    json.partial! 'spree/products/product.json', product: product
  end
end

json.partial! 'pagination', locals: { collection: @products }
