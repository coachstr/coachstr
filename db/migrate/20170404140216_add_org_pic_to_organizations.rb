class AddOrgPicToOrganizations < ActiveRecord::Migration[5.0]
  def change
    add_column :organizations, :org_pic, :string
  end
end
