module ReduxStoreHydration
  extend ActiveSupport::Concern
  include ReactOnRails::Controller

  included do
    class_attribute :store_hydration_hooks
    class_attribute :store_collections
    clear_hydrate
    clear_collection
  end

  module ClassMethods
    def hydrate(store_name, *methods)
      options = methods.extract_options!

      only_actions = Array(options.delete(:only)).map(&:to_s)
      except_actions = Array(options.delete(:except)).map(&:to_s)

      queue = store_hydration_hooks.dup
      methods.each do |m|
        queue << {
          store_name: store_name,
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

    def collection(name, &block)
      hash = store_collections.dup
      hash[name.to_s] = block
      self.store_collections = hash.freeze
    end

    def clear_collection
      self.store_collections = {}.freeze
    end
  end

  def hydrate_taxonomies(store_name)
    @taxonomies ||= Spree::Taxonomy.includes(root: :children)
    redux_store store_name, props: { taxonomies: @taxonomies }
  end

  def hydrate_collections(store_name)
    class_collections.each do |name, value|
      value = self.instance_eval &value
      value = normalize_collection name, value
      redux_store store_name, props: value
    end
  end

  def hydrate
    class_hydration_hooks(action_name.to_s).each do |h|
      method(h[:method]).call h[:store_name]
    end
  end

  def class_hydration_hooks(action_name = nil)
    hooks = self.class.store_hydration_hooks.dup
    hooks.select! do |h|
      if h[:only]
        h[:only].include?(action_name)
      elsif h[:except]
        !h[:except].include?(action_name)
      else
        true
      end
    end if action_name

    hooks
  end

  def class_collections
    self.class.store_collections.dup
  end

  def normalize_collection(name, record)
    if record.is_a? ActiveRecord::Relation
      { name => record.to_a }
    else
      record
    end
  end

  def render(*args)
    hydrate
    super(*args)
  end
end
