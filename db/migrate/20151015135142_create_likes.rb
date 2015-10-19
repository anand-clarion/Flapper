class CreateLikes < ActiveRecord::Migration
  def change
    create_table :likes do |t|
      t.references :user, index: true, foreign_key: true
      t.integer :likable_id
      t.string :likable_type

      t.timestamps null: false
    end
  end
end
