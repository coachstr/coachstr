class Library < ApplicationRecord
  has_many :lib_drills
  has_many :drills, through: :lib_drills

  belongs_to :user

  validates :title, presence: true

  default_scope {order('lower(title) asc')}
end
