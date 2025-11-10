Rails.application.routes.draw do
  get "home/index"
  
  devise_for :users, controllers: {
    sessions: 'users/sessions',
    registrations: 'users/registrations'
  }

  namespace :api do
    namespace :v1 do
      resources :books, only: [:index, :show, :create]
      resources :recommendations, only: [:index, :show, :create, :destroy] do
        member do
          post :vote
          delete :unvote
        end
      end

      get 'trending', to: 'recommendations#trending'
      get 'profile/:id', to: 'users#show'
      get 'current_user', to: 'users#current'
    end
  end

  root 'home#index'
  get '*path', to: 'home#index', constraints: ->(req) { !req.xhr? && req.format.html? }
end
