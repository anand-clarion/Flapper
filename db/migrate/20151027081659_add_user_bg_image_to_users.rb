class AddUserBgImageToUsers < ActiveRecord::Migration
  def self.up
    change_table :users do |t|
      t.attachment :bg_avatar
    end
  end

  def self.down
    remove_attachment :users, :bg_avatar
  end
end
