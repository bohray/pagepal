module Api
  module V1
    class UsersController < ApiController
      skip_before_action :authenticate_user!, only: [:show, :current]

      def current
        if current_user
          render json: { user: current_user.as_json(only: [:id, :email, :username]) }
        else
          render json: { user: nil }
        end
      end

      def show
        @user = User.find(params[:id])
        @recommendations = @user.recommendations.includes(:book, :votes)
        
        render json: {
          user: @user.as_json(only: [:id, :username, :email]),
          recommendations: @recommendations.as_json(
            include: :book,
            methods: [:vote_count]
          ),
          total_votes_received: @recommendations.sum(&:vote_count)
        }
      end
    end
  end
end