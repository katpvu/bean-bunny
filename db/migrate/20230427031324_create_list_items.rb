class CreateListItems < ActiveRecord::Migration[7.0]
  def change
    create_table :list_items do |t|
      t.references :list, null: false, foreign_key: true
      t.string :business_yelp_id, null: false
      t.index [:list_id, :business_yelp_id], unique: true
      t.timestamps
    end

    add_index :list_items, :business_yelp_id
  end
end
