json.products do
  json.partial! 'spree/api/collection', locals: { of: @products, as: :product }
end

json.partial! 'spree/api/pagination', locals: { collection: @products }
