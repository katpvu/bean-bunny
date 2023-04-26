class CreateLists < ActiveRecord::Migration[7.0]
  def change
    create_table :lists do |t|
      t.references :user, null: false, foreign_key: true
      t.string :title, null: false
      t.index [:user_id, :title], unique: true
      t.timestamps
    end
  end
end
