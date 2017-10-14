Spree::ProductsController.class_eval do
  include ReduxStoreHydration
  layout 'react_spree_application'
  respond_to :html, :json
  hydrate 'spreeStore',
          :pagination,
          collections: %i[products],
          only: %i[index show]
  hydrate 'spreeStore',
          collections: %i[variants],
          only: :show
  paginate :products
  collection :products,
             partial: 'spree/products/product.json',
             of: -> { @product || @products }
  collection :variants,
             partial: 'spree/products/variant.json',
             of: -> { @product.variants }
end
