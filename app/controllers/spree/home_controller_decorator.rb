Spree::HomeController.class_eval do
  include ReduxStoreHydration
  respond_to :html, :json
  hydrate 'spreeStore', :taxonomies, only: :index
end
