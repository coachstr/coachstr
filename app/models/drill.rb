class Drill < ApplicationRecord
  has_many :drill_plans
  has_many :plans, through: :drill_plans
  has_many :tags, as: :taggable
end
