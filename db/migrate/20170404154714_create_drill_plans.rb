class CreateDrillPlans < ActiveRecord::Migration[5.0]
  def change
    create_table :drill_plans do |t|
      t.references :drill, foreign_key: true
      t.references :plan, foreign_key: true
      t.string :order_by

      t.timestamps
    end
  end
end
