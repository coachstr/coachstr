class CreateLibDrills < ActiveRecord::Migration[5.0]
  def change
    create_table :lib_drills do |t|
      t.references :drill, foreign_key: true
      t.references :library, foreign_key: true
    end
  end
end
