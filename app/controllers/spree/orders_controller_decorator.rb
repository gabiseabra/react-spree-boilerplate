Spree::OrdersController.class_eval do
  layout 'react_spree_application'
  respond_to :html, :json
end
