json.extract! order, :id, :number, :state
json.extract! order, :user_id, :email
json.extract! order, :quantity, :total, :item_total, :tax_total, :ship_total, :adjustment_total

json.line_items(order.line_items) do |item|
  json.extract! item, :id, :quantity, :price, :total
  json.variant_id item.variant.id
  json.partial! 'spree/products/variant.json', variant: item.variant
end
