class DrillSerializer < ActiveModel::Serializer
  attributes :id,
             :title,
             :description,
             :duration,
             :order_by,
             :tags,
             :plans

   has_many :taggings, as: :taggable
   has_many :tags, through: :taggings
   has_many :drill_plans
   has_many :plans, through: :drill_plans

   def order_by
     object.drill_plan.order_by
   end

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
