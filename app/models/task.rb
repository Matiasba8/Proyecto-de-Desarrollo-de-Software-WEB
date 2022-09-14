class Task < ApplicationRecord
  belongs_to :professor
  has_many :task_objects
  has_one_attached :image, :dependent => :destroy
end
