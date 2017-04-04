class Organization < ApplicationRecord
  has_many :users

  mount_uploader :org_pic, OrganizationUploader

  validates :title, presence: true, uniqueness: true
  validates :default_avatar, require: false

  def personage(version = :standard)
    if org_pic?
      org_pic.versions[version].url
    elsif !default_avatar.blank?
      default_avatar
    else
      'FFaker::Avatar.image'
    end
  end



end
