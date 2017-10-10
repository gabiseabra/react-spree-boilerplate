module ReactOnRails::RenderingExtension
  def self.custom_context(view_context)
    currency = nil
    if view_context.respond_to?(:current_currency)
      currency = view_context.current_currency
    end
    {
      availableLocales: I18n.available_locales,
      currency: currency
    }
  end
end
