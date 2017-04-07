class DrillSerializer < ActiveModel::Serializer
  attributes :id,
             :title,
             :description,
             :duration

   has_many :tags
   has_many :plans
   has_many :libraries

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
