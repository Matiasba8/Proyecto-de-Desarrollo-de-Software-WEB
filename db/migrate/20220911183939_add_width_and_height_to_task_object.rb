class AddWidthAndHeightToTaskObject < ActiveRecord::Migration[6.0]
  def change
    add_column :task_objects, :width, :float
    add_column :task_objects, :height, :float
  end
end
