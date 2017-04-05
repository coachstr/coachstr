class PlanMailer < ApplicationMailer

  def share(plan, email)
    @Plan = plan
    mail(to: email, subject: "Checkout this plan")
  end

end
