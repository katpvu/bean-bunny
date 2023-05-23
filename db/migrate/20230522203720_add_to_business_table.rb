class AddToBusinessTable < ActiveRecord::Migration[7.0]
  def change
    add_column :businesses, :image_url, :string, null: false, default: ""
    add_column :businesses, :coordinates, :text, null: false, default: ""
    add_column :businesses, :is_closed, :boolean, null: false, default: false
    add_column :businesses, :location, :text, null: false, default: ""
    add_column :businesses, :name, :string, null: false, default: ""
    add_column :businesses, :yelp_rating, :float, null: false, default: 0

    change_column :businesses, :image_url, :string, default: nil
    change_column :businesses, :coordinates, :text, default: nil
    change_column :businesses, :is_closed, :boolean, default: nil
    change_column :businesses, :location, :text, default: nil
    change_column :businesses, :name, :string, default: nil
    change_column :businesses, :yelp_rating, :float, default: nil
  end
end
