class CreateStudents < ActiveRecord::Migration[6.0]
  def change
    create_table :students do |t|
      t.string :email
      t.string :name
      t.string :phone_number
      t.string :password

      t.timestamps
    end
  end
end
