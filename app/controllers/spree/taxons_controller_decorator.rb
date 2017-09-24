Spree::TaxonsController.class_eval do
  include ReduxStoreHydration
  respond_to :html, :json
  hydrate 'spreeStore',
          :collections,
          :pagination,
          only: :show
  paginate :products, :taxons
  collection :products,
             partial: 'spree/products/product.json',
             of: -> { @products }
  collection :taxons,
             partial: 'spree/taxons/taxon.json',
             of: -> { @taxon }
end
