Spree::StoreController.class_eval do
  skip_before_action :set_current_order, only: :authenticity_token

  def authenticity_token
    render json: { authenticity_token: form_authenticity_token }
  end
end
