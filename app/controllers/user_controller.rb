class UserController < ApplicationController
  def login
  end

  def index
  end

  def new_user_page
  end

  def new
    @new_user = Professor.create(email: params[:email], name: params[:name], phone_number: params[:phone_number], password: params[:password])
  end
end
