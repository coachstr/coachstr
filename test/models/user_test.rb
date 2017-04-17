require "test_helper"

class UserTest < ActiveSupport::TestCase

  def test_user_invalid_without_name
    user = build(:user, name: "")
    refute user.valid?
  end

  def test_user_invalid_email_address
    user = build(:user, email: "billie123")
    refute user.valid?
  end

  def test_user_has_many_libraries
    user = build(:user)
    library = build(:library)
    user.libraries << library
    user.save
    assert_equal 1, user.libraries.count
  end

  def test_user_has_many_plans
    user = build(:user)
    plan = build(:plan)
    plan2 = build(:plan)
    user.plans << plan
    user.plans << plan2
    user.save
    assert user.plans.count == 2
  end

  def test_has_many_drills
    user = build(:user)
    drill = build(:drill)
    drill2 = build(:drill)
    drill3 = build(:drill)
    user.drills << drill
    user.drills << drill2
    user.drills << drill3
    user.save
    assert user.drills.count == 3
  end

end
