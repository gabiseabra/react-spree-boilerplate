json.array! of do |obj|
  json.partial! "spree/api/#{as}", as => obj
end

