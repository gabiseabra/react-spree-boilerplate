Spree::StoreController.class_eval do
  def hydrate_taxonomies(store_name)
    @taxonomies ||= Spree::Taxonomy.includes(root: :children)
    json = render_to_json partial: 'spree/taxons/taxonomy.json',
                          collection: @taxonomies,
                          as: :taxonomy
    redux_store store_name, props: { taxonomies: json }
  end
end
