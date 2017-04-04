class OrganizationsController < ApplicationController
  before_action :find_org, only: [:show, :destory]

  def index
    @orgs = Organization.all
    render json: @orgs
  end

  def show
    # find_org
  end

  def create
    @org = Organization.new(org_params)
    if @org.save
      render json: @org, serializer: OrganizationSerializer
    else
      render json: @org.errors.full_messages, status: 400
    end
  end

  # Requires Super Admin Access
  # def update
  #
  # end

  # Requires Super Admin Access
  # def destroy
  #
  # end


  private

  def org_params
    params.permit(:title)
  end

  def find_org
    @org = Organization.find_by(params['organization_id'])
  end

end
