class UserMailer < ApplicationMailer

  def signup(user)
    @user = user
    mail(:to => @user.email, subject: "Thanks for signing up with Coachstr")
  end

end
