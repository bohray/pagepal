module Api
  module V1
    class ApiController < ApplicationController
      skip_before_action :verify_authenticity_token
      before_action :authenticate_user!, except: [:index, :show, :trending]
      
      respond_to :json

      private

      def current_user
        @current_user ||= warden.authenticate(scope: :user)
      end
    end
  end
end