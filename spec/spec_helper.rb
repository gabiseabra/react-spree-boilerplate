ENV['RAILS_ENV'] ||= 'test'
require File.expand_path('../../config/environment', __FILE__)
require 'rspec/rails'
require 'rails/test_help'

RSpec.configure do |config|
  config.infer_base_class_for_anonymous_controllers = true
end

class ActiveSupport::TestCase
  # Setup all fixtures in spec/fixtures/*.yml for all tests in alphabetical order.
  fixtures :all

  # Add more helper methods to be used by all tests here...
end
