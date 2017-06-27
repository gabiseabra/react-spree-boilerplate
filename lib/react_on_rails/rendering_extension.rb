module ReactOnRails::RenderingExtension
  def self.custom_context(_)
    { availableLocales: I18n.available_locales }
  end
end
