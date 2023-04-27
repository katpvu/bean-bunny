class CreateBusinesses < ActiveRecord::Migration[7.0]
  def change
    create_table :businesses do |t|
      t.string :business_yelp_id, null: false
      t.timestamps
    end
    add_index :businesses, :business_yelp_id
  end
end
