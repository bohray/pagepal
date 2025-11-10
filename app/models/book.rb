class Book < ApplicationRecord
  has_many :recommendations, dependent: :destroy
  has_many :users, through: :recommendations

  validates :title, presence: true
  validates :author, presence: true
  validates :genre, presence: true
  validates :image_url, presence: true

  def total_votes
    recommendations.joins(:votes).count
  end

  def average_rating
    recommendations.average(:rating).to_f.round(1)
  end
end