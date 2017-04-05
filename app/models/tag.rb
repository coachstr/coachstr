class Tag < ApplicationRecord
  has_many :taggings
  has_many :taggable, through: :taggings
  has_many :plans, through: :taggings, source: 'Plan'
  has_many :drills, through: :taggings, source: 'Drill'

  validates :name, presence: true
  default_scope {order('name')}

end
