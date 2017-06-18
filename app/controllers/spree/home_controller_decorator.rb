Spree::HomeController.class_eval do
  include ReduxStoreHydration
  respond_to :html, :json
  collection(:products, partial: 'spree/products/product.json', as: :product) { @products }
  hydrate 'spreeStore', :taxonomies, :collections, :pagination, only: :index
  paginate :products
end
