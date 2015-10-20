class Comment < ActiveRecord::Base
  #Associations
  belongs_to :post
  belongs_to :user
  has_many :likes, as: :likable
end
