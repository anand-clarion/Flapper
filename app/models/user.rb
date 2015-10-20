class User < ActiveRecord::Base
  #Associations
  has_many :posts, dependent: :destroy
  has_many :likes, as: :likable

  #Validations
  validates :name, presence: true, length: { minimum: 3, message: "Please use atleast 3 character name" }

  # Devise Authentication
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable
end
