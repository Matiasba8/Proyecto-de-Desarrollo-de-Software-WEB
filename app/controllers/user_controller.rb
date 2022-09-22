class UserController < ApplicationController
  def login_page
  end

  def login
    @professor_present = Professor.where(email: params[:email], password: params[:password])[0]
    @student_present = Student.where(email: params[:email], password: params[:password])[0]

    puts "Profesor record: #{@professor_present}"
    puts "Student Record: #{@student_present}"

    if @professor_present
      session[:user_id] = @professor_present.id
      session[:user_role] = "Profesor"
      redirect_to root_path
    elsif @student_present
      session[:user_id] = @student_present.id
      session[:user_role] = "Estudiante"
      redirect_to root_path
    else
      puts "No se ha iniciado la sesión correctamente"
    end
  end

  def sign_out
    session[:user_id] = nil
    session[:user_role] = nil
    redirect_to root_path
  end

  def index
  end

  def new_user_page
  end



  def new
    if params[:role] == "Profesor"
      @new_professor = Professor.create(email: params[:email], name: params[:name], phone_number: params[:phone_number], password: params[:password])
      session[:user_id] = @new_professor.id
      session[:user_role] = "Profesor"
      redirect_to root_path
    elsif params[:role] == "Estudiante"
      @new_student = Student.create(email: params[:email], name: params[:name], phone_number: params[:phone_number], password: params[:password])
      session[:user_id] = @new_student.id
      session[:user_role] = "Estudiante"
      redirect_to root_path
    end
  end
end
