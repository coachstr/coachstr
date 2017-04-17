require "test_helper"

class TagTest < ActiveSupport::TestCase

  def test_tag_has_a_name
    tag = build(:tag)
    tag.save
    assert tag.valid?
    tag2 = build(:tag, name: "")
    tag.save
    refute tag2.valid?
  end

  def test_tag_has_many_drills
    tag = build(:tag)
    tag.save
    drill = build(:drill)
    drill2 = build(:drill)
    drill.save
    drill2.save
    drill.tags << tag
    drill2.tags << tag
    assert_equal 2, tag.drills.count
  end

  def test_tag_has_many_plans
    tag = build(:tag)
    tag.save
    plan = build(:plan)
    plan2 = build(:plan)
    plan3 = build(:plan)
    plan.save
    plan2.save
    plan3.save
    plan.tags << tag
    plan2.tags << tag
    plan3.tags << tag
    assert_equal 3, tag.plans.count
  end

end
