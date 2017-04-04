class Drill < ApplicationRecord
  has_many :drill_plans
  has_many :plans, through: :drill_plans
  has_many :tags, as: :taggable

  mount_uploader :drill_pic, DrillUploader

  validates :title, presence: true
  validates :description, presence: true
  validates :duration, presence: true
  validates :default_avatar,  require: false

  def personage(version = :standard)
    if drill_pic?
      drill_pic.versions[version].url
    elsif !default_avatar.blank?
      default_avatar
    else
      FFaker::Avatar.image
    end
  end



end
