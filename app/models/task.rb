class Task < ApplicationRecord
  belongs_to :professor
  has_many :task_objects
end
