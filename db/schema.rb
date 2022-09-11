# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `rails
# db:schema:load`. When creating a new database, `rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 2022_09_11_183939) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "professors", force: :cascade do |t|
    t.string "email"
    t.string "name"
    t.string "password"
    t.string "phone_number"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

  create_table "task_objects", force: :cascade do |t|
    t.bigint "task_id", null: false
    t.string "object_type"
    t.float "force"
    t.float "angle"
    t.float "scaleX"
    t.float "scaleY"
    t.float "top"
    t.float "left"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.string "canvas_type"
    t.float "width"
    t.float "height"
    t.index ["task_id"], name: "index_task_objects_on_task_id"
  end

  create_table "tasks", force: :cascade do |t|
    t.string "name"
    t.bigint "professor_id", null: false
    t.string "canvas_stringify"
    t.string "category"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["professor_id"], name: "index_tasks_on_professor_id"
  end

  add_foreign_key "task_objects", "tasks"
  add_foreign_key "tasks", "professors"
end
