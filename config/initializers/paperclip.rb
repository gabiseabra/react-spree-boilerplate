if Rails.application.secrets.aws_secret_key_id
  Paperclip::Attachment.default_options.merge!(
    storage: :s3,
    s3_protocol: :https,
    s3_region: Rails.application.secrets.aws_s3_region_name,
    aws_credentials: {
      bucket: Rails.application.secrets.aws_s3_bucket_name,
      access_key_id: Rails.application.secrets.aws_secret_key_id,
      secret_access_key: Rails.application.secrets.aws_secret_access_id
    },
    s3_headers: {
      'Cache-Control' => 'max-age=31557600'
    },
    url: ':s3_domain_url',
    path: ':class/:attachment/:id_partition/:style/:filename'
  )
end
