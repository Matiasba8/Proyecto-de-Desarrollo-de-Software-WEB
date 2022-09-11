class TaskController < ApplicationController
  def new
    @new_task = Task.create(professor_id: 1, name: "test", category: "Easy")
    $is_home_page = false
  end

  def save_task
    @task = Task.where(id: params[:id])[0]
    @task.update(canvas_stringify: params[:canvas_stringify])
  end

  def save2
    objects = params[:_json][0]
    task_id = params[:_json][1]["task_id"]
    puts "task_id: #{task_id}"
    @task = Task.find(task_id)
    puts "Task: #{@task}"
    objects.each do |obj|
      @new_obj = TaskObject.create(task: @task,
                                   width: obj["width"],
                                   height: obj["height"],
                                   canvas_type: obj["canvas_type"],
                                   object_type: obj["object_type"],
                                   force: obj["force"],
                                   angle: obj["angle"],
                                   scaleX: obj["scaleX"],
                                   scaleY: obj["scaleY"],
                                   top: obj["top"],
                                   left: obj["left"])
    end

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
