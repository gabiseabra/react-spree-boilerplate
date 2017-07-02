Spree::StoreController.class_eval do
  skip_before_action :set_current_order, only: :authenticity_token

  def authenticity_token
    render json: { authenticity_token: form_authenticity_token }
  end

  protected

  def hydrate_taxonomies(store_name)
    @taxonomies ||= Spree::Taxonomy.includes(root: :children)
    json = render_to_json partial: 'spree/taxons/taxonomy.json',
                          collection: @taxonomies,
                          as: :taxonomy
    redux_store store_name, props: { taxonomies: json }
  end

  def hydrate_user(store_name)
    return unless spree_current_user
    json = render_to_json partial: 'spree/shared/user.json',
                          locals: { user: spree_current_user }
    redux_store store_name, props: { user: json }
  end

  def hydrate_auth_token(store_name)
    redux_store store_name, props: { authenticity_token: form_authenticity_token }
  end
end
