class AddUserIdToDrill < ActiveRecord::Migration[5.0]
  def change
    add_reference :drills, :user, foreign_key: true
  end
end
