Spree::HomeController.class_eval do
  include ReduxStoreHydration
  respond_to :html, :json
  collection(:product, partial: 'spree/products/product.json') { @products }
  hydrate 'spreeStore', :taxonomies, :collections, :pagination, only: :index
  paginate :product
end
