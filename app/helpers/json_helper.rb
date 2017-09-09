module JsonHelper
  # Render template as json
  def render_to_json(*_, **args)
    record = args[:collection]
    args[:formats] = :json
    if args[:partial] && record
      jb_args = args.slice(:partial, :as, :locals, :formats)
      is_collection = record.is_a?(Array) || record.is_a?(ActiveRecord::Relation)
      record = [record] unless is_collection
      JbuilderTemplate.new(self) do |json|
        json.array! record, jb_args
      end.attributes!
    else
      JSON.parse render(args)
    end
  end
end
