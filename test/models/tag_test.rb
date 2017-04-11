require "test_helper"

describe Tag do
  let(:tag) { Tag.new }

  it "must be valid" do
    value(tag).must_be :valid?
  end
end
