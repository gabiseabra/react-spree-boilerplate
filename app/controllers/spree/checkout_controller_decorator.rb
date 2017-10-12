Spree::CheckoutController.class_eval do
  include ReduxStoreHydration
  respond_to :html, :json
  hydrate 'spreeStore',
          :collections,
          only: :edit
  collection :countries, of: -> { Spree::Country.all }
end
