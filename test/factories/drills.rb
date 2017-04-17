FactoryGirl.define do |drill|
  factory :drill do
    title       {Faker::Job.title}
    description {Faker::Hipster.paragraphs(1)}
    duration    {300}
    user

    transient do
      tag_count   5
      plans       2
      libraries   8
    end

    factory :drill_with_tags do
      after(:create) do |job, evaluator|
        evaluator.tag_count.times do
          job.tags << build(:tag)
        end
      end
    end

    factory :drill_with_plans do
      after(:create) do |job, evaluator|
        evaluator.plans.times do
          job.plans << build(:plan)
        end
      end
    end

    factory :drill_with_libraries do
      after(:create) do |job, evaluator|
        evaluator.libraries.times do
          job.libraries << build(:library)
        end
      end
    end

  end
end
