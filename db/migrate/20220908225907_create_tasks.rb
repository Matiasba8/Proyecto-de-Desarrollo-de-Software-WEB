class CreateTasks < ActiveRecord::Migration[6.0]
  def change
    create_table :tasks do |t|
      t.string :name
      t.references :professor, null: false, foreign_key: true
      t.string :canvas_stringify
      t.string :category

      t.timestamps
    end
  end
end
