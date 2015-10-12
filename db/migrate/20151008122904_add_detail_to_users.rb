class AddDetailToUsers < ActiveRecord::Migration
  def change
    add_column :users, :name, :string
    add_column :users, :city, :string
    add_column :users, :username, :string
    add_index :users, :username, unique: true
  end
end
