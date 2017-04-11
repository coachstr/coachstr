FactoryGirl.define do |drill|
  factory :drill do
    title       {Faker::Job.title}
    description {Faker::Hipster.paragraphs(1)}
    duration    {300}
    drill.user  {Factory(:user)}

    transient do
      tag_count   5
    end

    factory :drill_with_tags do
      after(:create) do |job, evaluator|
        evaluator.tag_count.times do
          job.tags << build(:tag)
        end
      end
    end

  end
end
