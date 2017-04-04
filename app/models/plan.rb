class Plan < ApplicationRecord
  has_many :tags, as: :taggable
  has_many :drill_plans
  has_many :drills, though: :drill_plans

  validates :title, presence: true
  validates :total_duration, presence: true
end
