json.extract! order, :id, :number, :state
json.token           order.guest_token
json.extract! order, :user_id, :email
json.extract! order, :checkout_steps
json.extract! order, :quantity, :total,
                     :item_total, :tax_total,
                     :ship_total, :adjustment_total

json.line_items(order.line_items) do |item|
  json.extract! item, :id, :quantity, :price, :total
  json.variant_id item.variant.id
  json.variant do
    json.partial! 'spree/products/variant.json', variant: item.variant
  end
end
