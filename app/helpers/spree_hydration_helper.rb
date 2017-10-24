module SpreeHydrationHelper
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

  def hydrate_order(store_name)
    return unless simple_current_order
    json = render_to_json partial: 'spree/orders/order.json',
                          locals: { order: simple_current_order }
    redux_store store_name, props: { order: json }
  end

  def hydrate_flash(store_name)
    json = flash.keys.map { |type| { type: type, message: flash.discard(type) } }
    redux_store store_name, props: { flash: json }
  end
end
