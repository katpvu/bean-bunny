# == Schema Information
#
# Table name: list_items
#
#  id               :bigint           not null, primary key
#  list_id          :bigint           not null
#  business_yelp_id :string           not null
#  created_at       :datetime         not null
#  updated_at       :datetime         not null
#
class ListItem < ApplicationRecord
    #validations
    validates :list_id, :business_yelp_id, presence: true
    validates :list_id, uniqueness: { scope: :business_yelp_id, message: " already contains this business"}

    #associations
    belongs_to :list
end
