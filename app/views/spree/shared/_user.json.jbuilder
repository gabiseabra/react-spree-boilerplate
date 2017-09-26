json.extract! user, :id, :email, :login

json.bill_address do
  if user.bill_address
    json.partial! 'spree/shared/address.json', address: user.bill_address
  else
    json.null!
  end
end

json.ship_address do
  if user.ship_address
    json.partial! 'spree/shared/address.json', address: user.ship_address
  else
    json.null!
  end
end
