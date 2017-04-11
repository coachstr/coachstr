require "test_helper"

describe Drill do
  let(:drill) { Drill.new }

  it "must be valid" do
    value(drill).must_be :valid?
  end
end
