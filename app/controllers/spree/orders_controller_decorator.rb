Spree::OrdersController.class_eval do
  layout :layout
  respond_to :html, :json

  private

  def layout
    if action_name == 'edit'
      'react_spree_application'
    else
      'spree_application'
    end
  end
end
