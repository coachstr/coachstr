class CreateDrills < ActiveRecord::Migration[5.0]
  def change
    create_table :drills do |t|
      t.string :title
      t.text :description
      t.integer :duration

      t.timestamps
    end
  end
end
