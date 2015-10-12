class CreatePosts < ActiveRecord::Migration
  def change
    create_table :posts do |t|
      t.string :title
      t.text :content
      t.integer :likes, default: 0

      t.timestamps null: false
    end
  end
end
