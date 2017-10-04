Spree::StoreController.class_eval do
  skip_before_action :set_current_order, only: %i[cart_link authenticity_token]

  def cart_link
    order = simple_current_order
    render partial: "spree/orders/order.json", locals: { order: order }
    fresh_when order
  end

  def authenticity_token
    render json: { authenticity_token: form_authenticity_token }
  end
end
