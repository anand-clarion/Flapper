class ApplicationController < ActionController::Base
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  protect_from_forgery

  before_action :authenticate_user!

  respond_to :json, :html

  # Callback to Permitted custom parameter
  before_action :configure_permitted_parameters, if: :devise_controller?

  # Method to set root url
  def angular
    render 'layouts/application'
  end

  # Permitted custom parameter for devise login and registration
  def configure_permitted_parameters
    devise_parameter_sanitizer.for(:sign_up) << :name
  end
end
