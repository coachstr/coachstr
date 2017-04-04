Rails.application.routes.draw do

  scope 'api' do
    resources :tags do
      resources :drills, only: [:index]
      resources :plans, only: [:index]
    end
    resources :plans
    resources :drills
    resources :users
    resources :organizations
  end

  get     '/api/login'            =>  'sessions#new', as: :login
  post    '/api/login'            =>  'sessions#create'
  post    '/api/drill_plans'      =>  'drill_plans#create'
  patch   '/api/drill_plans/:id'  =>  'drill_plans#update'
  put     '/api/drill_plans/:id'  =>  'drill_plans#update'
  delete  '/api/drill_plans/:id'  =>  'drill_plans#destroy'
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
