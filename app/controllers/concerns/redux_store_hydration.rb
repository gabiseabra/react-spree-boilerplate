module ReduxStoreHydration
  extend ActiveSupport::Concern
  include ReactOnRails::Controller

  included do
    class_attribute :store_hydration_hooks
    clear_hydrate
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
  end

  def hydrate_taxonomies(store_name)
    @taxonomies ||= Spree::Taxonomy.includes(root: :children)
    redux_store store_name, props: { taxonomies: @taxonomies }
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

  def render(*args)
    hydrate
    super(*args)
  end
end
