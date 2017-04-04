class AddDefaultAvatarToOrganizations < ActiveRecord::Migration[5.0]
  def change
    add_column :organizations, :default_avatar, :string, default: 'http://i.imgur.com/ZfLgPdVt.png'
  end
end
