class AddDrillPicToDrills < ActiveRecord::Migration[5.0]
  def change
    add_column :drills, :drill_pic, :string
  end
end
