class Tag < ApplicationRecord
  has_many :taggings
  has_many :taggable, through: :taggings

  validates :name, presence: true
  default_scope {order('name')}

end
