class DrillMailer < ApplicationMailer

  def share(drill, email)
    @drill = drill
    mail(to: email, subject: "Checkout this drill")
  end

end
