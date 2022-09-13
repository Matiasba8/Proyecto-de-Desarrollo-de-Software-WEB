class AddInstructionsToTask < ActiveRecord::Migration[6.0]
  def change
    add_column :tasks, :instructions, :string
  end
end
