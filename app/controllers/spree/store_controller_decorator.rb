Spree::StoreController.class_eval do
  def hydrate_taxonomies(store_name)
    @taxonomies ||= Spree::Taxonomy.includes(root: :children)
    redux_store store_name, props: { taxonomies: @taxonomies }
  end
end
