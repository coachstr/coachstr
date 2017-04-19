class DrillMailer < ApplicationMailer

  def share(drill, email)
    @drill = drill
    user = User.find_by(email: email)
    mail(to: email, subject: "Checkout this drill")
    Drill.create(title: @drill.title, desciption: @drill.desciption, duration: @drill.duration, user_id: user.id)
  end
end
