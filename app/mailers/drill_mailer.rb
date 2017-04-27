class DrillMailer < ApplicationMailer

  def share(drill, email)
    binding.pry
    @drill = drill
    user = User.find_by(email: email)
    mail(to: email, subject: "Checkout this drill")
    Drill.create!(title: @drill.title, description: @drill.description, duration: @drill.duration, user_id: user.id)
  end
end
