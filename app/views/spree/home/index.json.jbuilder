json.products do
  json.partial! 'spree/api/collection', locals: { of: @products, as: :product }
end

json.pagination do
  json.partial! 'spree/api/pagination', locals: { collection: @products }
end
