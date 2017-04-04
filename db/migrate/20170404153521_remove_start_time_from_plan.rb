class RemoveStartTimeFromPlan < ActiveRecord::Migration[5.0]
  def change
    remove_column :plans, :start_time, :timestamp
  end
end
