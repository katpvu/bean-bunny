# == Schema Information
#
# Table name: lists
#
#  id         :bigint           not null, primary key
#  user_id    :bigint           not null
#  title      :string           not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#
class List < ApplicationRecord
    #validations
    validates :title, presence: true, uniqueness: { scope: :user_id, message: " is already a List title."}

    #associations
    belongs_to :user
    has_many :list_items,
        dependent: :destroy
end
