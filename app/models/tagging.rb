class Tagging < ApplicationRecord
  belongs_to :tag_id
  belongs_to :taggable, ploymorphic: true
end
