class UserSerializer < ActiveModel::Serializer
  attributes :id, :name, :email, :password_digest
  has_one :organization
end
