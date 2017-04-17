require "test_helper"

class LibraryTest < ActiveSupport::TestCase

  def test_library_has_a_title
    lib = build(:library, title: "")
    refute lib.save
  end

  def test_library_belongs_to_a_user
    lib = build(:library)
    assert lib.user.present?
  end

  def test_library_has_many_drills
    lib = create(:library_with_drills)
    assert_equal 5, lib.drills.count
  end

end
