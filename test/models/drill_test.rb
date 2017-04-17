require "test_helper"

class DrillTest < ActiveSupport::TestCase

  def test_drill_invalid_without_name
    drill = build(:drill, title: "")
    refute drill.save
  end

  def test_drill_invalid_without_description
    drill = build(:drill, description: "")
    refute drill.save
  end

  def test_drill_invalid_without_duration
    drill = build(:drill, duration: "")
    refute drill.save
  end

  def test_duration_must_be_valid_integer
    drill = build(:drill, duration: "lkadfkjaklsdjfjao")
    refute drill.save
  end

  def test_drill_belongs_to_user
    drill = build(:drill)
    drill.save
    assert drill.user.present?
  end

  def test_drill_has_many_plans
    drill = create(:drill_with_plans)
    assert_equal 2, drill.plans.count
    plan = build(:plan)
    drill.plans << plan
    assert_equal 3, drill.plans.count
  end

  def test_drill_has_tags
    drill = create(:drill_with_tags)
    assert_equal 5, drill.tags.count
    tag = build(:tag)
    drill.tags << tag
    assert_equal 6, drill.tags.count
  end

  def test_drill_has_many_libraries
    drill = create(:drill_with_libraries)
    assert_equal 8, drill.libraries.count
    lib = build(:library)
    drill.libraries << lib
    assert_equal 9, drill.libraries.count
  end

end
