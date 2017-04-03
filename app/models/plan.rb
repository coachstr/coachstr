class Plan < ApplicationRecord
  has_many :tags, as: :taggable
  has_many :drill_plans
  has_many :drills, though: :drill_plans
end
