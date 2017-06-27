json.products do
  json.array!(@products) do |product|
    json.partial! 'product', product: product
  end
end

json.partial! 'pagination', locals: { collection: @products }
