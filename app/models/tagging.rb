class Tagging < ApplicationRecord
  belongs_to :tag
  belongs_to :taggable, ploymorphic: true
end
