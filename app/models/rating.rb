class Rating < ApplicationRecord
    # validations
    validates :rating, 
        presence: true, 
        inclusion: { in: [1, 2, 3, 4, 5] }, 
        numericality: { only_integer: true }

    # associations
    belongs_to :user
    belongs_to :business
    has_many_attached :photos
end
