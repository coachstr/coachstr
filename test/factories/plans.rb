FactoryGirl.define do |plan|
  factory :plan do
    title           {Faker::Job.title}
    total_duration  {1500}
    user

    transient do
      drill_count 5
      tag_count   5
    end

    factory :plan_with_tags do
      after(:create) do |job, evaluator|
        evaluator.tag_count.times do
          job.tags << build(:tag)
        end
      end
    end

    factory :plan_with_drills do
      after(:create) do |job, evaluator|
        evaluator.drill_count.times do
          job.drills << build(:drills)
        end
      end
    end
  end
end
