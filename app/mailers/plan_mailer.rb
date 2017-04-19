class PlanMailer < ApplicationMailer

  def share(plan, email)
    @Plan = plan
    user = User.find_by(email: email)
    mail(to: email, subject: "Checkout this plan")
    Plan.new(title: @plan.title, total_duration: @plan.total_duration, user_id: user.id)
  end
end
