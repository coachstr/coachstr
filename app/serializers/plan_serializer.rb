class PlanSerializer < ActiveModel::Serializer
  attributes :id, :title, :total_duration, :drills, :tags

  has_many :taggings, as: :taggable
  has_many :tags, through: :taggings
  has_many :drill_plans
  has_many :drills, through: :drill_plans

  def drills
    titles = []
    object.drills.pluck(:title).each do |title|
      titles << {title: title}
    end
    return titles
  end

  def tags
    names = []
    object.tags.pluck(:name).each do |name|
      names << {name: name}
    end
    return names
  end

end
