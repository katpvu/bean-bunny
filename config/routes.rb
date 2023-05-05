Rails.application.routes.draw do
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  # root "articles#index"

  namespace :api, defaults: { format: :json } do
    post '/searches', to: 'searches#create'
    get '/searches/:business_id', to: 'searches#show'
    get '/businesses/yelp/:business_yelp_id', to: 'businesses#fetch'
    resources :businesses, only: [:create, :show]
    resources :users, only: [:create, :show, :index]
    resource :session, only: [:show, :create, :destroy]
    resources :lists
    resources :list_items, only: [:index, :create, :destroy]
    resources :ratings
  end
  
  get '*path', to: "static_pages#frontend_index"
end
