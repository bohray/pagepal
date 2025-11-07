module Api
  module V1
    class RecommendationsController < ApiController
      skip_before_action :authenticate_user!, only: [:index, :show, :trending]

      def index
        @recommendations = Recommendation.includes(:user, :book, :votes).order(created_at: :desc)
        render json: @recommendations.as_json(
          include: [:user, :book],
          methods: [:vote_count]
        )
      end

      def show
        @recommendation = Recommendation.includes(:user, :book, :votes, comments: :user).find(params[:id])
        render json: @recommendation.as_json(
          include: [:user, :book, { comments: { include: :user } }],
          methods: [:vote_count]
        )
      end

      def create
        @book = Book.find_or_create_by(book_params)
        @recommendation = current_user.recommendations.build(
          book: @book,
          review: params[:recommendation][:review]
        )

        if @recommendation.save
          render json: @recommendation.as_json(include: [:user, :book], methods: [:vote_count]), status: :created
        else
          render json: { errors: @recommendation.errors.full_messages }, status: :unprocessable_entity
        end
      end

      def destroy
        @recommendation = current_user.recommendations.find(params[:id])
        @recommendation.destroy
        head :no_content
      end

      def vote
        @recommendation = Recommendation.find(params[:id])
        @vote = @recommendation.votes.build(user: current_user)

        if @vote.save
          render json: { vote_count: @recommendation.vote_count }, status: :created
        else
          render json: { errors: @vote.errors.full_messages }, status: :unprocessable_entity
        end
      end

      def unvote
        @recommendation = Recommendation.find(params[:id])
        @vote = @recommendation.votes.find_by(user: current_user)
        
        if @vote
          @vote.destroy
          render json: { vote_count: @recommendation.vote_count }
        else
          render json: { error: 'Vote not found' }, status: :not_found
        end
      end

      def trending
        @recommendations = Recommendation.includes(:user, :book, :votes)
                                        .order('created_at DESC')
                                        .limit(10)
        
        # Sort by trending score
        sorted_recommendations = @recommendations.sort_by { |r| -r.trending_score }
        
        render json: sorted_recommendations.as_json(
          include: [:user, :book],
          methods: [:vote_count]
        )
      end

      private

      def book_params
        params.require(:recommendation).permit(:title, :author, :image_url, :description, :isbn)
      end
    end
  end
end