class Like < ActiveRecord::Base
  #Associations
  belongs_to :user
  belongs_to :likable, polymorphic: true

  #validations.
  validates :user_id, uniqueness: { scope: [:likable_id, :likable_type], message: "Your valuable vote already added" }
end
