class User < ActiveRecord::Base
  #Associations
  has_many :posts, dependent: :destroy
  has_many :likes, as: :likable
  has_attached_file :avatar, styles: { medium: "300x300>", thumb: "100x100>" }, default_url: "/images/winter-tree1.jpg"
  validates_attachment_content_type :avatar, content_type: /\Aimage\/.*\Z/

  #Validations
  validates :name, presence: true, length: { minimum: 3, message: "Please use atleast 3 character name" }

  # Devise Authentication
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable
end
