class Business < ApplicationRecord

    serialize :coordinates, Hash
    serialize :location, Hash
    # validations
    validates :business_yelp_id, :image_url, :coordinates, :location, :name, :yelp_rating, presence: true


    # associations
    has_many :ratings,
        dependent: :destroy
end
