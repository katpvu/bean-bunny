class ChangeColumnBusinessesHours < ActiveRecord::Migration[7.0]
  def change
    remove_column :businesses, :hours
    add_column :businesses, :hours, :json, default: {}, null: false
  end
end
