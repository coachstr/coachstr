Rails.application.routes.draw do

  # resources :tags
  resources :plans do
    resources :tags
  end
  resources :drills do
    resources :tags
  end
  resources :users
  resources :organizations


  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
