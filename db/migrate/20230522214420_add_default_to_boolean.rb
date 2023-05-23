class AddDefaultToBoolean < ActiveRecord::Migration[7.0]
  def change
    change_column :businesses, :is_closed, :boolean, default: false
  end
end
