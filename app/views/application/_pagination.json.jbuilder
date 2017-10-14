if collection.is_a? Kaminari::PageScopeMethods
  json.extract! collection, :current_page, :total_pages, :total_count
  json.per_page collection.limit_value
else
  json.current_page 1
  json.total_pages 1
end
