FactoryGirl.define do |library|
  factory :library do
    title         {Faker::Job.title}
    private       {true}
    user

    transient do
      drills_count   5
    end

    factory :library_with_drills do
      after(:create) do |job, evaluator|
        evaluator.drill_count.times do
          job.drills << build(:drill)
        end
      end
    end

  end
end
