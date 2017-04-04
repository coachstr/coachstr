class AddDefaultAvatarToDrills < ActiveRecord::Migration[5.0]
  def change
    add_column :drills, :default_avatar, :string
  end
end
