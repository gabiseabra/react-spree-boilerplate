json.extract! product, :id, :slug, :name, :description, :price, :available_on
json.has_variants product.has_variants?
json.master do
  json.partial! 'spree/products/master', locals: { master: product.master }
end
