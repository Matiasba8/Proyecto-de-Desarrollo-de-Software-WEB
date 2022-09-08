class TaskController < ApplicationController
  def new
    @new_task = Task.create(professor_id: 1, name: "test", category: "Easy")
    $is_home_page = false
  end

  def save_task
    @task = Task.where(id: params[:id])[0]
    @task.update(canvas_stringify: params[:canvas_stringify])
  end

  def edit
    @task = Task.where(id: params[:id])[0]
  end

  def index
    $is_home_page = false
    @tasks = Task.all
  end

  def load_canvas
    @task = Task.where(id: params[:id])[0]
    @canvas_str = @task.canvas_stringify

    respond_to do |format|
      format.json { render json: @canvas_str.to_json}
      format.html
    end
  end
end
