# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema[7.0].define(version: 2023_06_01_023041) do
  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "active_storage_attachments", force: :cascade do |t|
    t.string "name", null: false
    t.string "record_type", null: false
    t.bigint "record_id", null: false
    t.bigint "blob_id", null: false
    t.datetime "created_at", null: false
    t.index ["blob_id"], name: "index_active_storage_attachments_on_blob_id"
    t.index ["record_type", "record_id", "name", "blob_id"], name: "index_active_storage_attachments_uniqueness", unique: true
  end

  create_table "active_storage_blobs", force: :cascade do |t|
    t.string "key", null: false
    t.string "filename", null: false
    t.string "content_type"
    t.text "metadata"
    t.string "service_name", null: false
    t.bigint "byte_size", null: false
    t.string "checksum"
    t.datetime "created_at", null: false
    t.index ["key"], name: "index_active_storage_blobs_on_key", unique: true
  end

  create_table "active_storage_variant_records", force: :cascade do |t|
    t.bigint "blob_id", null: false
    t.string "variation_digest", null: false
    t.index ["blob_id", "variation_digest"], name: "index_active_storage_variant_records_uniqueness", unique: true
  end

  create_table "businesses", force: :cascade do |t|
    t.string "business_yelp_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "image_url", null: false
    t.boolean "is_closed", default: false, null: false
    t.string "name", null: false
    t.float "yelp_rating", null: false
    t.json "location", default: {}, null: false
    t.json "coordinates", default: {}, null: false
    t.text "additional_photos_urls", default: [], array: true
    t.string "price"
    t.string "phone_number"
    t.json "hours", default: {}
    t.index ["business_yelp_id"], name: "index_businesses_on_business_yelp_id"
  end

  create_table "list_items", force: :cascade do |t|
    t.bigint "list_id", null: false
    t.string "business_yelp_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["business_yelp_id"], name: "index_list_items_on_business_yelp_id"
    t.index ["list_id", "business_yelp_id"], name: "index_list_items_on_list_id_and_business_yelp_id", unique: true
    t.index ["list_id"], name: "index_list_items_on_list_id"
  end

  create_table "lists", force: :cascade do |t|
    t.bigint "user_id", null: false
    t.string "title", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["user_id", "title"], name: "index_lists_on_user_id_and_title", unique: true
    t.index ["user_id"], name: "index_lists_on_user_id"
  end

  create_table "ratings", force: :cascade do |t|
    t.integer "rating", null: false
    t.bigint "user_id", null: false
    t.bigint "business_id", null: false
    t.string "notes"
    t.string "fav_orders"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["business_id"], name: "index_ratings_on_business_id"
    t.index ["user_id", "business_id"], name: "index_ratings_on_user_id_and_business_id", unique: true
    t.index ["user_id"], name: "index_ratings_on_user_id"
  end

  create_table "users", force: :cascade do |t|
    t.string "username", null: false
    t.string "password_digest", null: false
    t.string "session_token", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "email"
    t.index ["email"], name: "index_users_on_email", unique: true
    t.index ["session_token"], name: "index_users_on_session_token", unique: true
    t.index ["username"], name: "index_users_on_username", unique: true
  end

  add_foreign_key "active_storage_attachments", "active_storage_blobs", column: "blob_id"
  add_foreign_key "active_storage_variant_records", "active_storage_blobs", column: "blob_id"
  add_foreign_key "list_items", "lists"
  add_foreign_key "lists", "users"
  add_foreign_key "ratings", "businesses"
  add_foreign_key "ratings", "users"
end
