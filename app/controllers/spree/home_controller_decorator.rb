Spree::HomeController.class_eval do
  include ReduxStoreHydration
  respond_to :html, :json
  hydrate 'spreeStore', :taxonomies, :collections, only: :index
  collection(:products, partial: 'spree/api/collection') {{ of: @products, as: :product }}
end
