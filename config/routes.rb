Rails.application.routes.draw do

  root 'application#static'
  # mount RailsAdmin::Engine => '/admin', as: 'rails_admin'
  scope 'api' do
    resources :tags do
      resources :drills, only: [:index]
      resources :plans, only: [:index]
    end
    resources :plans do
      resources :shares, only: [:create]
    end
    resources :drills do
      resources :shares, only: [:create]
    end
    resources :users
    resources :organizations
    resources :libraries do
      resources :shares, only: [:create]
    end
  end
  
  get     '/api/login'                           =>  'sessions#new', as: :login
  post    '/api/login'                           =>  'sessions#create'
  post    '/api/plans/:plan_id/drill_plans'      =>  'drill_plans#create'
  patch   '/api/plans/:plan_id/drill_plans/:id'  =>  'drill_plans#update'
  put     '/api/plans/:plan_id/drill_plans/:id'  =>  'drill_plans#update'
  delete  '/api/plans/:plan_id/drill_plans/:id'  =>  'drill_plans#destroy'
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  root 'drills#index'
  # fallback route
  get "/:param1(/:param2)(/:param3)" => "application#static"
end
