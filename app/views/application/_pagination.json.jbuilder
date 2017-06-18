json.extract! collection, :current_page, :total_pages, :total_count

json.per_page collection.limit_value
