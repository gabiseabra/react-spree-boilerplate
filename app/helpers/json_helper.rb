module JsonHelper
  # Render template as json
  def render_to_json(*_, **args)
    record = args[:collection]
    args[:formats] = :json
    if args[:partial] && record
      jb_args = args.slice(:partial, :as, :locals, :formats)
      record = [record] unless record.is_a? ActiveRecord::Relation
      JbuilderTemplate.new(self) do |json|
        json.array! record, jb_args
      end.attributes!
    else
      JSON.parse render(args)
    end
  end
end
