class AddColumnsToBusinessesTable < ActiveRecord::Migration[7.0]
  def change
    add_column :businesses, :additional_photos_urls, :text, array: true, default: []
    add_column :businesses, :price, :string
    add_column :businesses, :hours, :text, array: true, default: []
    add_column :businesses, :phone_number, :string
  end
end
