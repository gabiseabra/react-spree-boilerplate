Spree::HomeController.class_eval do
  include ReduxStoreHydration
  layout 'react_spree_application'
  respond_to :html, :json
  hydrate 'spreeStore',
          :taxonomies,
          :collections,
          :pagination,
          only: :index
  paginate :products
  collection :products,
             partial: 'spree/products/product.json',
             of: -> { @products },
             as: :product
end
