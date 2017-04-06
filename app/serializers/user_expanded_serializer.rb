class UserExpandedSerializer < ActiveModel::Serializer
  attributes :name, :email, :token
  has_one :organization
end
