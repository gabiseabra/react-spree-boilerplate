if collectin.is_a? ActiveRecord::Relation
  json.extract! collection, :current_page, :total_pages, :total_count
  json.per_page collection.limit_value
else
  json.current_page 1
end
