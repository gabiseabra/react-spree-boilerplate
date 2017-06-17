module ReduxStoreHydration
  extend ActiveSupport::Concern
  include ReactOnRails::Controller

  included do
    class_attribute :store_hydration_hooks
    class_attribute :store_collections
    class_attribute :store_pagination
    clear_hydrate
    clear_collection
    clear_pagination
  end

  module ClassMethods
    def hydrate(store_name, *methods)
      options = methods.extract_options!

      only_actions = Array(options.delete(:only)).map(&:to_s)
      except_actions = Array(options.delete(:except)).map(&:to_s)

      queue = store_hydration_hooks.dup

      methods.each do |m|
        queue << {
          store_name: store_name.to_s,
          method: :"hydrate_#{m}",
          only: only_actions,
          except: except_actions
        }
      end
      self.store_hydration_hooks = queue.freeze
    end

    def clear_hydrate
      self.store_hydration_hooks = [].freeze
    end

    def collection(name, *args, &block)
      options = args.extract_options!
      hash = store_collections.dup
      hash[name.to_sym] = {
        partial: options[:partial],
        locals: options[:locals],
        selector: block
      }
      self.store_collections = hash.freeze
    end

    def clear_collection
      self.store_collections = {}.freeze
    end

    def paginate(collection)
      self.store_pagination = collection.to_sym
    end

    def clear_pagination
      self.store_pagination = nil
    end
  end

  def hydrate_taxonomies(store_name)
    @taxonomies ||= Spree::Taxonomy.includes(root: :children)
    redux_store store_name, props: { taxonomies: @taxonomies }
  end

  def hydrate_collections(store_name)
    class_collections.each do |name|
      value = class_collection_json name
      redux_store store_name, props: { name => value }
    end
  end

  def hydrate_pagination(store_name)
    value = class_pagination_collection
    redux_store store_name, props: value
  end

  def hydrate
    class_hydration_hooks(action_name.to_s).each do |h|
      method(h[:method]).call h[:store_name]
    end
    respond_to { |f| f.html }
  end

  def render(*args)
    hydrate if request.format.to_sym == :html
    super(*args)
  end

  private

    # Filter hooks for given action
    def select_with_action(hooks, action_name)
      hooks.select do |h|
        if h[:only]
          h[:only].include?(action_name)
        elsif h[:except]
          !h[:except].include?(action_name)
        else
          true
        end
      end
    end

    # Get class hydration defined with hydrate hooks enabled for the
    # given action
    def class_hydration_hooks(action_name = nil)
      hooks = self.class.store_hydration_hooks.dup
      hooks = select_with_action(hooks, action_name) if action_name
    end

    # Get an array of class collection names defined with collection
    def class_collections
      self.class.store_collections.keys
    end

    # Get class collection data by name
    def class_collection(name)
      collection = self.class.store_collections[name].dup
      collection[:record] = instance_eval(&collection[:selector])
      collection
    end

    # Get class collection json for redux state by name
    def class_collection_json(name)
      collection = class_collection name
      partial = collection[:partial]
      locals = collection[:locals]
      record = collection[:record]
      if partial
        locals = locals.call(record) if locals.is_a?(Proc)
        value = render_to_string partial: partial, locals: locals, formats: :json
        JSON.parse value
      else
        record.to_a
      end
    end

    # Get class pagination json for redux state
    def class_pagination_collection
      record = class_collection(self.class.store_pagination).fetch(:record)
      {
        data: record.to_a.map(&:id.to_proc),
        # pagination: ...
      }
    end
end
