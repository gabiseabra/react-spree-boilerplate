per_page ||= params[:per_page].try(:to_i) || Spree::Config[:products_per_page]

json.extract! collection, :current_page, :total_pages, :total_count

json.per_page per_page
