class ApplicationController < ActionController::Base
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  protect_from_forgery
  respond_to :json, :html
  #callbacks
  before_action :authenticate_user!
  # Callback to Permitted custom parameter
  before_action :configure_permitted_parameters, if: :devise_controller?
  after_filter :set_csrf_cookie_for_ng

  def set_csrf_cookie_for_ng
    cookies['XSRF-TOKEN'] = form_authenticity_token if protect_against_forgery?
  end

  # Method to set root url
  def angular
    render 'layouts/application'
  end

  # Permitted custom parameter for devise login and registration
  def configure_permitted_parameters
    devise_parameter_sanitizer.for(:sign_up) << [:name, :avatar, :bg_avatar, :city]
  end

  protected
  # Verify token
  def verified_request?
    super || valid_authenticity_token?(session, request.headers['X-XSRF-TOKEN'])
  end
end
