Rails.application.routes.draw do
  get 'task/new'
  get 'user/login', to: "user#login_page"
  get 'user/index'
  root to: "home#home"

  get "user/new", to: "user#new_user_page"
  get "task/:id/edit", to: "task#edit"
  get "task/index", to: "task#index"
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html

  post "new_user", to: "user#new"
  post "save_task", to: "task#save_task"
  post "load_canvas", to: "task#load_canvas"

  post "save2", to: "task#save2"
  post "load2", to: "task#load2"
  post "get_task_info", to: "task#get_task_info"
  post "create_image", to: "task#create_image"

  post "delete_task", to: "task#delete_task"
  post "user/login", to: "user#login"
  post "sign_out", to: "user#sign_out"
end
