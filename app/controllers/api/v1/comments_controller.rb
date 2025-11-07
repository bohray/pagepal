module Api
  module V1
    class CommentsController < ApiController
      def create
        @recommendation = Recommendation.find(params[:recommendation_id])
        @comment = @recommendation.comments.build(comment_params)
        @comment.user = current_user

        if @comment.save
          render json: @comment.as_json(include: :user), status: :created
        else
          render json: { errors: @comment.errors.full_messages }, status: :unprocessable_entity
        end
      end

      def destroy
        @comment = current_user.comments.find(params[:id])
        @comment.destroy
        head :no_content
      end

      private

      def comment_params
        params.require(:comment).permit(:content)
      end
    end
  end
end