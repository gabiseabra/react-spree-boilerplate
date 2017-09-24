Spree::HomeController.class_eval do
  include ReduxStoreHydration
  respond_to :html, :json
  hydrate 'spreeStore',
          :collections,
          :pagination,
          only: :index
  paginate :products
  collection :products,
             partial: 'spree/products/product.json',
             of: -> { @products }
end
