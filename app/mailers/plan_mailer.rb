class PlanMailer < ApplicationMailer

  def share(plan, email)
    @Plan = plan
    user = User.find_by(email: email)
    shared_plan = Plan.new(title: @plan.title, total_duration: @plan.total_duration, user_id: user.id)
    if shared_plan.save
      mail(to: email, subject: "Checkout this plan")
      render json: ['Email has been sent.']
    else
      render json: ['This email doesn\'t belong to any users. If you are sure that this email is correct, please have them sign up. Otherwise, please try again.']
    end
  end

end
