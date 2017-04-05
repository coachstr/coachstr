class CreateUsers < ActiveRecord::Migration[5.0]
  def change
    create_table :users do |t|
      t.string :name
      t.string :email
      t.string :password_digest
      t.references :organization, foreign_key: true, optional: true

      t.timestamps
    end
  end
end
