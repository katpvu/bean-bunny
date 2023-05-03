class CreateRatings < ActiveRecord::Migration[7.0]
  def change
    create_table :ratings do |t|
      t.integer :rating, null: false
      t.references :user, null: false, foreign_key: true
      t.references :business, null: false, foreign_key: true
      t.string :notes
      t.string :fav_dishes
      t.index [:user_id, :business_id], unique: true
      t.timestamps
    end

  end
end
