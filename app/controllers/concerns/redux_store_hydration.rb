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
    def hydrate(store_name, *methods, **options)
      collections = Array(options.delete(:collections))
      only_actions = Array(options.delete(:only)).map(&:to_s)
      except_actions = Array(options.delete(:except)).map(&:to_s)
      args = Array(options.delete(:args))
      hook = {
        store_name: store_name.to_s,
        args: args,
        only: only_actions,
        except: except_actions
      }
      queue = store_hydration_hooks.dup
      methods.each { |m| queue << hook.merge(method: :"hydrate_#{m}") }
      collections.each { |c| queue << hook.merge(method: :hydrate_collection, args: [c]) }
      self.store_hydration_hooks = queue.freeze
    end

    def clear_hydrate
      self.store_hydration_hooks = [].freeze
    end

    def collection(name, **args)
      hash = store_collections.dup
      hash[name.to_sym] = {
        partial: args.fetch(:partial, nil),
        locals: args.fetch(:locals, {}),
        # Object variable for partial template
        as: args.fetch(:as, name.to_s.singularize.to_sym),
        selector: args.fetch(:of)
      }
      self.store_collections = hash.freeze
    end

    def clear_collection
      self.store_collections = {}.freeze
    end

    def paginate(main, *collections)
      self.store_pagination = {
        main: main,
        meta: collections
      }.freeze
    end

    def clear_pagination
      self.store_pagination = {}.freeze
    end
  end

  def hydrate_collection(store_name, name)
    value = class_collection_json name
    redux_store store_name, props: { name => value }
  end

  def hydrate_collections(store_name)
    class_collection_names.each do |name|
      hydrate_collection store_name, name
    end
  end

  def hydrate_pagination(store_name)
    value = class_pagination_collection
    redux_store store_name, props: value
  end

  def hydrate
    class_hydration_hooks(action_name.to_s).each do |h|
      method(h[:method]).call h[:store_name], *h[:args]
    end
  end

  def render(*args)
    if request.format.to_sym == :html
      hydrate
      respond_to { |f| f.html }
    end
    super
  end

  private

  # Filter hooks for given action
  def select_with_action(hooks, action_name)
    hooks.select do |h|
      next h[:only].include?(action_name) unless h[:only].empty?
      next !h[:except].include?(action_name) unless h[:except].empty?
      next true
    end
  end

  # Get class hydration defined with hydrate hooks enabled for the
  # given action
  def class_hydration_hooks(action_name = nil)
    hooks = self.class.store_hydration_hooks.dup
    hooks = select_with_action(hooks, action_name) if action_name
  end

  # Get an array of class collection names defined with collection
  def class_collection_names
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
    record = collection[:record]
    if collection[:partial]
      view_context.render_to_json(collection.merge(collection: record, formats: :json))
    elsif record.respond_to?(:to_a)
      record.to_a
    else
      [record]
    end
  end

  # Get class pagination json for redux state
  def class_pagination_collection
    main = self.class.store_pagination[:main]
    others = self.class.store_pagination[:meta]
    records = { main => class_collection(main).fetch(:record) }
    others.each do |key|
      records[key] = class_collection(key).fetch(:record)
    end
    data = records.transform_values { |r| Array(r).map(&:id.to_proc) }
    pagination = view_context.render_to_json partial: 'pagination',
                                             locals: { collection: records[main] }
    { data: data, pagination: pagination }
  end
end
