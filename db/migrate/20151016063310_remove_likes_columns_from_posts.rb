class RemoveLikesColumnsFromPosts < ActiveRecord::Migration
  def change
    remove_column :posts, :likes
    remove_column :comments, :likes
  end
end
