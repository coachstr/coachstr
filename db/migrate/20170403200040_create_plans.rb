class CreatePlans < ActiveRecord::Migration[5.0]
  def change
    create_table :plans do |t|
      t.string :title
      t.integer :total_duration
      t.timestamp :start_time

      t.timestamps
    end
  end
end
