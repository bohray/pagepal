module Api
  module V1
    class RecommendationsController < ApiController
      skip_before_action :authenticate_user!, only: [:index, :show, :trending]

      def index
        @recommendations = Recommendation.includes(:user, :book, :votes).order(created_at: :desc)
        render json: @recommendations.as_json(
          except: [:user_id, :book_id],
          include: {
            user: { only: [:id, :username] },
            book: { 
              except: [:created_at, :updated_at] 
            }
          },
          methods: [:vote_count]
        )
      end

      def show
        @recommendation = Recommendation.includes(:user, :book, :votes).find(params[:id])
        render json: @recommendation.as_json(
          include: [:user, :book],
          methods: [:vote_count]
        )
      end

      def create
        rec_params = params.require(:recommendation).permit(:title, :author, :description, :review, :image_url, :genre)

        @book = Book.find_or_initialize_by(title: rec_params[:title], author: rec_params[:author])
        @book.description = rec_params[:description]
        @book.image_url = rec_params[:image_url]
        @book.genre = rec_params[:genre]

        unless @book.save
          return render json: { errors: @book.errors.full_messages }, status: :unprocessable_entity
        end

        @recommendation = current_user.recommendations.build(
          book: @book,
          review: rec_params[:review]
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
        
        sorted_recommendations = @recommendations.sort_by { |r| -r.trending_score }
        render json: sorted_recommendations.map { |r| {
            review: r.review,
            vote_count: r.vote_count,
            user: {
                id: r.user.id,
                username: r.user.username
            }
        }.merge(r.book.as_json) }
      end

      private

      def book_params
        params.require(:recommendation).permit(:title, :author, :description)
      end
    end
  end
end
