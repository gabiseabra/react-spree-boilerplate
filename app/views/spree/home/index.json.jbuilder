json.products do
  json.partial! 'spree/api/collection', of: @products, as: :product
end

