Spree::ProductsController.class_eval do
  include ReduxStoreHydration
  respond_to :html, :json
  hydrate 'spreeStore',
          :collections,
          :pagination,
          only: %i[index show]
  paginate :products
  collection :products,
             partial: 'spree/products/product.json',
             locals: { variants: true },
             of: -> { @product || @products }
end
