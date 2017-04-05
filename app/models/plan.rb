class Plan < ApplicationRecord
  has_many :taggings, as: :taggable
  has_many :tags, through: :taggings
  has_many :drill_plans
  has_many :drills, through: :drill_plans

  validates :title, presence: true
  validates :total_duration, presence: true
end
