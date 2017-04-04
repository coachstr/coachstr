class AddDefaultAvatarToUsers < ActiveRecord::Migration[5.0]
  def change
    add_column :users, :default_avatar, :string, default: 'http://i.imgur.com/lsyjVvwt.png'
  end
end
