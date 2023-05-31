class RemoveNullConstraintHours < ActiveRecord::Migration[7.0]
  def change
    remove_column :businesses, :hours
    add_column :businesses, :hours, :json, default: {}
  end
end
