class UsersController < ApplicationController
  respond_to :json
  before_action :set_user

  def show
    respond_with @user.to_json(:methods => :avatar_url)
  end

  private
    def set_user
      @user = User.find(params[:id])
    end
end
