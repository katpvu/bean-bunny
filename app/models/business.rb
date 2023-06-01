class Business < ApplicationRecord

    serialize :coordinates, Hash
    serialize :location, Hash
    serialize :hours, Hash
    # validations
    validates :business_yelp_id, :image_url, :coordinates, :location, :name, :yelp_rating, presence: true
    validates :business_yelp_id, uniqueness: true

    # associations
    has_many :ratings,
        dependent: :destroy
end
