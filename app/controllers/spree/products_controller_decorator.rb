Spree::ProductsController.class_eval do
  include ReduxStoreHydration
  layout 'react_spree_application'
  respond_to :html, :json
  hydrate 'spreeStore',
          :user,
          :taxonomies,
          :collections,
          :pagination,
          only: %i[index show]
  paginate :products
  collection :products,
             partial: 'spree/products/product.json',
             of: -> { @product || @products },
             as: :product
end
