class UserSerializer < ActiveModel::Serializer
  attributes :id, :name, :email, :token
end



# super user invite model
#
# view only link for drills and plans
