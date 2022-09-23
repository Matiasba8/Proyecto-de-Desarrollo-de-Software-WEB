class AddStartStageToTask < ActiveRecord::Migration[6.0]
  def change
    add_column :tasks, :start_stage, :string
  end
end
