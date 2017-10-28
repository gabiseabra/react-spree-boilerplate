json.cache! [current_currency, variant] do
  json.extract! variant, :id, :slug, :name, :description, :price
  json.extract! variant, :sku, :weight, :width, :height
  json.in_stock variant.in_stock?

  json.images(variant.images) do |img|
    json.extract! img, :position, :id, :alt
    json.extract! img, :attachment_content_type, :attachment_width, :attachment_height
    json.mini_url img.attachment.url(:mini)
    json.small_url img.attachment.url(:small)
    json.product_url img.attachment.url(:product)
    json.large_url img.attachment.url(:large)
  end

  json.option_values(variant.option_values) do |option|
    json.extract! option, :id, :name, :presentation
    json.extract! option, :option_type_id, :option_type_name
  end
end
