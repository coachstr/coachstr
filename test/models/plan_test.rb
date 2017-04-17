require "test_helper"

class PlanTest < ActiveSupport::TestCase

  def test_plan_has_a_title
    plan = build(:plan, title: "")
    refute plan.save
  end

  def test_plan_has_tags
    plan = create(:plan_with_tags)
    assert_equal 5, plan.tags.count
    tag = build(:tag)
    plan.tags << tag
    assert plan.tags.count == 6
  end

  def test_plan_has_many_drills
    plan = create(:plan_with_drills)
    assert_equal 5, plan.drills.count
    drill = build(:drill)
    plan.drills << drill
    assert plan.drills.count == 6
  end

  def test_plan_belongs_to_a_user
    plan = build(:plan)
    plan.save
    assert plan.user.present?
  end

end
