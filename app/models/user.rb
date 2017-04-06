class User < ApplicationRecord
  has_many :libraries

  mount_uploader :profile_pic, UserUploader

  validates :name, presence: true
  validates :email, presence: true,
                    uniqueness: true,
                    :format => { :with => /\A([^@\s]+)@((?:[-a-z0-9]+\.)+[a-z]{2,})\Z/ }
  validates :default_avatar, require: false

  has_secure_password
  has_secure_token :token

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
