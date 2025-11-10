class Recommendation < ApplicationRecord
  belongs_to :user
  belongs_to :book
  has_many :votes, dependent: :destroy

  validates :review, presence: true, length: { maximum: 250 }

  def vote_count
    votes.count
  end

  def voted_by?(user)
    return false unless user
    votes.exists?(user_id: user.id)
  end

  def voter_ids(exclude_user = nil)
    ids = votes.pluck(:user_id)
    exclude_user ? ids - [exclude_user.id] : ids
  end

  def trending_score
    # Higher score for recent votes
    time_decay = Math.exp(-(Time.now - created_at) / 7.days)
    vote_count * time_decay
  end
end