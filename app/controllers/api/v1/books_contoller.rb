module Api
  module V1
    class BooksController < ApiController
      skip_before_action :authenticate_user!, only: [:index, :show]

      def index
        @books = Book.all.includes(:recommendations)
        render json: @books.as_json(
          include: {
            recommendations: {
              include: :user,
              methods: :vote_count
            }
          }
        )
      end

      def show
        @book = Book.find(params[:id])
        render json: @book.as_json(
          include: {
            recommendations: {
              include: [:user, :votes],
              methods: :vote_count
            }
          }
        )
      end

      def create
        @book = Book.new(book_params)
        
        if @book.save
          render json: @book, status: :created
        else
          render json: { errors: @book.errors.full_messages }, status: :unprocessable_entity
        end
      end

      private

      def book_params
        params.require(:book).permit(:title, :author, :image_url, :description, :isbn)
      end
    end
  end
end