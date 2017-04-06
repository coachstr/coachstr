class LibrariesController < ApplicationController

  before_action :require_user
  before_action :find_library, only: [:show, :update, :destroy]

  def index
    @libraries = current_user.libraries
    render json: @libraries.map { |l| {title: l.title}}
  end

  def create
    @library = Library.new(library_params)
    if @library.save
      render json: @library
    else
      error = @library.errors.full_messages.collect do |error_message|
        {:error => error_message}
      end
      @errors = {:errors => error}
      render json: @errors, status: 400
    end
  end

  def show
    render json: @library
  end

  def update
    if @library.update!(library_params)
      render json: @library
    else
      error = @libarary.errors.full_messages.collect do |error_message|
        {:error => error_message}
      end
      @errors = {:errors => error}
      render json: @errors, status: 400
    end
  end

  def destroy
    @library.destroy
  end


  private

  def library_params
    params.permit(:title, :private)
  end

  def find_library
    @library = Library.find_by(params[:id])
  end

end
