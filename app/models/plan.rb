class Plan < ApplicationRecord
  has_many :taggings, as: :taggable
  has_many :tags, through: :taggings
  has_many :drill_plans
  has_many :drills, through: :drill_plans
  belongs_to :user

  validates :title, presence: true

  default_scope {order('lower(title) asc')}


end
