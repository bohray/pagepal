class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable
  
  has_many :recommendations, dependent: :destroy
  has_many :votes, dependent: :destroy
  has_many :comments, dependent: :destroy
  
   validates :username, presence: true, uniqueness: true, format: { with: URI::MailTo::EMAIL_REGEXP }

  # Name validations
  validates :name, presence: true, length: { minimum: 2, maximum: 50 }

  # Password validations
  validates :password, presence: true, length: { minimum: 8 }, confirmation: true

  # Optionally, if using `has_secure_password`, Rails will automatically validate password presence
  has_secure_password
end
