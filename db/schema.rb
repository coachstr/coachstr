# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20170411193407) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "drill_plans", force: :cascade do |t|
    t.integer  "drill_id"
    t.integer  "plan_id"
    t.string   "order_by"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["drill_id"], name: "index_drill_plans_on_drill_id", using: :btree
    t.index ["plan_id"], name: "index_drill_plans_on_plan_id", using: :btree
  end

  create_table "drills", force: :cascade do |t|
    t.string   "title"
    t.text     "description"
    t.integer  "duration"
    t.datetime "created_at",     null: false
    t.datetime "updated_at",     null: false
    t.string   "drill_pic"
    t.string   "default_avatar"
    t.integer  "user_id"
    t.index ["user_id"], name: "index_drills_on_user_id", using: :btree
  end

  create_table "lib_drills", force: :cascade do |t|
    t.integer "drill_id"
    t.integer "library_id"
    t.index ["drill_id"], name: "index_lib_drills_on_drill_id", using: :btree
    t.index ["library_id"], name: "index_lib_drills_on_library_id", using: :btree
  end

  create_table "libraries", force: :cascade do |t|
    t.string   "title"
    t.integer  "user_id"
    t.boolean  "private",    default: true
    t.datetime "created_at",                null: false
    t.datetime "updated_at",                null: false
    t.index ["user_id"], name: "index_libraries_on_user_id", using: :btree
  end

  create_table "plans", force: :cascade do |t|
    t.string   "title"
    t.integer  "total_duration"
    t.datetime "created_at",     null: false
    t.datetime "updated_at",     null: false
    t.integer  "user_id"
    t.index ["user_id"], name: "index_plans_on_user_id", using: :btree
  end

  create_table "taggings", force: :cascade do |t|
    t.integer  "tag_id"
    t.string   "taggable_type"
    t.integer  "taggable_id"
    t.datetime "created_at",    null: false
    t.datetime "updated_at",    null: false
    t.index ["tag_id"], name: "index_taggings_on_tag_id", using: :btree
    t.index ["taggable_id", "taggable_type"], name: "index_taggings_on_taggable_id_and_taggable_type", using: :btree
    t.index ["taggable_type", "taggable_id"], name: "index_taggings_on_taggable_type_and_taggable_id", using: :btree
  end

  create_table "tags", force: :cascade do |t|
    t.string   "name"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "users", force: :cascade do |t|
    t.string   "name"
    t.string   "email"
    t.string   "password_digest"
    t.datetime "created_at",                                                  null: false
    t.datetime "updated_at",                                                  null: false
    t.string   "profile_pic"
    t.string   "default_avatar",  default: "http://i.imgur.com/lsyjVvwt.png"
    t.string   "token"
  end

  add_foreign_key "drill_plans", "drills"
  add_foreign_key "drill_plans", "plans"
  add_foreign_key "drills", "users"
  add_foreign_key "lib_drills", "drills"
  add_foreign_key "lib_drills", "libraries"
  add_foreign_key "libraries", "users"
  add_foreign_key "plans", "users"
  add_foreign_key "taggings", "tags"
end
