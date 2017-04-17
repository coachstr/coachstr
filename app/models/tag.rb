class Tag < ApplicationRecord
  has_many :taggings
  has_many :taggable, through: :taggings
  has_many :plans, through: :taggings, source: :taggable, source_type: 'Plan'
  has_many :drills, through: :taggings, source: :taggable, source_type: 'Drill'

  validates :name, presence: true
  default_scope {order('name')}

end
