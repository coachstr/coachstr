class DrillMailer < ApplicationMailer

  def share(drill, email)
    @drill = drill
    user = User.find_by(email: email)
    shared_drill = Drill.new(title: @drill.title, desciption: @drill.desciption, duration: @drill.duration, user_id: user.id)
    if shared_drill.save
      mail(to: email, subject: "Checkout this drill")
      render json: ['Email has been sent.']
    else
      render json: ['This email doesn\'t belong to any users. If you are sure that this email is correct, please have them sign up. Otherwise, please try again.']
    end
  end

end
