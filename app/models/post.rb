class Post < ActiveRecord::Base
  has_many :comments, dependent: :destroy
  belongs_to :user
  has_many :likes, as: :likable

  # def as_json(options = {})
  #   super(options.merge(include: :comments))
  # end

end
