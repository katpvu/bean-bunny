class UpdateColumnNameRatings < ActiveRecord::Migration[7.0]
  def change
    rename_column :ratings, :fav_dishes, :fav_orders
  end
end
