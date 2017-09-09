require 'spec_helper'

describe ReduxStoreHydration do
  before do
    class TestController < ApplicationController
      include ReduxStoreHydration

      hydrate 'testStore',
              :collections,
              :pagination,
              :test

      paginate :foo

      collection :foo,
                 of: -> { @foo }

      collection :bar,
                 of: -> { @bar },
                 as: :baz

      def setup(foo, bar)
        @foo = foo
        @bar = bar
      end

      def redux_store_data
        @registered_stores_defer_render
      end

      def hydrate_test(store_name)
        redux_store store_name, props: { test: true }
      end
    end
  end

  after { Object.send :remove_const, :TestController }

  let(:foo) { Array.new(3) { |i| double('Foo', id: i) } }
  let(:bar) { double('Bar', id: 1) }
  let(:controller) do
    controller = TestController.new
    controller.setup(foo, bar)
    controller
  end

  describe 'hydrate' do
    let(:redux_store_data) do
      controller.hydrate
      controller.redux_store_data
    end

    it 'hydrates defined collections' do
      expect(redux_store_data).to include(
        store_name: 'testStore',
        props: { foo: foo }
      )
      expect(redux_store_data).to include(
        store_name: 'testStore',
        props: { baz: [bar] }
      )
    end

    it 'hydrates with defined methods' do
      expect(redux_store_data).to include(
        store_name: 'testStore',
        props: { test: true }
      )
    end
  end
end
