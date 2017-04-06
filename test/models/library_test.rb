require "test_helper"

describe Library do
  let(:library) { Library.new }

  it "must be valid" do
    value(library).must_be :valid?
  end
end
