class CreateProfessors < ActiveRecord::Migration[6.0]
  def change
    create_table :professors do |t|
      t.string :email
      t.string :name
      t.string :password
      t.string :phone_number

      t.timestamps
    end
  end
end
