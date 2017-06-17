Spree::HomeController.class_eval do
  include ReduxStoreHydration
  respond_to :html, :json
  collection(
    :products,
    partial: 'spree/api/collection',
    locals: ->(record) { { of: record, as: :product } }
  ) { @products }
  hydrate 'spreeStore', :taxonomies, :collections, :pagination, only: :index
  paginate :products
end
