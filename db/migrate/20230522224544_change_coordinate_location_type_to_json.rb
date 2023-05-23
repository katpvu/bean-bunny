class ChangeCoordinateLocationTypeToJson < ActiveRecord::Migration[7.0]
  def change
    remove_column :businesses, :location
    remove_column :businesses, :coordinates

    add_column :businesses, :location, :json, default: {}, null: false
    add_column :businesses, :coordinates, :json, default: {}, null: false
  end
end
