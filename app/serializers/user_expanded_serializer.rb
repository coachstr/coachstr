class UserExpandedSerializer < ActiveModel::Serializer
  attributes :name, :email, :token
end
