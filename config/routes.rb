Rails.application.routes.draw do
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  # root "articles#index"


  namespace :api, defaults: { format: :json } do
    post '/searches', to: 'searches#create'
    resources :users, only: :create
    resource :session, only: [:show, :create, :destroy]
    resources :lists
  end

  get '*path', to: "static_pages#frontend_index"
end
