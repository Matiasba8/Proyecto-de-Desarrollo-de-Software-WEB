class RenameTypeToObjectType < ActiveRecord::Migration[6.0]
  def change
    rename_column :task_objects, :type, :object_type
  end
end
