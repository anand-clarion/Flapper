class Post < ActiveRecord::Base
  #Associations
  belongs_to :user
  has_many :comments, dependent: :destroy
  has_many :likes, as: :likable
end
