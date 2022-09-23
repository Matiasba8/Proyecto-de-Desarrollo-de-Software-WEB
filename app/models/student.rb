class Student < ApplicationRecord
  has_many :achievements, dependent: :destroy
end
