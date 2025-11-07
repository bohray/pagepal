class Recommendation < ApplicationRecord
  belongs_to :user
  belongs_to :book
  has_many :votes, dependent: :destroy
  has_many :comments, dependent: :destroy

  validates :review, presence: true, length: { maximum: 250 }

  def vote_count
    votes.count
  end

  def voted_by?(user)
    return false unless user
    votes.exists?(user_id: user.id)
  end

  def trending_score
    # Higher score for recent votes
    time_decay = Math.exp(-(Time.now - created_at) / 7.days)
    vote_count * time_decay
  end
end