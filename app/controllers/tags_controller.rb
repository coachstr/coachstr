class TagsController < ApplicationController
  before_action :find_tag, only: [:show, :destroy]
  def index
    @tags = Tag.all
    render json: @tags
  end

  def show
    # find_tag
    render json: @tag
  end

  def create
    @tag = Tag.find_or_create_by(params['id'])
  end

  def destroy
    # find_tag
    @tag.destroy
  end

  private

  def tag_params
    params.require(:tag).permit(:name)
  end

  def find_tag
    @tag = Tag.find_by(params['id'])
  end

end
