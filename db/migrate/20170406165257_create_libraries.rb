class CreateLibraries < ActiveRecord::Migration[5.0]
  def change
    create_table :libraries do |t|
      t.string :title
      t.references :user, foreign_key: true
      t.boolean :private, default: true

      t.timestamps
    end
  end
end
