class UserSerializer < ActiveModel::Serializer
  attributes :name, :email
  has_one :organization
end



# super user invite model
#
# view only link for drills and plans
