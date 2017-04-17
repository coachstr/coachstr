FactoryGirl.define do
  factory :user do
    name { Faker::Name.first_name }
    email { "#{name}@example.com" }
    password "password"
  end
end
