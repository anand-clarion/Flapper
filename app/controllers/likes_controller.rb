class LikesController < ApplicationController
  respond_to :json
  def new
  end

  def create
   respond_with Like.create(like_params.merge(user_id: current_user.id)), :location => nil
  end

  def find_likable
    abort params.inspect
  end

  private
    def like_params
      params.require(:like).permit(:likable_id, :likable_type, :user_id)
    end
end
