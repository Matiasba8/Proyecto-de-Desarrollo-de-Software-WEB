class UserController < ApplicationController
  def login
  end

  def index
  end

  def new_user_page
  end

  def new
    if params[:role] == "Profesor"
      @new_professor = Professor.create(email: params[:email], name: params[:name], phone_number: params[:phone_number], password: params[:password])
    elsif params[:role] == "Estudiante"
      @new_professor = Student.create(email: params[:email], name: params[:name], phone_number: params[:phone_number], password: params[:password])
    end
  end
end
