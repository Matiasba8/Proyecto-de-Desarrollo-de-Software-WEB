class TaskController < ApplicationController
  def new
    @task = Task.create(professor_id: 1, name: "test", category: "Easy")
    @tasks = Task.all
    $is_home_page = false
  end

  def save_task
    @task = Task.where(id: params[:id])[0]
    @task.update(canvas_stringify: params[:canvas_stringify], instructions: params[:instructions], name: params[:task_name], start_stage: params[:start_stage])
  end

  def save2
    objects = params[:_json][0]
    task_id = params[:_json][1]["task_id"]
    puts "task_id: #{task_id}"
    @task = Task.find(task_id)

    @task.task_objects.destroy_all

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

  def load2
    @task = Task.find(params[:id])
    @objects = @task.task_objects

    respond_to do |format|
      format.json { render json: @objects.to_json}
      format.html
    end
  end

  def edit
    @task = Task.where(id: params[:id])[0]
    @tasks = Task.all
  end

  def index
    $is_home_page = false
    @tasks = Task.all
  end

  def get_task_info
    @task = Task.where(id: params[:id])[0]
  end

  def load_canvas
    @task = Task.where(id: params[:id])[0]
    @canvas_str = @task.canvas_stringify

    respond_to do |format|
      format.json { render json: @canvas_str.to_json}
      format.html
    end
  end

  def create_image
    @task = Task.find(params[:id])
    @task.update(image: params[:image])
  end

  def delete_task
    @task = Task.find(params[:id])
    @task_id_to_destroy = @task.id
    @task.destroy
  end

  def next_student_task
    @tasks = Task.all

    @task = @tasks[rand(@tasks.length)]

  end

end
