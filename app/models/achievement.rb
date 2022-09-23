class Achievement < ApplicationRecord
  belongs_to :student, dependent: :destroy
end
