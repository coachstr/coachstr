class User < ApplicationRecord
  belongs_to :organization

  mount_uploader :profile_pic, UserUploader

  validates :name, presence: true
  validates :email, presence: true,
                    uniqueness: true,
                    :format => { :with => /\A([^@\s]+)@((?:[-a-z0-9]+\.)+[a-z]{2,})\Z/ }
  validate :default_avatar, require: false


  def personage(version = :standard)
    if profile_pic?
      profile_pic.versions[version].url
    elsif !default_avatar.blank?
      default_avatar
    else
      FFaker::Avatar.image
    end
  end

end
