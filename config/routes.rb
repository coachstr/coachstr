Rails.application.routes.draw do

  # resources :tags
  scope :api do
    resources :plans do
      resources :tags
    end
    resources :drills do
      resources :tags
    end
    resources :users
    resources :organizations
  end

  get "/api/login" => 'sessions#new', as: :login_path
  post "/api/login" => 'sessions#create'

  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
