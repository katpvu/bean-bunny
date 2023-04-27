class Business < ApplicationRecord
    # validations
    validates :business_yelp_id, presence: true

    # associations
    has_many :ratings
end
