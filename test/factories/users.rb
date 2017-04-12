FactoryGirl.define do
  factory :user do
    name { Faker::Name.name }
    email { "#{name}@example.com" }
    password "password"
  end
end
