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

    post    '/drill_plans'      =>  'drill_plans#create'
    patch   '/drill_plans/:id'  =>  'drill_plans#update'
    put     '/drill_plans/:id'  =>  'drill_plans#update'
    delete  '/drill_plans/:id'  =>  'drill_plans#destroy'
  end
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
