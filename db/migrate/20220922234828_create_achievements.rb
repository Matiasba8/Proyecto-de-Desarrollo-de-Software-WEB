class CreateAchievements < ActiveRecord::Migration[6.0]
  def change
    create_table :achievements do |t|
      t.references :student, null: false, foreign_key: true
      t.string :topic
      t.integer :amount

      t.timestamps
    end
  end
end
