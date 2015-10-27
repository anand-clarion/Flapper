class RegistrationsController < Devise::RegistrationsController

  def create
    if params[:file]
      params[:user][:avatar] = params[:file]
    end
    super
  end

end