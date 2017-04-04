class CreateTaggings < ActiveRecord::Migration[5.0]
  def change
    create_table :taggings do |t|
      t.references :tag, foreign_key: true
      t.integer :taggable_id
      t.string :taggable_type
      # t.belongs_to :taggable, polymorphic: true

      t.timestamps
    end
    add_index :taggings, [:taggable_id, :taggable_type]
  end
end
