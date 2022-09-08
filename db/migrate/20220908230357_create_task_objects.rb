class CreateTaskObjects < ActiveRecord::Migration[6.0]
  def change
    create_table :task_objects do |t|
      t.references :task, null: false, foreign_key: true
      t.string :type
      t.float :force
      t.float :angle
      t.float :scaleX
      t.float :scaleY
      t.float :top
      t.float :let

      t.timestamps
    end
  end
end
