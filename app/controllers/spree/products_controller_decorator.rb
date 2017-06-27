Spree::ProductsController.class_eval do
  include ReduxStoreHydration
  respond_to :html, :json
  hydrate 'spreeStore', :taxonomies, :collections, :pagination, only: %i[index show]
  paginate :products
  collection :products,
             partial: 'spree/products/product.json',
             of: -> { @product || @products },
             as: :product
end
