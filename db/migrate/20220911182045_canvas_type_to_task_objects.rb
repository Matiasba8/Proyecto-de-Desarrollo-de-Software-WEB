class CanvasTypeToTaskObjects < ActiveRecord::Migration[6.0]
  def change
    add_column :task_objects, :canvas_type, :string
  end
end
